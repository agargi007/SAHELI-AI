import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Plus, ArrowLeft, Briefcase, Clock, CheckCircle2, AlertCircle, Circle } from 'lucide-react';
import DeadlineReminders from '../components/DeadlineReminders';
import { motion } from 'framer-motion';
import CaseForm from '../components/CaseForm';
import CaseAITools from '../components/CaseAITools';
import { Link } from 'react-router-dom';

const STATUS_CONFIG = {
    open: { label: 'Open', color: 'bg-blue-100 text-blue-700', icon: Circle },
    in_progress: { label: 'In Progress', color: 'bg-amber-100 text-amber-700', icon: Clock },
    hearing_scheduled: { label: 'Hearing Scheduled', color: 'bg-purple-100 text-purple-700', icon: AlertCircle },
    closed: { label: 'Closed', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
};

const TOPIC_LABELS = {
    domestic_violence: '🛡️ Domestic Violence',
    property_rights: '🏠 Property Rights',
    divorce_maintenance: '⚖️ Divorce & Maintenance',
    general: '📋 General',
};

export default function CaseManager() {
    const [view, setView] = useState('list'); // list | new | detail
    const [selectedCase, setSelectedCase] = useState(null);
    const qc = useQueryClient();

    const { data: cases = [], isLoading } = useQuery({
        queryKey: ['cases'],
        queryFn: () => base44.entities.LegalCase.list('-created_date', 50),
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.LegalCase.delete(id),
        onSuccess: () => qc.invalidateQueries(['cases']),
    });

    const openCase = (c) => { setSelectedCase(c); setView('detail'); };

    // Upcoming deadlines across all cases
    const upcomingDeadlines = cases
        .flatMap(c => (c.deadlines || []).filter(d => !d.done).map(d => ({ ...d, caseTitle: c.title })))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="px-5 py-4 border-b border-border flex items-center gap-3">
                <Link to="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                </Link>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="font-semibold text-foreground text-sm">Case Manager</h1>
                        <p className="text-xs text-muted-foreground">AI-Powered Legal Cases</p>
                    </div>
                </div>
                {view === 'list' && (
                    <button
                        onClick={() => setView('new')}
                        className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" /> New Case
                    </button>
                )}
                {view !== 'list' && (
                    <button
                        onClick={() => { setView('list'); setSelectedCase(null); }}
                        className="ml-auto text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg border border-border"
                    >
                        ← Back
                    </button>
                )}
            </header>

            <main className="flex-1 px-4 py-5 max-w-lg mx-auto w-full">
                {/* Reminder System */}
                {view === 'list' && <DeadlineReminders cases={cases} />}

                {/* LIST VIEW */}
                {view === 'list' && (
                    <div className="space-y-5">
                        {/* Upcoming Deadlines */}
                        {upcomingDeadlines.length > 0 && (
                            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                                <p className="text-xs font-semibold text-amber-700 mb-3 flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" /> Upcoming Deadlines
                                </p>
                                <div className="space-y-2">
                                    {upcomingDeadlines.map((d, i) => (
                                        <div key={i} className="flex items-center justify-between text-xs">
                                            <span className="text-amber-900 font-medium">{d.label}</span>
                                            <div className="text-right">
                                                <div className="text-amber-700">{new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                                                <div className="text-amber-500">{d.caseTitle}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Cases */}
                        {isLoading ? (
                            <div className="flex justify-center py-10">
                                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : cases.length === 0 ? (
                            <div className="text-center py-12 space-y-3">
                                <Briefcase className="w-10 h-10 text-muted-foreground/40 mx-auto" />
                                <p className="text-sm text-muted-foreground">No cases yet. Create your first case.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {cases.map((c, i) => {
                                    const s = STATUS_CONFIG[c.status] || STATUS_CONFIG.open;
                                    const Icon = s.icon;
                                    const pendingDeadlines = (c.deadlines || []).filter(d => !d.done).length;
                                    return (
                                        <motion.div
                                            key={c.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => openCase(c)}
                                            className="bg-card border border-border rounded-2xl p-4 cursor-pointer hover:border-primary/30 hover:shadow-sm transition-all"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-foreground text-sm truncate">{c.title}</p>
                                                    {c.client_name && <p className="text-xs text-muted-foreground mt-0.5">{c.client_name}</p>}
                                                    <p className="text-xs text-muted-foreground mt-1">{TOPIC_LABELS[c.topic]}</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-1.5 shrink-0">
                                                    <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${s.color}`}>
                                                        <Icon className="w-3 h-3" /> {s.label}
                                                    </span>
                                                    {pendingDeadlines > 0 && (
                                                        <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                                            {pendingDeadlines} deadline{pendingDeadlines > 1 ? 's' : ''}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            {c.description && (
                                                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{c.description}</p>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* NEW CASE */}
                {view === 'new' && (
                    <CaseForm
                        onSave={() => { qc.invalidateQueries(['cases']); setView('list'); }}
                    />
                )}

                {/* CASE DETAIL */}
                {view === 'detail' && selectedCase && (
                    <CaseAITools
                        legalCase={selectedCase}
                        onUpdate={(updated) => { setSelectedCase(updated); qc.invalidateQueries(['cases']); }}
                        onDelete={(id) => { deleteMutation.mutate(id); setView('list'); setSelectedCase(null); }}
                    />
                )}
            </main>
        </div>
    );
}