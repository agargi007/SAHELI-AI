import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send } from 'lucide-react';

const LANG_CODES = { hi: 'hi-IN', mr: 'mr-IN', en: 'en-IN', ta: 'ta-IN', te: 'te-IN', bn: 'bn-IN', gu: 'gu-IN' };
const PROMPTS = {
    hi: { idle: 'बोलने के लिए दबाएं', listening: 'सुन रहे हैं...', placeholder: 'या यहाँ टाइप करें...', send: 'भेजें', topic: 'अपनी समस्या बताएं' },
    mr: { idle: 'बोलण्यासाठी दाबा', listening: 'ऐकत आहे...', placeholder: 'किंवा येथे टाइप करा...', send: 'पाठवा', topic: 'आपली समस्या सांगा' },
    ta: { idle: 'பேச அழுத்தவும்', listening: 'கேட்கிறோம்...', placeholder: 'அல்லது இங்கே தட்டச்சு செய்யவும்...', send: 'அனுப்பு', topic: 'உங்கள் பிரச்சினை சொல்லுங்கள்' },
    te: { idle: 'మాట్లాడటానికి నొక్కండి', listening: 'వినడం...', placeholder: 'లేదా ఇక్కడ టైప్ చేయండి...', send: 'పంపు', topic: 'మీ సమస్యను చెప్పండి' },
    bn: { idle: 'বলতে চাপ দিন', listening: 'শুনছি...', placeholder: 'বা এখানে টাইপ করুন...', send: 'পাঠান', topic: 'আপনার সমস্যা বলুন' },
    gu: { idle: 'બોલવા દબાવો', listening: 'સાંભળી રહ્યા છીએ...', placeholder: 'અથવા અહીં ટાઇપ કરો...', send: 'મોકલો', topic: 'તમારી સમસ્યા કહો' },
    en: { idle: 'Tap to speak', listening: 'Listening...', placeholder: 'Or type here...', send: 'Send', topic: 'Tell us your problem' },
};

const TOPICS = {
    hi: [
        { id: 'domestic_violence', label: '🛡️ घरेलू हिंसा', desc: 'सुरक्षा और कानूनी अधिकार' },
        { id: 'property_rights', label: '🏠 संपत्ति अधिकार', desc: 'जमीन और विरासत' },
        { id: 'divorce_maintenance', label: '⚖️ तलाक / भरण-पोषण', desc: 'गुजारा भत्ता और अधिकार' },
    ],
    mr: [
        { id: 'domestic_violence', label: '🛡️ घरगुती हिंसा', desc: 'संरक्षण आणि कायदेशीर हक्क' },
        { id: 'property_rights', label: '🏠 मालमत्ता हक्क', desc: 'जमीन आणि वारसाहक्क' },
        { id: 'divorce_maintenance', label: '⚖️ घटस्फोट / पोटगी', desc: 'पोटगी आणि हक्क' },
    ],
    ta: [
        { id: 'domestic_violence', label: 'வீட்டு வன்மம்', desc: 'பாதுகாப்பு மற்றும் சட்ட உரிமைகள்' },
        { id: 'property_rights', label: 'சொத்து உரிமைகள்', desc: 'நிலம் மற்றும் உரிமை' },
        { id: 'divorce_maintenance', label: 'விவாகரத்து / ஜீவனாஂசம்', desc: 'ஜீவனாஂசம் மற்றும் உரிமைகள்' },
    ],
    te: [
        { id: 'domestic_violence', label: 'గృహ హింస', desc: 'రక్షణ మరియు చట్ట హక్కులు' },
        { id: 'property_rights', label: 'ఆస్తి హక్కులు', desc: 'భూమి మరియు వారసత్వం' },
        { id: 'divorce_maintenance', label: 'వివాహవిచ్ఛేదం / నిర్వహణ', desc: 'జీవనాధారం మరియు హక్కులు' },
    ],
    bn: [
        { id: 'domestic_violence', label: 'ঘরোয়া হিংসা', desc: 'সুরক্ষা ও আইনি অধিকার' },
        { id: 'property_rights', label: 'সম্পত্তি অধিকার', desc: 'জমি ও উত্তরাধিকার' },
        { id: 'divorce_maintenance', label: 'তালাক / ভরণপোষণ', desc: 'ভরণপোষণ ও অধিকার' },
    ],
    gu: [
        { id: 'domestic_violence', label: 'ઘરેલુ હિંસા', desc: 'સુરક્ષા અને કાનૂની હક્કો' },
        { id: 'property_rights', label: 'મિલકત હક્કો', desc: 'જમીન અને વારસો' },
        { id: 'divorce_maintenance', label: 'છૂટાછેડા / ભરણપોષણ', desc: 'ગુજારા ભત્તુ અને હક્કો' },
    ],
    en: [
        { id: 'domestic_violence', label: 'Domestic Violence', desc: 'Protection & legal rights' },
        { id: 'property_rights', label: 'Property Rights', desc: 'Land & inheritance' },
        { id: 'divorce_maintenance', label: 'Divorce & Maintenance', desc: 'Alimony & rights' },
    ],
};

export default function VoiceInterface({ language, onTranscript }) {
    const [isListening, setIsListening] = useState(false);
    const [interim, setInterim] = useState('');
    const [text, setText] = useState('');
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [supported, setSupported] = useState(true);
    const recognitionRef = useRef(null);
    const ui = PROMPTS[language] || PROMPTS.en;
    const topics = TOPICS[language] || TOPICS.en;

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) { setSupported(false); return; }
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = true;
        rec.lang = LANG_CODES[language] || 'hi-IN';
        rec.onresult = (e) => {
            let final = '', inter = '';
            for (let r of e.results) { if (r.isFinal) final += r[0].transcript; else inter += r[0].transcript; }
            if (final) { setText(prev => (prev + ' ' + final).trim()); setInterim(''); }
            else setInterim(inter);
        };
        rec.onend = () => setIsListening(false);
        recognitionRef.current = rec;
    }, [language]);

    const toggleListening = () => {
        if (isListening) { recognitionRef.current?.stop(); setIsListening(false); }
        else { recognitionRef.current?.start(); setIsListening(true); setInterim(''); }
    };

    const handleSend = () => {
        const final = text.trim();
        if (!final) return;
        const prefix = selectedTopic ? `[Topic: ${selectedTopic}] ` : '';
        onTranscript(prefix + final);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm flex flex-col gap-6">
            <div className="text-center">
                <p className="text-sm font-semibold text-foreground mb-1">{ui.topic}</p>
                <p className="text-xs text-muted-foreground">नीचे से एक विषय चुनें</p>
            </div>

            {/* Topic Pills */}
            <div className="grid grid-cols-1 gap-2">
                {topics.map((t) => (
                    <motion.button
                        key={t.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedTopic(t.id === selectedTopic ? null : t.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${selectedTopic === t.id
                                ? 'border-primary bg-gradient-to-r from-primary/10 to-orange-50 shadow-sm'
                                : 'border-border bg-card hover:bg-accent'
                            }`}
                    >
                        <span className="text-lg">{t.label.split(' ')[0]}</span>
                        <div>
                            <div className="text-sm font-medium text-foreground">{t.label.includes(' ') ? t.label.slice(t.label.indexOf(' ') + 1) : t.label}</div>
                            <div className="text-xs text-muted-foreground">{t.desc}</div>
                        </div>
                        {selectedTopic === t.id && <span className="ml-auto text-primary text-sm">✓</span>}
                    </motion.button>
                ))}
            </div>

            {/* Voice Button */}
            {supported && (
                <div className="flex flex-col items-center gap-3">
                    <motion.button
                        whileTap={{ scale: 0.93 }}
                        animate={isListening ? { scale: [1, 1.08, 1] } : {}}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        onClick={toggleListening}
                        className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all ${isListening
                                ? 'bg-destructive shadow-destructive/40'
                                : 'bg-gradient-to-br from-primary to-orange-400 shadow-primary/30 hover:shadow-primary/50'
                            }`}
                    >
                        <AnimatePresence mode="wait">
                            {isListening ? (
                                <motion.div key="off" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                    <MicOff className="w-9 h-9 text-white" />
                                </motion.div>
                            ) : (
                                <motion.div key="on" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                    <Mic className="w-9 h-9 text-white" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                    <p className="text-sm text-muted-foreground">{isListening ? ui.listening : ui.idle}</p>
                    {interim && <p className="text-xs text-primary italic px-4 text-center">{interim}</p>}
                </div>
            )}

            {/* Text Input */}
            <div className="space-y-3">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={ui.placeholder}
                    rows={3}
                    className="w-full p-4 rounded-2xl border border-border bg-card text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
                />
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSend}
                    disabled={!text.trim()}
                    className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shadow-sm"
                >
                    <Send className="w-4 h-4" />
                    {ui.send}
                </motion.button>
            </div>
        </motion.div>
    );
}