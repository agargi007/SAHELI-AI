import { useEffect, useRef, useState } from 'react';
import NearbyLegalAid from './NearbyLegalAid';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const LANG_CODES = { hi: 'hi-IN', mr: 'mr-IN', en: 'en-IN', ta: 'ta-IN', te: 'te-IN', bn: 'bn-IN', gu: 'gu-IN' };
const LABELS = {
    hi: { you: 'आपकी बात', advice: 'कानूनी सलाह', loading: 'सलाह तैयार हो रही है...', again: 'फिर पूछें', speak: 'सुनें', stop: 'रोकें' },
    mr: { you: 'तुमची बात', advice: 'कायदेशीर सल्ला', loading: 'सल्ला तयार होत आहे...', again: 'पुन्हा विचारा', speak: 'ऐका', stop: 'थांबा' },
    ta: { you: 'உங்கள் கேள்வி', advice: 'சட்ட ஆலோசனை', loading: 'ஆலோசனை தயாராகிறது...', again: 'மீண்டும் கேள்', speak: 'கேளுங்கள்', stop: 'நிறுத்து' },
    te: { you: 'మీ ప్రశ్న', advice: 'చట్టపరమైన సలహా', loading: 'సలహా తయారవుతోంది...', again: 'మళ్ళీ అడగండి', speak: 'వినండి', stop: 'ఆపు' },
    bn: { you: 'আপনার প্রশ্ন', advice: 'আইনি পরামর্শ', loading: 'পরামর্শ তৈরি হচ্ছে...', again: 'আবার জিজ্ঞাসা করুন', speak: 'শুনুন', stop: 'থামুন' },
    gu: { you: 'તમારો પ્રશ્ન', advice: 'કાનૂની સલાહ', loading: 'સલાહ તૈયાર થઈ રही છે...', again: 'ફરી પૂछો', speak: 'સાંભળો', stop: 'રોકો' },
    en: { you: 'Your query', advice: 'Legal Advice', loading: 'Preparing your advice...', again: 'Ask again', speak: 'Listen', stop: 'Stop' },
};

export default function LegalResponse({ transcript, response, loading, language, onAskAgain, autoSpeak = false }) {
    const [speaking, setSpeaking] = useState(false);
    const utteranceRef = useRef(null);
    const labels = LABELS[language] || LABELS.en;

    useEffect(() => {
        return () => window.speechSynthesis?.cancel();
    }, []);

    const cleanForSpeech = (text) => {
        return text
            .replace(/```[\s\S]*?```/g, '')                        // code blocks
            .replace(/`[^`]*`/g, '')                               // inline code
            .replace(/\*\*([^*]+)\*\*/g, '$1')                    // bold
            .replace(/\*([^*]+)\*/g, '$1')                         // italic
            .replace(/#{1,6}\s*/g, '')                             // headings
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')              // links
            .replace(/^[-*\u2022>#+]\s*/gm, '')                   // bullets & symbols
            .replace(/[_~|\\^<>{}\[\]]/g, '')                     // misc symbols
            .replace(/\u2014|\u2013|--|---/g, ', ')                // dashes to pause
            .replace(/\u2019|\u2018/g, "'")                       // smart quotes
            .replace(/\u201c|\u201d/g, '')                         // curly double quotes
            // Remove all emojis and unicode pictographs
            .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')
            .replace(/[\u{2600}-\u{27BF}]/gu, '')
            .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
            .replace(/[\u2702-\u27B0]/g, '')
            .replace(/[\uE000-\uF8FF]/g, '')
            .replace(/\n{2,}/g, '. ')                              // double newlines
            .replace(/\n/g, ' ')                                   // single newlines
            .replace(/\.{2,}/g, '.')                               // multiple dots
            .replace(/\s{2,}/g, ' ')                               // extra spaces
            .trim();
    };

    const speakText = (text) => {
        window.speechSynthesis?.cancel();
        const clean = cleanForSpeech(text);
        const u = new SpeechSynthesisUtterance(clean);
        u.lang = LANG_CODES[language] || 'hi-IN';
        u.rate = 0.88;
        u.pitch = 1.1;
        // Pick a female voice if available
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(v =>
            v.lang.startsWith(LANG_CODES[language]?.split('-')[0] || 'hi') &&
            /female|woman|zira|heera|veena|lekha|priya|aditi/i.test(v.name)
        ) || voices.find(v => v.lang.startsWith(LANG_CODES[language]?.split('-')[0] || 'hi'));
        if (femaleVoice) u.voice = femaleVoice;
        u.onend = () => setSpeaking(false);
        utteranceRef.current = u;
        window.speechSynthesis.speak(u);
        setSpeaking(true);
    };

    // Auto-speak when response arrives
    useEffect(() => {
        if (autoSpeak && response && !loading) {
            // Voices may not be loaded yet — wait for them
            const trySpeak = () => speakText(response);
            if (window.speechSynthesis.getVoices().length > 0) {
                trySpeak();
            } else {
                window.speechSynthesis.onvoiceschanged = () => { trySpeak(); window.speechSynthesis.onvoiceschanged = null; };
            }
        }
    }, [response, loading]);

    const handleSpeak = () => {
        if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
        speakText(response);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm flex flex-col gap-4">
            {/* User Query */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4">
                <p className="text-xs font-medium text-primary/70 mb-1.5 uppercase tracking-wide">{labels.you}</p>
                <p className="text-sm text-foreground leading-relaxed">{transcript}</p>
            </div>

            {/* AI Response */}
            <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-xs text-primary-foreground">⚖</span>
                        </div>
                        <p className="text-xs font-semibold text-foreground">{labels.advice}</p>
                    </div>
                    {!loading && response && (
                        <button
                            onClick={handleSpeak}
                            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${speaking
                                    ? 'border-destructive/30 text-destructive bg-destructive/5'
                                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/20'
                                }`}
                        >
                            {speaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                            {speaking ? labels.stop : labels.speak}
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center gap-3 py-6">
                        <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-primary"
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                />
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">{labels.loading}</p>
                    </div>
                ) : (
                    <div className="text-sm text-foreground leading-relaxed space-y-2">
                        <ReactMarkdown
                            components={{
                                p: ({ children }) => <p className="text-sm leading-relaxed text-foreground mb-2">{children}</p>,
                                strong: ({ children }) => <span className="font-semibold text-foreground">{children}</span>,
                                em: ({ children }) => <span className="italic">{children}</span>,
                                h1: ({ children }) => <h2 className="text-base font-bold text-foreground mt-3 mb-1.5 border-b border-border pb-1">{children}</h2>,
                                h2: ({ children }) => <h3 className="text-sm font-bold text-foreground mt-3 mb-1.5 border-b border-border pb-1">{children}</h3>,
                                h3: ({ children }) => <p className="text-sm font-semibold text-foreground mt-2 mb-1">{children}</p>,
                                ul: ({ children }) => <ul className="space-y-1.5 my-2">{children}</ul>,
                                ol: ({ children }) => <ol className="space-y-1.5 my-2 list-none counter-reset-item">{children}</ol>,
                                li: ({ children, ordered, index }) => (
                                    <li className="flex items-start gap-2 text-sm">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span className="flex-1 leading-relaxed">{children}</span>
                                    </li>
                                ),
                                table: ({ children }) => (
                                    <div className="my-2 rounded-xl overflow-hidden border border-border">
                                        <table className="w-full text-xs">{children}</table>
                                    </div>
                                ),
                                thead: ({ children }) => <thead className="bg-primary/10">{children}</thead>,
                                tbody: ({ children }) => <tbody className="divide-y divide-border">{children}</tbody>,
                                tr: ({ children }) => <tr>{children}</tr>,
                                th: ({ children }) => <th className="px-3 py-2 text-left font-semibold text-foreground">{children}</th>,
                                td: ({ children }) => <td className="px-3 py-2 text-muted-foreground">{children}</td>,
                                blockquote: ({ children }) => (
                                    <div className="border-l-4 border-primary/40 pl-3 py-1 bg-primary/5 rounded-r-lg my-2 text-sm text-muted-foreground">{children}</div>
                                ),
                                hr: () => <hr className="border-border my-3" />,
                                code: ({ children }) => <code className="bg-muted px-1 py-0.5 rounded text-xs">{children}</code>,
                            }}
                        >
                            {response}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            {/* Helplines */}
            {!loading && (
                <div className="grid grid-cols-2 gap-2">
                    <a href="tel:181" className="flex flex-col items-center p-3 rounded-xl bg-rose-50 border border-rose-100 hover:bg-rose-100 transition-colors">
                        <span className="text-lg font-bold text-rose-600">181</span>
                        <span className="text-xs text-rose-500 mt-0.5">Women Helpline</span>
                    </a>
                    <a href="tel:1091" className="flex flex-col items-center p-3 rounded-xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors">
                        <span className="text-lg font-bold text-blue-600">1091</span>
                        <span className="text-xs text-blue-500 mt-0.5">Police Women Cell</span>
                    </a>
                </div>
            )}

            {/* Nearby Legal Aid */}
            {!loading && <NearbyLegalAid language={language} />}

            {/* Ask Again */}
            {!loading && (
                <button
                    onClick={onAskAgain}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all"
                >
                    <RotateCcw className="w-4 h-4" />
                    {labels.again}
                </button>
            )}
        </motion.div>
    );
}