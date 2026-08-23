import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, ShieldAlert, AlertTriangle } from 'lucide-react';

const HELPLINES = [
    { number: '181', label: 'Women Helpline', labelHi: 'महिला हेल्पलाइन', color: 'bg-[#ba1a1a]' },
    { number: '1091', label: 'Police Women Cell', labelHi: 'पुलिस महिला सेल', color: 'bg-blue-600' },
    { number: '112', label: 'Emergency / Police', labelHi: 'आपातकाल / पुलिस', color: 'bg-slate-800' },
];

export default function SOSButton({ isIconOnly = false }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* SOS Trigger */}
            {isIconOnly ? (
                <button
                    aria-label="SOS"
                    onClick={() => setOpen(true)}
                    className="flex items-center justify-center w-12 h-12 text-[#ba1a1a] hover:bg-[#ffdad6]/50 transition-colors active:scale-95 duration-100 ease-in-out rounded-full"
                >
                    <AlertTriangle className="w-6 h-6 fill-current" />
                </button>
            ) : (
                <motion.button
                    whileTap={{ scale: 0.93 }}
                    onClick={() => setOpen(true)}
                    className="fixed bottom-24 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-[#ba1a1a] text-white font-bold text-sm shadow-xl shadow-red-600/40 hover:bg-[#93000a] transition-colors"
                    animate={{ boxShadow: ['0 0 0 0 rgba(220,38,38,0.4)', '0 0 0 12px rgba(220,38,38,0)', '0 0 0 0 rgba(220,38,38,0)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ShieldAlert className="w-4 h-4" />
                    SOS
                </motion.button>
            )}

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
                            className="fixed bottom-0 left-0 right-0 z-50 bg-[#fffaf8] rounded-t-[2rem] p-6 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h2 className="font-bold text-xl text-[#ba1a1a]">🆘 आपातकालीन सहायता</h2>
                                    <p className="text-sm text-[#594139] mt-0.5">Emergency Help · तुरंत कॉल करें</p>
                                </div>
                                <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-[#f0eded] transition-colors">
                                    <X className="w-6 h-6 text-[#594139]" />
                                </button>
                            </div>

                            <div className="space-y-4 mt-6">
                                {HELPLINES.map((h) => (
                                    <a
                                        key={h.number}
                                        href={`tel:${h.number}`}
                                        className={`flex items-center justify-between w-full px-5 py-5 rounded-[1.5rem] text-white ${h.color} hover:opacity-90 transition-opacity shadow-md active:scale-95 duration-200`}
                                    >
                                        <div>
                                            <div className="font-bold text-2xl tracking-wide">{h.number}</div>
                                            <div className="text-sm opacity-90 mt-1">{h.labelHi} · {h.label}</div>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <p className="text-sm text-center text-[#594139] mt-6 mb-2">
                                ये नंबर 24/7 उपलब्ध हैं · Available 24/7, Free of cost
                            </p>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}