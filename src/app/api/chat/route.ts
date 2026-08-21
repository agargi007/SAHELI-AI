import { NextResponse } from 'next/server';

// Stub for Groq API integration & Bhashini processing
export async function POST(req: Request) {
  try {
    const { message, language, isVoice } = await req.json();

    let processedMessage = message;

    // 1. Unified Transliteration Layer (For Text Input)
    if (!isVoice && language !== 'en') {
      console.log(`[API] Transliterating romanized input to native script for ${language}:`, message);
      // TODO: Connect to Bhashini Transliteration API
      // Bhashini normalization (e.g. Manglish/Hinglish to native token)
      processedMessage = `[Transliterated to ${language}] ${message}`;
    }

    // 2. Natural Voice Recognition processing (For Voice Input)
    if (isVoice) {
      console.log(`[API] Processing colloquial mixed-language voice input for ${language}:`, message);
      // The frontend ASR will send the transcript.
      // Bhashini handles mixed colloquial audio (e.g., Hinglish) if configured correctly.
    }

    // 3. LLM Classification & Guidance (Groq Llama 3)
    console.log(`[API] Sending normalized query to Groq LLM:`, processedMessage);

    // 4. Localized Audio Playback Configuration (Bhashini TTS)
    const dialectConfig = {
      hi: { model: 'hi-IN', voice: 'female-1' },
      mr: { model: 'mr-IN', voice: 'female-1' },
      bn: { model: 'bn-IN', voice: 'female-1' },
      ta: { model: 'ta-IN', voice: 'female-1' },
      te: { model: 'te-IN', voice: 'female-1' },
      gu: { model: 'gu-IN', voice: 'female-1' },
      kn: { model: 'kn-IN', voice: 'female-1' },
      ml: { model: 'ml-IN', voice: 'female-1' }
    };
    console.log(`[API] TTS Dialect config ready for ${language}:`, dialectConfig[language as keyof typeof dialectConfig] || 'default');

    // Placeholder translation helper (replace with real translation/LLM calls)
    const translatePlaceholder = (text: string, lang?: string) => {
      if (!lang || lang === 'en') return text;
      // In dev we simply prefix with language code to indicate localization.
      return `[${lang}] ${text}`;
    };

    // Mock response for development — localized using the placeholder translator
    const rawSteps = [
      { stepNumber: 1, instruction: "Find a safe space immediately.", icon: "shield" },
      { stepNumber: 2, instruction: "Call women's helpline 181.", icon: "phone" },
      { stepNumber: 3, instruction: "Gather important documents.", icon: "file" }
    ];

    const localizedSteps = rawSteps.map(s => ({ ...s, instruction: translatePlaceholder(s.instruction, language) }));

    return NextResponse.json({
      category: "domestic_violence",
      language: language || 'en',
      summary: translatePlaceholder("I understand. Here are steps to stay safe.", language),
      steps: localizedSteps,
      emergencyActions: [translatePlaceholder("Call 100", language), translatePlaceholder("Leave the premises if unsafe", language)],
      relatedLaws: [translatePlaceholder("Protection of Women from Domestic Violence Act 2005", language)],
      helplineNumbers: ["181", "100"],
      audioUrl: null // Stub for Bhashini TTS output
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
