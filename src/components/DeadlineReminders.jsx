import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff, BellRing, X, CheckCircle2 } from 'lucide-react';

// Store scheduled timeout IDs in memory so we can clear them
const scheduledTimeouts = {};

function scheduleNotification(deadline, caseTitle) {
    const id = `${caseTitle}-${deadline.label}-${deadline.date}`;
    if (scheduledTimeouts[id]) return; // already scheduled

    const targetDate = new Date(deadline.date);

    // Notify 1 day before at 9am
    const oneDayBefore = new Date(targetDate);
    oneDayBefore.setDate(oneDayBefore.getDate() - 1);
    oneDayBefore.setHours(9, 0, 0, 0);

    // Notify on the day at 8am
    const onDay = new Date(targetDate);
    onDay.setHours(8, 0, 0, 0);

    const now = Date.now();

    const fire = (when, body) => {
        const delay = when.getTime() - now;
        if (delay > 0 && delay < 7 * 24 * 60 * 60 * 1000) { // only within next 7 days
            const t = setTimeout(() => {
                new Notification(`⚖️ Saheli AI — ${deadline.label}`, {
                    body,
                    icon: '/favicon.ico',
                    tag: id,
                    requireInteraction: true,
                });
            }, delay);
            scheduledTimeouts[id] = t;
        }
    };

    fire(oneDayBefore, `Tomorrow: "${deadline.label}" for case "${caseTitle}"`);
    fire(onDay, `Today: "${deadline.label}" for case "${caseTitle}" — Don't miss it!`);
}

export default function DeadlineReminders({ cases }) {
    const [permission, setPermission] = useState(Notification?.permission || 'default');
    const [showBanner, setShowBanner] = useState(false);
    const [scheduledCount, setScheduledCount] = useState(0);
    const [toast, setToast] = useState(null);

    // Show banner if not yet decided
    useEffect(() => {
        if (Notification?.permission === 'default') {
            const timer = setTimeout(() => setShowBanner(true), 1500);
            return () => clearTimeout(timer);
        }
        if (Notification?.permission === 'granted') {
            scheduleAll();
        }
    }, []);

    // Re-schedule when cases change
    useEffect(() => {
        if (Notification?.permission === 'granted') scheduleAll();
    }, [cases]);

    const scheduleAll = () => {
        let count = 0;
        cases.forEach(c => {
            (c.deadlines || []).filter(d => !d.done).forEach(d => {
                scheduleNotification(d, c.title);
                const targetDate = new Date(d.date);
                const oneDayBefore = new Date(targetDate);
                oneDayBefore.setDate(oneDayBefore.getDate() - 1);
                oneDayBefore.setHours(9, 0, 0, 0);
                const onDay = new Date(targetDate);
                onDay.setHours(8, 0, 0, 0);
                const now = Date.now();
                if ((oneDayBefore.getTime() - now > 0 && oneDayBefore.getTime() - now < 7 * 24 * 60 * 60 * 1000) ||
                    (onDay.getTime() - now > 0 && onDay.getTime() - now < 7 * 24 * 60 * 60 * 1000)) {
                    count++;
                }
            });
        });
        setScheduledCount(count);
    };

    const requestPermission = async () => {
        const result = await Notification.requestPermission();
        setPermission(result);
        setShowBanner(false);
        if (result === 'granted') {
            scheduleAll();
            setToast('Reminders enabled! You\'ll be notified 1 day before and on the day of each deadline.');
            setTimeout(() => setToast(null), 4000);
        }
    };

    const disableReminders = () => {
        Object.values(scheduledTimeouts).forEach(clearTimeout);
        Object.keys(scheduledTimeouts).forEach(k => delete scheduledTimeouts[k]);
        setScheduledCount(0);
        setToast('Reminders disabled for this session.');
        setTimeout(() => setToast(null), 3000);
        setPermission('denied-session');
    };

    if (!('Notification' in window)) return null;

    return (
        <>
            {/* Permission Banner */}
            <AnimatePresence>
                {showBanner && permission === 'default' && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mx-4 mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4"
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                                <BellRing className="w-5 h-5 text-amber-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-amber-900">Enable Deadline Reminders</p>
                                <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                                    Get browser notifications 1 day before and on the day of court hearings and case deadlines.
                                </p>
                                <div className="flex gap-2 mt-3">
                                    <button
                                        onClick={requestPermission}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-medium hover:bg-amber-600 transition-colors"
                                    >
                                        <Bell className="w-3.5 h-3.5" /> Enable Reminders
                                    </button>
                                    <button
                                        onClick={() => setShowBanner(false)}
                                        className="px-3 py-1.5 rounded-lg border border-amber-200 text-amber-700 text-xs hover:bg-amber-100 transition-colors"
                                    >
                                        Not now
                                    </button>
                                </div>
                            </div>
                            <button onClick={() => setShowBanner(false)} className="text-amber-400 hover:text-amber-600">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Enabled Status Bar */}
            <AnimatePresence>
                {permission === 'granted' && scheduledCount > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mx-4 mb-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-2.5 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-2 text-xs text-green-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                            <span className="font-medium">
                                {scheduledCount} reminder{scheduledCount !== 1 ? 's' : ''} scheduled for the next 7 days
                            </span>
                        </div>
                        <button onClick={disableReminders} className="text-xs text-green-600 hover:text-green-800 flex items-center gap-1">
                            <BellOff className="w-3 h-3" /> Disable
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 60 }}
                        className="fixed bottom-24 left-4 right-4 z-50 bg-foreground text-background text-xs px-4 py-3 rounded-2xl shadow-xl text-center"
                    >
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}