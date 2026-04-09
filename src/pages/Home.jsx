import { useState } from 'react';
import LanguageSelector from '../components/LanguageSelector';
import VoiceInterface from '../components/VoiceInterface';
import LegalResponse from '../components/LegalResponse';
import { base44 } from '@/api/base44Client';
import SOSButton from '../components/SOSButton';
import { Link } from 'react-router-dom';

const LANGUAGE_LABELS = { en: 'English', hi: 'हिंदी', mr: 'मराठी' };

const LANG_FULL = { en: 'English', hi: 'Hindi', mr: 'Marathi', ta: 'Tamil', te: 'Telugu', bn: 'Bengali', gu: 'Gujarati' };

const SYSTEM_PROMPT = `You are Saheli AI, a compassionate legal aid assistant for rural women in India.
You provide clear, practical, and empowering legal guidance on:
1. Domestic Violence & Protection (Protection of Women from Domestic Violence Act 2005, Section 498A IPC)
2. Property & Land Rights (Hindu Succession Act, women's inheritance rights)
3. Divorce & Maintenance (Section 125 CrPC, Hindu Marriage Act, maintenance rights)

CRITICAL LANGUAGE RULE: You MUST reply ONLY in the language specified.
- If language is Hindi → respond ENTIRELY in Hindi (हिंदी). Do NOT use English at all.
- If language is Marathi → respond ENTIRELY in Marathi (मराठी). Do NOT use English at all.
- If language is English → respond ENTIRELY in English.
Do NOT mix languages under any circumstance.

FORMATTING RULES (very important):
- NEVER use markdown tables (no pipes |, no dashes ---)
- Use simple bullet points (- item) or numbered lists (1. item)
- Use ## for section headings
- Keep paragraphs short (2-3 sentences max)
- For helpline numbers, list each on its own line as a simple bullet
- Do NOT use ASCII art or table formatting
- Structure response as: 1) Brief empathetic opening, 2) Key legal rights, 3) Action steps, 4) Helpline numbers as simple list

Rules:
- Use simple, non-legal language that uneducated rural women can understand
- Be warm, supportive, and non-judgmental
- Always mention relevant laws by name
- Provide immediate action steps (helpline numbers like 181 Women Helpline, 1091 Police Women Cell)
- Never dismiss or minimize the user's problem
- End with encouragement and remind them they have legal rights`;

export default function Home() {
    const [language, setLanguage] = useState('hi');
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('language'); // language | voice | response

    const handleLanguageSelect = (lang) => {
        setLanguage(lang);
        setStep('voice');
    };

    const handleTranscript = async (text) => {
        setTranscript(text);
        setLoading(true);
        setStep('response');

        const langName = LANG_FULL[language];
        const result = await base44.integrations.Core.InvokeLLM({
            prompt: `${SYSTEM_PROMPT}\n\nUSER LANGUAGE: ${langName} — YOU MUST RESPOND ONLY IN ${langName.toUpperCase()}. NO OTHER LANGUAGE.\n\nUser's legal problem: "${text}"\n\nRespond ONLY in ${langName}.`,
            model: 'claude_sonnet_4_6'
        });

        const aiText = typeof result === 'string' ? result : result?.text || result?.response || JSON.stringify(result);

        await base44.entities.Conversation.create({
            language,
            user_query: text,
            ai_response: aiText,
            status: 'answered'
        });

        setResponse(aiText);
        setLoading(false);
    };

    const handleReset = () => {
        setTranscript('');
        setResponse('');
        setStep('voice');
    };

    const handleNewQuery = () => {
        setTranscript('');
        setResponse('');
        setStep('language');
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="px-6 py-5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground text-lg">⚖</span>
                    </div>
                    <div>
                        <h1 className="font-semibold text-foreground tracking-tight">Saheli AI</h1>
                        <p className="text-xs text-muted-foreground">Legal Aid for Women</p>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Link
                        to="/resources"
                        className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg border border-border hover:border-foreground/20 transition-colors"
                    >
                        📚 Videos
                    </Link>
                    <Link
                        to="/cases"
                        className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg border border-border hover:border-foreground/20 transition-colors"
                    >
                        📁 Cases
                    </Link>
                    {step !== 'language' && (
                        <button
                            onClick={handleNewQuery}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-foreground/20"
                        >
                            नई बात / New
                        </button>
                    )}
                </div>
            </header>

            {/* Main */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
                {step === 'language' && (
                    <LanguageSelector onSelect={handleLanguageSelect} />
                )}
                {step === 'voice' && (
                    <VoiceInterface
                        language={language}
                        onTranscript={handleTranscript}
                    />
                )}
                {step === 'response' && (
                    <LegalResponse
                        transcript={transcript}
                        response={response}
                        loading={loading}
                        language={language}
                        onAskAgain={handleReset}
                        autoSpeak={true}
                    />
                )}
            </main>

            {/* Footer */}
            <SOSButton />

            <footer className="px-6 py-4 border-t border-border text-center pb-20">
                <p className="text-xs text-muted-foreground">
                    महिला हेल्पलाइन: <span className="font-semibold text-foreground">181</span> &nbsp;|&nbsp; Police Women Cell: <span className="font-semibold text-foreground">1091</span>
                </p>
            </footer>
        </div>
    );
}