import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';
import { createClient } from '@supabase/supabase-js';

const simulationResponseSchema = {
  type: Type.OBJECT,
  properties: {
    scenario_summary: {
      type: Type.STRING,
      description: 'Comprehensive 2-3 sentence overview of the hypothetical scenario.',
    },
    risk_index: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER, description: 'Risk rating from 1 to 100.' },
        category: {
          type: Type.STRING,
          enum: ['LOW', 'MODERATE', 'HIGH', 'EXTREME'],
        },
      },
      required: ['score', 'category'],
    },
    outcomes: {
      type: Type.OBJECT,
      properties: {
        optimistic: { type: Type.STRING, description: 'Best-case scenario.' },
        pessimistic: { type: Type.STRING, description: 'Worst-case scenario.' },
      },
      required: ['optimistic', 'pessimistic'],
    },
    temporal_impact: {
      type: Type.OBJECT,
      properties: {
        one_month: { type: Type.STRING, description: '1-Month outlook.' },
        one_year: { type: Type.STRING, description: '1-Year outlook.' },
        five_years: { type: Type.STRING, description: '5-Year outlook.' },
      },
      required: ['one_month', 'one_year', 'five_years'],
    },
    contingency_plan: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '4 actionable tactical steps.',
    },
    search_intent_title: {
      type: Type.STRING,
      description: 'Normalized scenario title.',
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = req.url || '';

  if (url.includes('/health') || req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      hasServerApiKey: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0,
    });
  }

  if (url.includes('/simulate') || req.method === 'POST') {
    const { prompt, language = 'ar', customApiKey } = req.body || {};
    const key = customApiKey || process.env.GEMINI_API_KEY;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    if (!key) {
      return res.status(401).json({
        success: false,
        needsApiKey: true,
        error: 'NO_API_KEY: Please provide a Gemini API Key to run simulations.',
      });
    }

    const cleanPrompt = prompt.trim();
    const targetLangName = language === 'ar' ? 'Arabic' : 'English';

    try {
      const ai = new GoogleGenAI({ apiKey: key.trim() });
      const candidateModels = [
        'gemini-3.6-flash',
        'gemini-3.1-flash-lite',
        'gemini-flash-latest',
        'gemini-3.7-flash',
      ];

      let parsedData: any = null;
      let successfulModel: string | null = null;
      let lastErr: any = null;

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: [
              {
                role: 'user',
                parts: [{ text: `Execute causal divergence simulation for this prompt in ${targetLangName}:\n\n"${cleanPrompt}"` }],
              },
            ],
            config: {
              systemInstruction: `You are The Oracle Engine, computing counterfactual forecasting. Output strictly in ${targetLangName}.`,
              responseMimeType: 'application/json',
              responseSchema: simulationResponseSchema,
              temperature: 0.7,
            },
          });

          if (response.text) {
            parsedData = JSON.parse(response.text);
            successfulModel = modelName;
            break;
          }
        } catch (err: any) {
          lastErr = err;
        }
      }

      if (!parsedData) {
        throw lastErr || new Error('All AI models failed to respond.');
      }

      return res.status(200).json({
        success: true,
        data: {
          ...parsedData,
          source: 'ai_generated',
          model_used: successfulModel,
        },
      });
    } catch (apiError: any) {
      const errMsg = apiError?.message || '';
      const isAuthError = errMsg.includes('API_KEY_INVALID') || errMsg.includes('invalid') || errMsg.includes('400') || errMsg.includes('401') || errMsg.includes('403');
      
      return res.status(isAuthError ? 401 : 500).json({
        success: false,
        needsApiKey: isAuthError,
        error: isAuthError ? 'INVALID_API_KEY: The API key provided is invalid or expired.' : (apiError?.message || 'Failed to simulate'),
      });
    }
  }

  return res.status(404).json({ error: 'Endpoint not found' });
}
