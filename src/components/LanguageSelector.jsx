import { motion } from 'framer-motion';

const LANGUAGES = [
    { code: 'hi', label: 'हिंदी', sublabel: 'Hindi', emoji: '🪔', desc: 'बोलकर अपनी समस्या बताएं' },
    { code: 'mr', label: 'मराठी', sublabel: 'Marathi', emoji: '🌺', desc: 'बोलून आपली समस्या सांगा' },
    { code: 'ta', label: 'தமிழ்', sublabel: 'Tamil', emoji: '🌸', desc: 'உங்கள் பிரச்சினையை சொல்லுங்கள்' },
    { code: 'te', label: 'తెలుగు', sublabel: 'Telugu', emoji: '🏵️', desc: 'మీ సమస్యను చెప్పండి' },
    { code: 'bn', label: 'বাংলা', sublabel: 'Bengali', emoji: '🌼', desc: 'আপনার সমস্যা বলুন' },
    { code: 'gu', label: 'ગુજરાતી', sublabel: 'Gujarati', emoji: '🪷', desc: 'તમારી સમસ્યા કહો' },
    { code: 'en', label: 'English', sublabel: 'English', emoji: '🌍', desc: 'Speak your problem aloud' },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } }
};
const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function LanguageSelector({ onSelect }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm flex flex-col items-center gap-7"
        >
            {/* Hero */}
            <div className="text-center space-y-2">
                <motion.div
                    animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                    className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-orange-400 mx-auto flex items-center justify-center shadow-lg shadow-primary/30 mb-3"
                >
                    <span className="text-4xl">⚖️</span>
                </motion.div>
                <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Saheli AI</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    आपकी कानूनी सहेली &nbsp;·&nbsp; Your Legal Friend
                </p>
                <div className="flex justify-center gap-1 mt-1">
                    {['🟠', '⚪', '🟢'].map((c, i) => (
                        <motion.span key={i} animate={{ scale: [1, 1.3, 1] }} transition={{ delay: i * 0.2, duration: 1.2, repeat: Infinity, repeatDelay: 3 }} className="text-xs">{c}</motion.span>
                    ))}
                </div>
            </div>

            {/* Language Grid */}
            <div className="w-full">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center mb-4">
                    अपनी भाषा चुनें / Choose Language
                </p>
                <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 gap-2.5">
                    {LANGUAGES.map((lang) => (
                        <motion.button
                            key={lang.code}
                            variants={item}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => onSelect(lang.code)}
                            className={`flex flex-col items-start gap-1.5 p-4 rounded-2xl border-2 border-border bg-card hover:border-primary hover:shadow-md hover:shadow-primary/10 transition-all group ${lang.code === 'hi' ? 'col-span-1' : ''}`}
                        >
                            <span className="text-2xl">{lang.emoji}</span>
                            <div>
                                <div className="font-bold text-foreground text-base group-hover:text-primary transition-colors">{lang.label}</div>
                                <div className="text-xs text-muted-foreground">{lang.sublabel}</div>
                            </div>
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}