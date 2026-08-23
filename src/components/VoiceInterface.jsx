import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send } from 'lucide-react';

const LANG_CODES = { hi: 'hi-IN', mr: 'mr-IN', en: 'en-IN', ta: 'ta-IN', te: 'te-IN', bn: 'bn-IN', gu: 'gu-IN' };
const PROMPTS = {
    hi: { idle: 'सहायता के लिए बटन दबाएं', listening: 'सुन रहे हैं... रुकने के लिए फिर से दबाएं', placeholder: 'अपनी समस्या यहाँ लिखें...', send: 'भेजें' },
    mr: { idle: 'मदतीसाठी बटण दाबा', listening: 'ऐकत आहे... थांबण्यासाठी पुन्हा दाबा', placeholder: 'तुमची समस्या येथे लिहा...', send: 'पाठवा' },
    ta: { idle: 'உதவிக்கு பொத்தானை அழுத்தவும்', listening: 'கேட்கிறோம்... நிறுத்த மீண்டும் அழுத்தவும்', placeholder: 'அல்லது இங்கே தட்டச்சு செய்யவும்...', send: 'அனுப்பு' },
    te: { idle: 'సహాయం కోసం బటన్ నొక్కండి', listening: 'వినడం... ఆపడానికి మళ్ళీ నొక్కండి', placeholder: 'లేదా ఇక్కడ టైప్ చేయండి...', send: 'పంపు' },
    bn: { idle: 'সাহায্যের জন্য বোতাম টিপুন', listening: 'শুনছি... থামাতে আবার চাপ দিন', placeholder: 'বা এখানে টাইপ করুন...', send: 'পাঠান' },
    gu: { idle: 'મદદ માટે બટન દબાવો', listening: 'સાંભળી રહ્યા છીએ... રોકવા માટે ફરીથી દબાવો', placeholder: 'અથવા અહીં ટાઇપ કરો...', send: 'મોકલો' },
    en: { idle: 'Press button for help', listening: 'Listening... Press again to stop', placeholder: 'Type your problem here...', send: 'Send' },
};

export default function VoiceInterface({ language, onTranscript }) {
    const [isListening, setIsListening] = useState(false);
    const [interim, setInterim] = useState('');
    const [text, setText] = useState('');
    const [supported, setSupported] = useState(true);
    const recognitionRef = useRef(null);
    const ui = PROMPTS[language] || PROMPTS.en;

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) { setSupported(false); return; }
        const rec = new SpeechRecognition();
        // keep listening until user explicitly clicks to stop
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = LANG_CODES[language] || 'hi-IN';
        rec.onresult = (e) => {
            let final = '', inter = '';
            for (let r of e.results) { if (r.isFinal) final += r[0].transcript; else inter += r[0].transcript; }
            if (final) { setText(prev => (prev + ' ' + final).trim()); setInterim(''); }
            else setInterim(inter);
        };
        // ensure UI updates when recognition engine stops
        rec.onend = () => {
            setIsListening(false);
        };
        recognitionRef.current = rec;
    }, [language]);

    const toggleListening = () => {
        if (isListening) {
            // append any live interim to final text before stopping
            setText(prev => (prev + (interim ? ' ' + interim : '')).trim());
            setInterim('');
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            if (recognitionRef.current) {
                recognitionRef.current.lang = LANG_CODES[language] || 'hi-IN';
                recognitionRef.current.continuous = true;
                try { recognitionRef.current.start(); } catch (e) { /* ignore already-started errors */ }
            }
            setIsListening(true);
            setInterim('');
        }
    };

    const handleSend = () => {
        const final = text.trim();
        if (!final) return;
        onTranscript(final);
    };

    return (
        <div className="flex flex-col items-center w-full mt-4">
            <h2 className="text-[28px] leading-[36px] font-bold text-[#1b1c1c] text-center mb-8">{ui.idle}</h2>
            
            {supported && (
                <div className="relative flex justify-center items-center my-8">
                    {/* Pulsing Rings */}
                    {isListening && (
                        <>
                            <div className="absolute inset-0 w-48 h-48 bg-[#ffdbd0] opacity-40 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] -z-10 -m-6" />
                            <div className="absolute inset-0 w-40 h-40 bg-[#ffdbd0] opacity-60 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] -z-10 -m-2 delay-500" />
                        </>
                    )}
                    
                    {/* Main Mic Button */}
                    <button 
                        onClick={toggleListening}
                        className={`w-[120px] h-[120px] rounded-[2rem] shadow-[0_8px_24px_rgba(171,53,0,0.25)] flex items-center justify-center transition-transform duration-200 z-10 border-4 border-white active:scale-95 ${isListening ? 'bg-[#ba1a1a] shadow-[#ba1a1a]/40' : 'bg-[#ab3500] hover:scale-105'}`}
                    >
                        <AnimatePresence mode="wait">
                            {isListening ? (
                                <motion.div key="off" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                    <MicOff className="w-[64px] h-[64px] text-white" />
                                </motion.div>
                            ) : (
                                <motion.div key="on" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                    <Mic className="w-[64px] h-[64px] text-white" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            )}
            {isListening && <p className="text-sm text-muted-foreground">{ui.listening}</p>}
            
            <p className="text-[20px] text-[#594139] my-6">या यहाँ लिखें...</p>
            
            {/* Text Input */}
            <div className="w-full relative">
                <input
                    type="text"
                    value={isListening ? (text + (interim ? ' ' + interim : '')) : text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={ui.placeholder}
                    className="w-full bg-white border border-[#e1bfb5]/50 rounded-[1.5rem] py-4 pl-6 pr-14 text-[20px] text-[#1b1c1c] placeholder:text-[#594139]/60 focus:outline-none focus:border-[#ab3500] focus:ring-1 focus:ring-[#ab3500] shadow-sm h-14 transition-shadow"
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                    onClick={handleSend}
                    disabled={!text.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#ffdbd0] text-[#ab3500] rounded-full flex items-center justify-center hover:bg-[#ab3500] hover:text-white transition-colors disabled:opacity-50"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
            {interim && <p className="text-xs text-[#ab3500] italic px-4 text-center mt-2">{interim}</p>}
        </div>
    );
}