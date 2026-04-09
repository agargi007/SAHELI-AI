import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, X, BookOpen, ChevronRight } from 'lucide-react';

const RESOURCES = [
    {
        id: 'domestic_violence',
        emoji: '🛡️',
        title: 'Domestic Violence Protection',
        titleHi: 'घरेलू हिंसा से सुरक्षा',
        color: 'from-rose-400 to-pink-500',
        bg: 'bg-rose-50',
        border: 'border-rose-200',
        tag: 'PWDVA 2005',
        videoId: 'gGbAZb3pGTE',
        duration: '4:32',
        points: [
            { icon: '🏠', text: 'You have the right to stay in your shared home — no one can throw you out' },
            { icon: '👮', text: 'Police must register your complaint under DV Act within 24 hours' },
            { icon: '💰', text: 'You can get monthly financial support (maintenance) from your abuser' },
            { icon: '📄', text: 'A Protection Officer will be assigned to help you free of cost' },
            { icon: '⚖️', text: 'Court can issue a Protection Order same day in emergency cases' },
        ],
        helplines: [{ num: '181', label: 'Women Helpline' }, { num: '1091', label: 'Police Women Cell' }],
    },
    {
        id: 'property_rights',
        emoji: '🏠',
        title: 'Property & Land Rights',
        titleHi: 'संपत्ति और भूमि अधिकार',
        color: 'from-emerald-400 to-teal-500',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        tag: 'HSA 2005',
        videoId: 'wNc0Hvbk9Xo',
        duration: '5:10',
        points: [
            { icon: '👩‍👧', text: "Daughters have equal right to father's property — same as sons" },
            { icon: '📜', text: 'This applies to ancestral AND self-acquired property since 2005' },
            { icon: '💍', text: 'Your husband cannot sell marital property without your consent' },
            { icon: '📋', text: 'Register a legal notice to protect your share before property is sold' },
            { icon: '🏛️', text: 'File in civil court — judgement usually within 1–2 years' },
        ],
        helplines: [{ num: '15100', label: 'NALSA Legal Aid' }, { num: '1800-11-2211', label: 'Land Rights Helpline' }],
    },
    {
        id: 'divorce_maintenance',
        emoji: '⚖️',
        title: 'Divorce & Maintenance Rights',
        titleHi: 'तलाक और भरण-पोषण अधिकार',
        color: 'from-violet-400 to-purple-500',
        bg: 'bg-violet-50',
        border: 'border-violet-200',
        tag: 'Section 125 CrPC',
        videoId: 'FdVFzWMH3GI',
        duration: '6:05',
        points: [
            { icon: '💸', text: 'You can demand monthly maintenance — even during separation' },
            { icon: '👶', text: "Children's education and living costs must be paid by the father" },
            { icon: '🔄', text: 'Maintenance starts from the date you file the application' },
            { icon: '📑', text: 'You can get interim (temporary) maintenance within 60 days' },
            { icon: '🏛️', text: 'Free legal aid available — you do not need to pay a lawyer' },
        ],
        helplines: [{ num: '15100', label: 'NALSA Legal Aid' }, { num: '181', label: 'Women Helpline' }],
    },
    {
        id: 'free_legal_aid',
        emoji: '🤝',
        title: 'Free Legal Aid',
        titleHi: 'मुफ्त कानूनी सहायता',
        color: 'from-amber-400 to-orange-500',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        tag: 'NALSA',
        videoId: 'pv_iFHUDCKw',
        duration: '3:48',
        points: [
            { icon: '✅', text: 'All women are entitled to FREE legal aid in India — by law' },
            { icon: '📞', text: 'Call 15100 to get a free lawyer assigned to your case' },
            { icon: '🏢', text: 'Every district has a District Legal Services Authority (DLSA)' },
            { icon: '🎓', text: 'Free legal aid includes court fees, lawyer fees, and paperwork' },
            { icon: '🌐', text: 'Available in all languages — interpreter provided if needed' },
        ],
        helplines: [{ num: '15100', label: 'NALSA Free Lawyer' }, { num: '1800-200-5050', label: 'Legal Aid Helpline' }],
    },
    {
        id: 'fir_rights',
        emoji: '📋',
        title: 'Filing an FIR',
        titleHi: 'FIR दर्ज करने के अधिकार',
        color: 'from-blue-400 to-cyan-500',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        tag: 'Section 154 CrPC',
        videoId: 'iXFxfhJpW6E',
        duration: '4:15',
        points: [
            { icon: '🚫', text: 'Police CANNOT refuse to register your FIR — it is illegal' },
            { icon: '📝', text: "You don't need proof to file an FIR — your statement is enough" },
            { icon: '🆓', text: 'Filing an FIR is completely free — no fees charged' },
            { icon: '📄', text: 'Always ask for a signed copy of your FIR — it is your right' },
            { icon: '⚡', text: 'Zero FIR can be filed at ANY police station — not just local one' },
        ],
        helplines: [{ num: '112', label: 'Emergency Police' }, { num: '1091', label: 'Police Women Cell' }],
    },
    {
        id: 'child_custody',
        emoji: '👶',
        title: 'Child Custody Rights',
        titleHi: 'बच्चे की अभिरक्षा के अधिकार',
        color: 'from-lime-400 to-green-500',
        bg: 'bg-lime-50',
        border: 'border-lime-200',
        tag: 'Guardian Act',
        videoId: 'IM8P_AvBaQA',
        duration: '5:30',
        points: [
            { icon: '👩‍👦', text: "Mother automatically gets custody of children below 5 years" },
            { icon: '🏫', text: "Court decides custody based on child's welfare — not gender" },
            { icon: '💼', text: "You can get interim custody order within weeks of filing" },
            { icon: '📞', text: "Father must be allowed visitation rights even during dispute" },
            { icon: '🔒', text: "No one can take your child without a court order" },
        ],
        helplines: [{ num: '1098', label: 'Child Helpline' }, { num: '15100', label: 'NALSA Legal Aid' }],
    },
];

const LANG_LABELS = {
    en: { title: 'Legal Rights Library', subtitle: 'Learn your rights through simple visual guides', watch: 'Watch Video', rights: 'Your Rights', call: 'Call for Help', close: 'Close' },
    hi: { title: 'कानूनी अधिकार पुस्तकालय', subtitle: 'सरल दृश्य गाइड के माध्यम से अपने अधिकार जानें', watch: 'वीडियो देखें', rights: 'आपके अधिकार', call: 'मदद के लिए कॉल करें', close: 'बंद करें' },
};

export default function ResourceLibrary() {
    const [selected, setSelected] = useState(null);
    const [lang] = useState('hi');
    const L = LANG_LABELS[lang] || LANG_LABELS.en;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="px-5 py-4 border-b border-border flex items-center gap-3 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                <Link to="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                </Link>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="font-semibold text-foreground text-sm">{L.title}</h1>
                        <p className="text-xs text-muted-foreground">{L.subtitle}</p>
                    </div>
                </div>
            </header>

            {/* Grid */}
            <main className="flex-1 px-4 py-5 max-w-lg mx-auto w-full">
                <div className="grid grid-cols-1 gap-4">
                    {RESOURCES.map((r, i) => (
                        <motion.div
                            key={r.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className={`rounded-2xl border ${r.border} ${r.bg} overflow-hidden cursor-pointer hover:shadow-md transition-shadow`}
                            onClick={() => setSelected(r)}
                        >
                            {/* Card Top — Video Thumbnail */}
                            <div className={`relative h-36 bg-gradient-to-br ${r.color} flex items-center justify-center`}>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border-2 border-white/60 shadow-lg"
                                >
                                    <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                                </motion.div>
                                <span className="absolute top-3 left-3 bg-black/30 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">{r.tag}</span>
                                <span className="absolute bottom-3 right-3 bg-black/30 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">{r.duration}</span>
                                <span className="absolute top-3 right-3 text-2xl">{r.emoji}</span>
                            </div>

                            {/* Card Body */}
                            <div className="p-4">
                                <h3 className="font-bold text-foreground text-sm">{r.title}</h3>
                                <p className="text-xs text-muted-foreground mt-0.5 mb-3">{r.titleHi}</p>

                                {/* First 2 key points */}
                                <div className="space-y-1.5">
                                    {r.points.slice(0, 2).map((p, j) => (
                                        <div key={j} className="flex items-start gap-2 text-xs text-foreground">
                                            <span>{p.icon}</span>
                                            <span className="leading-relaxed">{p.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
                                    {L.watch} <ChevronRight className="w-3 h-3" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Detail Modal */}
            <AnimatePresence>
                {selected && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                            onClick={() => setSelected(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: '100%' }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl max-h-[90vh] overflow-y-auto"
                        >
                            {/* Video Embed */}
                            <div className={`relative w-full aspect-video bg-gradient-to-br ${selected.color} rounded-t-3xl overflow-hidden`}>
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${selected.videoId}?rel=0&modestbranding=1`}
                                    title={selected.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                                <button
                                    onClick={() => setSelected(null)}
                                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            </div>

                            <div className="p-5 space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xl">{selected.emoji}</span>
                                        <h2 className="font-bold text-foreground text-base">{selected.title}</h2>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{selected.titleHi}</p>
                                </div>

                                {/* All Key Points */}
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{L.rights}</p>
                                    <div className="space-y-2.5">
                                        {selected.points.map((p, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.06 }}
                                                className={`flex items-start gap-3 p-3 rounded-xl ${selected.bg} border ${selected.border}`}
                                            >
                                                <span className="text-lg shrink-0">{p.icon}</span>
                                                <p className="text-sm text-foreground leading-relaxed">{p.text}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Helplines */}
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{L.call}</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {selected.helplines.map((h, i) => (
                                            <a
                                                key={i}
                                                href={`tel:${h.num}`}
                                                className={`flex flex-col items-center py-3 px-2 rounded-xl bg-gradient-to-br ${selected.color} text-white shadow-sm`}
                                            >
                                                <span className="font-bold text-lg">{h.num}</span>
                                                <span className="text-xs opacity-90 text-center leading-tight mt-0.5">{h.label}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                <div className="pb-4">
                                    <button
                                        onClick={() => setSelected(null)}
                                        className="w-full py-3 rounded-2xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all"
                                    >
                                        {L.close}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}