import { GoogleGenAI, Type } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

export function getGeminiClient(customApiKey?: string): GoogleGenAI {
  const key = customApiKey || process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error('GEMINI_API_KEY is required to run simulations. Please set it in environment variables or enter it in the UI.');
  }
  if (!aiClient || customApiKey) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export const simulationResponseSchema = {
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
      description: 'A high-converting, SEO-optimized title for this scenario in the target language.',
    },
  },
  required: [
    'scenario_summary',
    'risk_index',
    'outcomes',
    'temporal_impact',
    'contingency_plan',
    'search_intent_title',
  ],
};

export async function runSimulation(prompt: string, language: string = 'ar', customApiKey?: string) {
  const ai = getGeminiClient(customApiKey);

  const langNameMap: Record<string, string> = {
    ar: 'Arabic (العربية)',
    en: 'English',
    es: 'Spanish (Español)',
    fr: 'French (Français)',
  };

  const targetLangName = langNameMap[language] || 'Arabic';

  const systemInstruction = `You are The Oracle Engine. You analyze 'What if' scenarios. You MUST return ONLY a raw JSON object with this exact structure: { scenario_summary: string, risk_index: { score: number, category: string }, outcomes: { optimistic: string, pessimistic: string }, temporal_impact: { one_month: string, one_year: string, five_years: string }, contingency_plan: string[], search_intent_title: string }. Respond in the language requested by the user: ${targetLangName}.`;

  const candidateModels = ['gemini-3.7-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
  let lastError: any = null;

  for (const modelName of candidateModels) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Execute causal divergence simulation for this prompt in ${targetLangName}:\n\n"${prompt.trim()}"`,
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
          return JSON.parse(rawText);
        }
      } catch (err: any) {
        lastError = err;
        const isRateLimitOrHighDemand =
          err?.status === 'UNAVAILABLE' ||
          err?.message?.includes('503') ||
          err?.message?.includes('429') ||
          err?.message?.includes('high demand');
        if (isRateLimitOrHighDemand && attempt < 2) {
          await new Promise((resolve) => setTimeout(resolve, 800 * attempt));
          continue;
        }
        break; // try next candidate model
      }
    }
  }

  throw lastError || new Error('All model candidates are currently experiencing high demand. Please try again in a moment.');
}
