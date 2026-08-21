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

export default function LegalResponse({ transcript, response, loading, language, onAskAgain }) {
    const labels = LABELS[language] || LABELS.en;

    const renderResponseContent = () => {
        if (typeof response === 'string') {
            return <p className="text-sm text-foreground">{response}</p>;
        }
        return (
            <div className="space-y-4">
                <h2 className="text-sm font-bold text-foreground border-b border-border pb-1">
                    {response.summary}
                </h2>
                {response.steps && (
                    <div className="space-y-2 mt-2">
                        {response.steps.map((s, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                <span className="flex-1 leading-relaxed text-foreground">{s.instruction}</span>
                            </div>
                        ))}
                    </div>
                )}
                {response.documents && (
                    <div className="mt-3 p-3 bg-primary/5 border border-primary/10 rounded-xl">
                        <p className="text-xs font-semibold text-primary mb-1">
                           {language === 'hi' ? 'दस्तावेज' : language === 'mr' ? 'कागदपत्रे' : language === 'ta' ? 'ஆவணங்கள்' : 'Documents'}
                        </p>
                        <p className="text-sm text-foreground">{response.documents}</p>
                    </div>
                )}
                {response.videoId && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-border shadow-sm">
                        <div className="aspect-video w-full bg-muted relative">
                            <iframe 
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${response.videoId}`}
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}
            </div>
        );
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
                        {renderResponseContent()}
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