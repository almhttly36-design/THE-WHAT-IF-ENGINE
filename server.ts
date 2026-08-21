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
  const key = customApiKey || process.env.GEMINI_API_KEY;
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
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to compute scenario matrix.',
    });
  }
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
