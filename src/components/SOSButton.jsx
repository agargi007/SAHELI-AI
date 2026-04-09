import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, ShieldAlert } from 'lucide-react';

const HELPLINES = [
    { number: '181', label: 'Women Helpline', labelHi: 'महिला हेल्पलाइन', color: 'bg-rose-500' },
    { number: '1091', label: 'Police Women Cell', labelHi: 'पुलिस महिला सेल', color: 'bg-blue-600' },
    { number: '112', label: 'Emergency / Police', labelHi: 'आपातकाल / पुलिस', color: 'bg-slate-800' },
];

export default function SOSButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* SOS Trigger */}
            <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-red-600 text-white font-bold text-sm shadow-xl shadow-red-600/40 hover:bg-red-700 transition-colors"
                animate={{ boxShadow: ['0 0 0 0 rgba(220,38,38,0.4)', '0 0 0 12px rgba(220,38,38,0)', '0 0 0 0 rgba(220,38,38,0)'] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ShieldAlert className="w-4 h-4" />
                SOS
            </motion.button>

            {/* SOS Modal */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                            onClick={() => setOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 60, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 60, scale: 0.95 }}
                            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-6 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h2 className="font-bold text-lg text-red-600">🆘 आपातकालीन सहायता</h2>
                                    <p className="text-xs text-muted-foreground mt-0.5">Emergency Help · तुरंत कॉल करें</p>
                                </div>
                                <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-muted transition-colors">
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {HELPLINES.map((h) => (
                                    <a
                                        key={h.number}
                                        href={`tel:${h.number}`}
                                        className={`flex items-center justify-between w-full px-5 py-4 rounded-2xl text-white ${h.color} hover:opacity-90 transition-opacity shadow-md`}
                                    >
                                        <div>
                                            <div className="font-bold text-xl tracking-wide">{h.number}</div>
                                            <div className="text-xs opacity-80">{h.labelHi} · {h.label}</div>
                                        </div>
                                        <Phone className="w-6 h-6 opacity-80" />
                                    </a>
                                ))}
                            </div>

                            <p className="text-xs text-center text-muted-foreground mt-4">
                                ये नंबर 24/7 उपलब्ध हैं · Available 24/7, Free of cost
                            </p>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}