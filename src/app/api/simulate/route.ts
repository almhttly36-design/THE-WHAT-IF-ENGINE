import { runSimulation } from '@/lib/gemini';

// Next.js 14 App Router POST Route Handler: /api/simulate
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, language = 'ar', customApiKey } = body;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return Response.json(
        {
          success: false,
          error: 'A valid "prompt" string is required.',
        },
        { status: 400 }
      );
    }

    const data = await runSimulation(prompt.trim(), language, customApiKey);

    return Response.json({
      success: true,
      data,
      meta: {
        prompt: prompt.trim(),
        language,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('API Simulation Error:', error);
    return Response.json(
      {
        success: false,
        error: error.message || 'Failed to compute scenario matrix with Gemini.',
      },
      { status: 500 }
    );
  }
}
