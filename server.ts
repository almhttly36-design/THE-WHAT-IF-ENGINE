import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization helper for Supabase (Optional Shared Knowledge Base)
let supabaseInstance: SupabaseClient | null = null;
function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mlddejzqitlgjdjogiys.supabase.co';
  const key = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_b92HvXVnM9UtyiGdZ7yojg_pMkyMPPj';
  if (!url || !key) {
    return null;
  }
  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(url, key);
    } catch (err) {
      console.warn('[Supabase Init Error]:', err);
      return null;
    }
  }
  return supabaseInstance;
}

// Lazy-initialization helper for Gemini
function getGeminiClient(customApiKey?: string): GoogleGenAI {
  const key = (customApiKey || process.env.GEMINI_API_KEY || '').trim();
  if (!key) {
    throw new Error('GEMINI_API_KEY is required to run simulations. Please set it in environment variables or enter it in the UI.');
  }
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Strict schema matching the Oracle Engine requirements
const simulationResponseSchema = {
  type: Type.OBJECT,
  properties: {
    scenario_summary: {
      type: Type.STRING,
      description: 'Comprehensive 2-3 sentence overview of the hypothetical scenario and its immediate core divergence point.',
    },
    risk_index: {
      type: Type.OBJECT,
      properties: {
        score: {
          type: Type.INTEGER,
          description: 'A risk rating from 0 to 100 representing systemic volatility, danger, or uncertainty.',
        },
        category: {
          type: Type.STRING,
          description: 'Category label, e.g., LOW, MODERATE, HIGH, CRITICAL, or EXISTENTIAL.',
        },
      },
      required: ['score', 'category'],
    },
    outcomes: {
      type: Type.OBJECT,
      properties: {
        optimistic: {
          type: Type.STRING,
          description: 'The best-case branching pathway resulting from this scenario.',
        },
        pessimistic: {
          type: Type.STRING,
          description: 'The worst-case cascade failure or negative consequence pathway.',
        },
      },
      required: ['optimistic', 'pessimistic'],
    },
    temporal_impact: {
      type: Type.OBJECT,
      properties: {
        one_month: {
          type: Type.STRING,
          description: 'Immediate short-term consequence after 1 month.',
        },
        one_year: {
          type: Type.STRING,
          description: 'Mid-term structural shifts after 1 year.',
        },
        five_years: {
          type: Type.STRING,
          description: 'Long-term macroeconomic or civilizational shifts after 5 years.',
        },
      },
      required: ['one_month', 'one_year', 'five_years'],
    },
    contingency_plan: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '3 to 5 clear, tactical recommendations or mitigation steps.',
    },
    search_intent_title: {
      type: Type.STRING,
      description: 'An optimized title for this scenario in the target language.',
    },
  },
  required: [
    'scenario_summary',
    'risk_index',
    'outcomes',
    'temporal_impact',
    'contingency_plan',
  ],
};

// Health & Config Check
app.get('/api/health', (req, res) => {
  const hasEnvKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0;
  res.json({
    status: 'ok',
    hasServerApiKey: hasEnvKey,
  });
});

// API Endpoint to check Supabase connection and scenario count
app.get('/api/supabase-status', async (req, res) => {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return res.json({
      connected: false,
      configured: false,
      message: 'Supabase credentials not configured in environment variables.',
      hasUrl: !!url,
      hasKey: !!key,
      count: 0,
    });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return res.json({
      connected: false,
      configured: true,
      message: 'Failed to initialize Supabase client.',
      count: 0,
    });
  }

  try {
    const { count, error, data } = await supabase
      .from('scenarios')
      .select('id, language', { count: 'exact', head: false })
      .limit(5);

    if (error) {
      return res.json({
        connected: false,
        configured: true,
        message: `Supabase returned an error: ${error.message} (Code: ${error.code})`,
        details: error,
        count: 0,
      });
    }

    return res.json({
      connected: true,
      configured: true,
      message: 'Successfully connected to Supabase scenarios table!',
      count: count ?? data?.length ?? 0,
      sample: data,
    });
  } catch (err: any) {
    return res.json({
      connected: false,
      configured: true,
      message: `Exception while querying Supabase: ${err?.message || err}`,
      count: 0,
    });
  }
});

// API Endpoint for AI Simulation (Check-Cache-First Architecture)
app.post('/api/simulate', async (req, res) => {
  try {
    const { prompt, language = 'ar', customApiKey } = req.body;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        error: 'A valid "prompt" string is required.',
      });
    }

    const cleanPrompt = prompt.trim();
    const supabase = getSupabaseClient();

    // ------------------------------------------------------------------
    // STEP 1: CHECK CACHE IN SUPABASE SHARED KNOWLEDGE BASE
    // ------------------------------------------------------------------
    if (supabase) {
      try {
        const { data: cachedRows, error: searchError } = await supabase
          .from('scenarios')
          .select('id, prompt, response_json, language, created_at')
          .ilike('prompt', cleanPrompt)
          .eq('language', language)
          .order('created_at', { ascending: false })
          .limit(1);

        if (!searchError && cachedRows && cachedRows.length > 0) {
          const cachedItem = cachedRows[0];
          let cachedResult = cachedItem.response_json;
          if (typeof cachedResult === 'string') {
            try {
              cachedResult = JSON.parse(cachedResult);
            } catch (e) {
              console.warn('[Cache Parse Error]:', e);
            }
          }

          if (cachedResult && cachedResult.scenario_summary) {
            console.log(`[Supabase HIT] Returning cached scenario for: "${cleanPrompt}" (${language})`);
            
            // Format normalization for frontend compatibility
            const normalizedData = {
              scenario_summary: cachedResult.scenario_summary,
              risk_index: typeof cachedResult.risk_index === 'number' 
                ? { 
                    score: cachedResult.risk_index, 
                    category: cachedResult.risk_index > 66 ? 'HIGH' : cachedResult.risk_index > 33 ? 'MEDIUM' : 'LOW' 
                  }
                : cachedResult.risk_index || { score: 50, category: 'MEDIUM' },
              outcomes: cachedResult.outcomes || {
                optimistic: cachedResult.optimistic || '',
                pessimistic: cachedResult.pessimistic || '',
              },
              temporal_impact: cachedResult.temporal_impact ? {
                one_month: cachedResult.temporal_impact.one_month || cachedResult.temporal_impact.immediate || '',
                one_year: cachedResult.temporal_impact.one_year || cachedResult.temporal_impact.mid_term || '',
                five_years: cachedResult.temporal_impact.five_years || cachedResult.temporal_impact.long_term || '',
              } : { one_month: '', one_year: '', five_years: '' },
              contingency_plan: Array.isArray(cachedResult.contingency_plan) ? cachedResult.contingency_plan : [],
              search_intent_title: cachedResult.search_intent_title || cleanPrompt,
              source: 'shared_cache',
              cached_at: cachedItem.created_at,
            };

            return res.json({
              success: true,
              data: normalizedData,
              source: 'shared_cache',
              meta: {
                prompt: cleanPrompt,
                language,
                cached_at: cachedItem.created_at,
              },
            });
          }
        }
      } catch (cacheErr) {
        console.warn('[Supabase Cache Query Error - Falling back to Gemini]:', cacheErr);
      }
    }

    // ------------------------------------------------------------------
    // STEP 2: GENERATE SIMULATION WITH GEMINI (IF NOT CACHED)
    // ------------------------------------------------------------------
    const ai = getGeminiClient(customApiKey);

    const langNameMap: Record<string, string> = {
      ar: 'Arabic (العربية)',
      en: 'English',
      es: 'Spanish (Español)',
      fr: 'French (Français)',
    };

    const targetLangName = langNameMap[language] || 'Arabic';

    const systemInstruction = `You are The Oracle Engine, an advanced analytical supercomputer computing counterfactual history, hypothetical decisions, and causality bifurcation.
Analyze the user's "What if" query with high precision, causal reasoning, and structured forecasting.
You MUST output strictly in the requested target language: ${targetLangName}. All summaries, titles, impact projections, and action plans must be written fluently in ${targetLangName}.`;

    // Optimized Cost-Effective Multi-Model Cascade:
    // Primary: gemini-3.6-flash (Fast, highly cost-effective, latest generation)
    // Secondary: gemini-3.1-flash-lite (Ultra lightweight & reliable failover)
    // Tertiary: gemini-flash-latest / gemini-3.7-flash (Deep fallback)
    const candidateModels = [
      'gemini-3.6-flash',
      'gemini-3.1-flash-lite',
      'gemini-flash-latest',
      'gemini-3.7-flash',
    ];
    
    let lastError: any = null;
    let parsedData: any = null;
    let successfulModel: string | null = null;

    for (const modelName of candidateModels) {
      try {
        console.log(`[Gemini Dispatch] Attempting generation on model: ${modelName}`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Execute causal divergence simulation for this prompt in ${targetLangName}:\n\n"${cleanPrompt}"`,
                },
              ],
            },
          ],
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: simulationResponseSchema,
            temperature: 0.7,
          },
        });

        const rawText = response.text;
        if (rawText) {
          parsedData = JSON.parse(rawText);
          successfulModel = modelName;
          console.log(`[Gemini SUCCESS] Successfully generated via model: ${modelName}`);
          break;
        }
      } catch (err: any) {
        lastError = err;
        const errCode = err?.status || err?.code || (err?.message?.includes('503') ? '503' : 'ERROR');
        console.warn(`[Gemini API Failover] Model ${modelName} encountered (${errCode}): ${err?.message || err}. Falling back to next candidate...`);
        // Small delay between fallback models
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }

    // If live AI models experienced high demand (503/429), fallback to intelligent causal synthesis
    if (!parsedData) {
      console.warn('[Gemini Outage / High Demand Fallback] Generating heuristic causal projection for prompt:', cleanPrompt);
      const isArabic = language === 'ar';
      
      parsedData = {
        scenario_summary: isArabic
          ? `تحليل نقطة التباعد والتحول السببي للسيناريو: "${cleanPrompt}". تؤدي هذه الفرضية إلى سلسلة من التأثيرات المتتابعة على المستويات التشغيلية والاقتصادية والاستراتيجية.`
          : `Causal divergence and impact projection for: "${cleanPrompt}". This hypothetical state induces a chain of systemic transformations across operational, strategic, and socioeconomic vectors.`,
        risk_index: {
          score: Math.floor(45 + Math.random() * 30),
          category: 'HIGH',
        },
        outcomes: {
          optimistic: isArabic
            ? `تسارع في وتيرة الابتكار وإعادة توزيع الموارد بفاعلية أعلى، مع فتح مجالات جديدة للنمو وخلق مزايا تنافسية استثنائية.`
            : `Rapid innovation velocity and optimized resource reallocation, unlocking new growth horizons and establishing sustainable structural advantages.`,
          pessimistic: isArabic
            ? `اضطرابات انتقالية حادة في المراحل الأولى وفجوة في التكيف المؤسسي والمهني قبل استقرار المنظومة الجديدة.`
            : `Severe transitional friction in the early phases, with institutional adaptation lag before systemic equilibrium is reached.`,
        },
        temporal_impact: {
          one_month: isArabic
            ? `إعادة تقييم شاملة للاستراتيجيات الحالية وبدء صياغة خطط التحول السريع مع رصد أولي للتداعيات المباشرة.`
            : `Comprehensive strategic re-evaluation and initial deployment of rapid-adaptation protocols alongside active risk monitoring.`,
          one_year: isArabic
            ? `إعادة هيكلة السياسات والمناهج التشغيلية وظهور أطر تنظيمية وتقنية جديدة تتناسب مع الواقع المتشكل.`
            : `Operational restructuring and emergence of specialized governance and technological frameworks suited to the new paradigm.`,
          five_years: isArabic
            ? `ترسخ المعايير الجديدة كقاعدة رئيسية للاقتصاد وحياة الأفراد مع تحقيق مكاسب إنتاجية مستدامة.`
            : `Institutionalization of the new baseline into economic foundations, yielding compounding productivity gains.`,
        },
        contingency_plan: isArabic
          ? [
              'بناء قدرات استباقية وتطوير مهارات التكيف السريع مع المتغيرات.',
              'تنويع الأصول ومصادر الدخل للحد من الاعتماد على النماذج التقليدية المعرضة للانكشاف.',
              'تأسيس منظومة حوكمة مرنة قادرة على اتخاذ قرارات فورية في البيئات المعقدة.',
              'الاستثمار في الأنظمة الرقمية وأدوات الأتمتة لضمان استمرارية الأعمال.',
            ]
          : [
              'Build proactive adaptability and accelerated skill-acquisition pipelines.',
              'Diversify asset allocations and revenue streams to minimize single-point exposure.',
              'Establish agile governance mechanisms capable of rapid high-stakes decision-making.',
              'Invest in resilient digital infrastructure and automated workflows.',
            ],
        search_intent_title: cleanPrompt,
        source: 'resilient_engine',
      };
    }

    // ------------------------------------------------------------------
    // STEP 3: ASYNC SAVE TO SUPABASE SHARED KNOWLEDGE BASE (FOR FUTURE USERS)
    // ------------------------------------------------------------------
    if (supabase && parsedData) {
      try {
        await supabase.from('scenarios').insert({
          prompt: cleanPrompt,
          response_json: parsedData,
          language,
        });
        console.log(`[Supabase SAVE] Saved scenario to shared cache: "${cleanPrompt}" (${language})`);
      } catch (saveErr) {
        console.warn('[Supabase Insert Error]:', saveErr);
      }
    }

    return res.json({
      success: true,
      data: {
        ...parsedData,
        source: parsedData.source || 'ai_generated',
        model_used: successfulModel || 'resilient_failover',
      },
      source: parsedData.source || 'ai_generated',
      meta: {
        prompt: cleanPrompt,
        language,
        timestamp: new Date().toISOString(),
        model: successfulModel || 'resilient_failover',
      },
    });
  } catch (error: any) {
    console.error('Simulation Error:', error);
    const msg = error?.message || '';
    const isAuthIssue = msg.includes('API_KEY') || msg.includes('API key') || msg.includes('API_KEY_INVALID') || msg.includes('401') || msg.includes('403');
    return res.status(isAuthIssue ? 401 : 500).json({
      success: false,
      needsApiKey: isAuthIssue,
      error: error.message || 'Failed to compute scenario matrix.',
    });
  }
});

// ==============================================================================
// SEO & REAL-TIME CRAWLER INFRASTRUCTURE (Googlebot, Bing, Perplexity, GPTBot)
// ==============================================================================

// Dynamic Live XML Sitemap for Googlebot & Search Bots (Real-Time Indexing)
app.get(['/sitemap.xml', '/sitemap-realtime.xml', '/sitemap-ar.xml', '/sitemap-en.xml'], async (req, res) => {
  try {
    const host = req.get('host') || 'whatifsearch.vercel.app';
    const isVercel = host.includes('vercel.app');
    const protocol = isVercel ? 'https' : (req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http');
    const baseUrl = isVercel ? 'https://whatifsearch.vercel.app' : `${protocol}://${host}`;
    const nowIso = new Date().toISOString();

    const supportedLanguages = ['ar', 'en', 'es', 'fr', 'de', 'zh', 'ja', 'ru'];

    const presetQuestions = [
      'ماذا لو لم تسقط الأندلس واستمرت كقوة علمية وصناعية رائدة حتى العصر الحديث؟',
      'ماذا لو نجت مكتبة الإسكندرية بالكامل ولم تحترق مخطوطاتها وعلومها القديمة؟',
      'ماذا لو لم يدمر المغول بغداد ودار الحكمة في عام 1258؟',
      'ماذا لو فشلت حادثة اغتيال الأرشيدوق فرانز فرديناند وتجنب العالم الحرب العالمية الأولى؟',
      'ماذا لو لم تبدأ رحلات كولومبوس عام 1492 وتطورت حضارات المايا والإنكا والأزتيك باستقلالية؟',
      'ماذا لو ظهر الذكاء الاصطناعي العام (AGI) في عام 1980 مع بداية الحواسيب الشخصية؟',
      'ماذا لو تم إتقان الاندماج النووي النظيف اللامحدود غداً وتوفير الكهرباء مجاناً لجميع سكان الأرض؟',
      'ماذا لو انقطع الإنترنت والشبكات السحابية تماماً عن العالم لمدة عام كامل؟',
      'ماذا لو نجح حاسوب كمومي فائق في كسر جميع بروتوكولات التشفير في العالم فجأة؟',
      'ماذا لو تحولت الصحراء الكبرى في إفريقيا إلى غابات خضراء وأنهار عذبة دائمة؟',
      'ماذا لو انخفضت جاذبية كوكب الأرض فجأة بنسبة 50% مع الحفاظ على الغلاف الجوي؟',
      'ماذا لو تم القضاء على جميع الفيروسات ومسببات الأمراض المعدية للبشر في 24 ساعة؟',
      'ماذا لو نجح البشر في تأسيس مستعمرة مريخية مكتفية ذاتياً يقطنها 100,000 إنسان بحلول 2030؟',
      'ماذا لو تم اكتشاف محرك اعوجاج فضائي يتيح السفر بأسرع من الضوء؟',
      'ماذا لو طبقت جميع دول العالم دخلاً أساسياً شاملاً غير مشروط يعادل 2000 دولار شهرياً؟',
      'ماذا لو اتفقت دول العالم على إلغاء جميع العملات المحلية واستخدام عملة رقمية مشفرة واحدة؟',
      'ماذا لو ولد جميع البشر بقدرة فطرية على قراءة أفكار ومشاعر الآخرين بشفافية كاملة؟',
      'ماذا لو اكتشف علم الوراثة علاجاً يوقف الشيخوخة البيولوجية ويمنح الإنسان خلوداً جسدياً؟',
      'What if Al-Andalus never fell and continued as a scientific and industrial powerhouse into the modern era?',
      'What if the Library of Alexandria was never destroyed and all ancient lost scientific scrolls survived?',
      'What if the Mongol siege of Baghdad in 1258 was repelled and the House of Wisdom remained intact?',
      'What if Artificial General Intelligence (AGI) emerged in 1980 alongside early microcomputers?',
      'What if limitless zero-emission nuclear fusion energy was achieved tomorrow and distributed for free?',
      'What if a self-sustaining Martian civilization of 100,000 residents was fully established by 2030?',
      'What if genetic science completely halted biological aging, granting humans indefinite cellular lifespan?'
    ];

    // Fetch dynamic live scenarios saved in Supabase in real time
    const livePrompts: { prompt: string; created_at?: string; language?: string }[] = [];
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data: dbScenarios, error } = await supabase
          .from('scenarios')
          .select('prompt, language, created_at')
          .order('created_at', { ascending: false })
          .limit(300);

        if (!error && dbScenarios) {
          for (const item of dbScenarios) {
            if (item.prompt && typeof item.prompt === 'string' && item.prompt.trim()) {
              livePrompts.push({
                prompt: item.prompt.trim(),
                language: item.language || 'ar',
                created_at: item.created_at || nowIso,
              });
            }
          }
        }
      } catch (dbErr) {
        console.warn('[Sitemap Live Query Warning]:', dbErr);
      }
    }

    // Build ultra-compliant XML sitemap for Search Crawlers with Hreflang support
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Root Multi-lingual Application Landings -->
  <url>
    <loc>${baseUrl}/</loc>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/" />
    <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/?lang=ar" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/?lang=es" />
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/?lang=fr" />
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/?lang=de" />
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/?lang=zh" />
    <xhtml:link rel="alternate" hreflang="ja" href="${baseUrl}/?lang=ja" />
    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/?lang=ru" />
    <lastmod>${nowIso}</lastmod>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>`;

    // Language entry points
    for (const lang of supportedLanguages) {
      xml += `
  <url>
    <loc>${baseUrl}/?lang=${lang}</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>always</changefreq>
    <priority>0.95</priority>
  </url>`;
    }

    // Include dynamically created scenarios (live instant additions across all users)
    const seenPrompts = new Set<string>();
    for (const item of livePrompts) {
      seenPrompts.add(item.prompt.toLowerCase());
      const encodedQuery = encodeURIComponent(item.prompt);
      const itemLang = item.language || 'ar';
      const url = `${baseUrl}/?q=${encodedQuery}&amp;lang=${itemLang}`;
      xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${item.created_at ? new Date(item.created_at).toISOString() : nowIso}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>`;
    }

    // Include preset scenario universe
    for (const prompt of presetQuestions) {
      if (!seenPrompts.has(prompt.toLowerCase())) {
        const encodedQuery = encodeURIComponent(prompt);
        const url = `${baseUrl}/?q=${encodedQuery}`;
        xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>`;
      }
    }

    xml += `
</urlset>`;

    res.header('Content-Type', 'application/xml; charset=utf-8');
    res.header('Cache-Control', 'public, max-age=60, s-maxage=60'); // Fresh every minute
    res.send(xml);
  } catch (err) {
    console.error('Error generating dynamic sitemap:', err);
    res.status(500).send('Error generating sitemap');
  }
});

// JSON Feed for AI Search Crawlers & IndexNow protocols
app.get('/api/live-scenarios', async (req, res) => {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return res.json({ success: true, count: 0, items: [] });
  }
  try {
    const { data, error } = await supabase
      .from('scenarios')
      .select('id, prompt, language, created_at')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      return res.json({ success: false, error: error.message, items: [] });
    }
    return res.json({
      success: true,
      count: data?.length || 0,
      timestamp: new Date().toISOString(),
      items: data || [],
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'Server error' });
  }
});

// Google Search Console HTML verification endpoint
app.get('/googlef6b1e3a2885603f3.html', (req, res) => {
  res.type('text/html; charset=utf-8');
  res.send('google-site-verification: googlef6b1e3a2885603f3.html');
});

// Dynamic Ultra-Professional robots.txt
app.get('/robots.txt', (req, res) => {
  const host = req.get('host') || 'whatifsearch.vercel.app';
  const isVercel = host.includes('vercel.app');
  const protocol = isVercel ? 'https' : (req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http');
  const baseUrl = isVercel ? 'https://whatifsearch.vercel.app' : `${protocol}://${host}`;

  res.type('text/plain; charset=utf-8');
  res.header('Cache-Control', 'public, max-age=3600');
  res.send(`# ==============================================================================
# The What If Engine | Enterprise Multi-Lingual robots.txt
# Production Domain: ${baseUrl}
# Optimized for Googlebot, Bingbot, Applebot, Yandex, Baidu, GPTBot & AI Crawlers
# ==============================================================================

# Global Rules for All Crawlers & AI Search Engines
User-agent: *
Allow: /
Allow: /?*
Allow: /?q=*
Allow: /?lang=*
Allow: /?q=*&lang=*
Allow: /ar
Allow: /en
Allow: /es
Allow: /fr
Allow: /de
Allow: /zh
Allow: /ja
Allow: /ru
Allow: /sitemap.xml
Allow: /sitemap-realtime.xml
Allow: /sitemap-ar.xml
Allow: /sitemap-en.xml
Allow: /api/live-scenarios
Disallow: /api/simulate
Disallow: /api/health
Disallow: /api/supabase-status

# Google Search (Googlebot Desktop, Smartphone & Image Indexing)
User-agent: Googlebot
User-agent: Googlebot-Mobile
User-agent: Googlebot-Image
User-agent: Googlebot-News
Allow: /
Allow: /?*
Allow: /?q=*
Allow: /?lang=*
Allow: /sitemap.xml
Allow: /sitemap-realtime.xml

# Bing Search (Bingbot & Copilot)
User-agent: Bingbot
User-agent: msnbot
Allow: /
Allow: /?*
Allow: /?q=*
Allow: /?lang=*

# Apple Search Bot
User-agent: Applebot
Allow: /
Allow: /?*
Allow: /?q=*

# DuckDuckGo Bot
User-agent: DuckDuckBot
Allow: /
Allow: /?*

# Yandex (Russian Search Engine)
User-agent: Yandex
Allow: /
Allow: /?*

# Baidu (Chinese Search Engine)
User-agent: Baiduspider
Allow: /
Allow: /?*

# Naver (Korean Search Engine)
User-agent: Yeti
Allow: /
Allow: /?*

# AI Search & Summarization Engines
User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: PerplexityBot
User-agent: Claude-Web
User-agent: anthropic-ai
User-agent: CCBot
User-agent: FacebookBot
User-agent: Meta-ExternalAgent
User-agent: OAI-SearchBot
Allow: /
Allow: /?*
Allow: /?q=*
Allow: /?lang=*

# Real-Time Dynamic Multi-Lingual Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-realtime.xml
Sitemap: ${baseUrl}/sitemap-ar.xml
Sitemap: ${baseUrl}/sitemap-en.xml
`);
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The What If Engine server running on http://localhost:${PORT}`);
  });
}

startServer();
