import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Sparkles, FileText, Scale, Clock, Edit3, Trash2, CheckCircle2, Circle, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import CaseForm from './CaseForm';

const TABS = [
    { id: 'summary', label: 'Summary', icon: Sparkles },
    { id: 'document', label: 'Draft Doc', icon: FileText },
    { id: 'precedents', label: 'Precedents', icon: Scale },
    { id: 'deadlines', label: 'Deadlines', icon: Clock },
];

const TOPIC_LABELS = {
    domestic_violence: 'Domestic Violence',
    property_rights: 'Property Rights',
    divorce_maintenance: 'Divorce & Maintenance',
    general: 'General Legal',
};

export default function CaseAITools({ legalCase, onUpdate, onDelete }) {
    const [activeTab, setActiveTab] = useState('summary');
    const [loading, setLoading] = useState(null);
    const [editing, setEditing] = useState(false);
    const [docType, setDocType] = useState('notice');

    const runAI = async (type) => {
        setLoading(type);
        let prompt, field;

        const caseContext = `Case: ${legalCase.title}\nClient: ${legalCase.client_name || 'not specified'}\nTopic: ${TOPIC_LABELS[legalCase.topic]}\nDescription: ${legalCase.description || 'not provided'}\nNotes: ${legalCase.notes || 'none'}`;

        if (type === 'summary') {
            prompt = `You are a legal assistant in India. Summarize this legal case in simple, clear language for a legal aid worker:\n\n${caseContext}\n\nProvide: 1) Brief case summary (2-3 sentences), 2) Key legal issues, 3) Recommended immediate actions. Use bullet points, no tables.`;
            field = 'ai_summary';
        } else if (type === 'document') {
            prompt = `You are an Indian legal aid attorney. Draft a formal ${docType} for this case:\n\n${caseContext}\n\nDraft a complete, professional ${docType} including: proper salutation, factual background, legal basis (cite relevant Indian laws), specific relief sought, and closing. Format with clear sections.`;
            field = 'ai_document';
        } else if (type === 'precedents') {
            prompt = `You are an expert in Indian family and women's rights law. Based on this case:\n\n${caseContext}\n\nList 4-5 relevant Indian legal precedents (Supreme Court or High Court judgments) that could support this case. For each: case name, year, court, key ruling, and how it applies here. Use bullet points.`;
            field = 'ai_precedents';
        }

        const result = await base44.integrations.Core.InvokeLLM({ prompt, model: 'claude_sonnet_4_6' });
        const text = typeof result === 'string' ? result : result?.text || JSON.stringify(result);
        const updated = await base44.entities.LegalCase.update(legalCase.id, { [field]: text });
        onUpdate({ ...legalCase, [field]: text });
        setLoading(null);
    };

    const toggleDeadline = async (idx) => {
        const deadlines = [...(legalCase.deadlines || [])];
        deadlines[idx] = { ...deadlines[idx], done: !deadlines[idx].done };
        await base44.entities.LegalCase.update(legalCase.id, { deadlines });
        onUpdate({ ...legalCase, deadlines });
    };

    const mdComponents = {
        p: ({ children }) => <p className="text-sm leading-relaxed text-foreground mb-2">{children}</p>,
        strong: ({ children }) => <span className="font-semibold text-foreground">{children}</span>,
        h2: ({ children }) => <h3 className="text-sm font-bold text-foreground mt-3 mb-1.5 border-b border-border pb-1">{children}</h3>,
        h3: ({ children }) => <p className="text-sm font-semibold text-foreground mt-2 mb-1">{children}</p>,
        ul: ({ children }) => <ul className="space-y-1.5 my-2">{children}</ul>,
        ol: ({ children }) => <ol className="space-y-1.5 my-2">{children}</ol>,
        li: ({ children }) => (
            <li className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="flex-1 leading-relaxed">{children}</span>
            </li>
        ),
        blockquote: ({ children }) => (
            <div className="border-l-4 border-primary/40 pl-3 py-1 bg-primary/5 rounded-r-lg my-2 text-sm text-muted-foreground">{children}</div>
        ),
    };

    if (editing) {
        return (
            <CaseForm
                initialData={legalCase}
                onSave={() => { setEditing(false); onUpdate({ ...legalCase }); }}
            />
        );
    }

    return (
        <div className="space-y-4">
            {/* Case Header */}
            <div className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <h2 className="font-bold text-foreground">{legalCase.title}</h2>
                        {legalCase.client_name && <p className="text-xs text-muted-foreground mt-0.5">{legalCase.client_name}</p>}
                        <p className="text-xs text-muted-foreground mt-0.5">{TOPIC_LABELS[legalCase.topic]}</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setEditing(true)} className="p-2 rounded-xl border border-border hover:bg-muted text-muted-foreground">
                            <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => { if (confirm('Delete this case?')) onDelete(legalCase.id); }} className="p-2 rounded-xl border border-destructive/20 hover:bg-destructive/5 text-destructive">
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
                {legalCase.description && (
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{legalCase.description}</p>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-muted rounded-2xl">
                {TABS.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-xl text-xs font-medium transition-all ${activeTab === tab.id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

                    {/* SUMMARY */}
                    {activeTab === 'summary' && (
                        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-primary" /> AI Case Summary
                                </p>
                                <button
                                    onClick={() => runAI('summary')}
                                    disabled={loading === 'summary'}
                                    className="text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1"
                                >
                                    {loading === 'summary' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                                    {legalCase.ai_summary ? 'Regenerate' : 'Generate'}
                                </button>
                            </div>
                            {legalCase.ai_summary ? (
                                <ReactMarkdown components={mdComponents}>{legalCase.ai_summary}</ReactMarkdown>
                            ) : (
                                <p className="text-sm text-muted-foreground py-4 text-center">Click Generate to create an AI summary of this case.</p>
                            )}
                        </div>
                    )}

                    {/* DOCUMENT */}
                    {activeTab === 'document' && (
                        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
                            <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <FileText className="w-4 h-4 text-primary" /> Draft Legal Document
                            </p>
                            <div className="flex gap-2">
                                {['notice', 'petition', 'complaint', 'application'].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setDocType(t)}
                                        className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all capitalize ${docType === t ? 'border-primary bg-primary/10 text-primary font-medium' : 'border-border text-muted-foreground hover:border-foreground/20'
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => runAI('document')}
                                disabled={loading === 'document'}
                                className="w-full text-xs py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-1.5"
                            >
                                {loading === 'document' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
                                Draft {docType.charAt(0).toUpperCase() + docType.slice(1)}
                            </button>
                            {legalCase.ai_document && (
                                <div className="border border-border rounded-xl p-3 bg-muted/20 max-h-80 overflow-y-auto">
                                    <ReactMarkdown components={mdComponents}>{legalCase.ai_document}</ReactMarkdown>
                                </div>
                            )}
                        </div>
                    )}

                    {/* PRECEDENTS */}
                    {activeTab === 'precedents' && (
                        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                                    <Scale className="w-4 h-4 text-primary" /> Legal Precedents
                                </p>
                                <button
                                    onClick={() => runAI('precedents')}
                                    disabled={loading === 'precedents'}
                                    className="text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1"
                                >
                                    {loading === 'precedents' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Scale className="w-3 h-3" />}
                                    {legalCase.ai_precedents ? 'Refresh' : 'Find'}
                                </button>
                            </div>
                            {legalCase.ai_precedents ? (
                                <ReactMarkdown components={mdComponents}>{legalCase.ai_precedents}</ReactMarkdown>
                            ) : (
                                <p className="text-sm text-muted-foreground py-4 text-center">Click Find to discover relevant Indian court precedents.</p>
                            )}
                        </div>
                    )}

                    {/* DEADLINES */}
                    {activeTab === 'deadlines' && (
                        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
                            <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" /> Deadlines & Hearings
                            </p>
                            {(!legalCase.deadlines || legalCase.deadlines.length === 0) ? (
                                <p className="text-sm text-muted-foreground py-4 text-center">No deadlines set. Edit the case to add deadlines.</p>
                            ) : (
                                <div className="space-y-2">
                                    {[...legalCase.deadlines]
                                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                                        .map((d, i) => (
                                            <button
                                                key={i}
                                                onClick={() => toggleDeadline(legalCase.deadlines.indexOf(d))}
                                                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${d.done ? 'border-border bg-muted/30 opacity-60' : 'border-primary/20 bg-primary/5 hover:bg-primary/10'
                                                    }`}
                                            >
                                                {d.done
                                                    ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                                    : <Circle className="w-4 h-4 text-primary shrink-0" />
                                                }
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm font-medium ${d.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{d.label}</p>
                                                </div>
                                                <span className={`text-xs shrink-0 ${d.done ? 'text-muted-foreground' : 'text-primary'}`}>
                                                    {new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </span>
                                            </button>
                                        ))}
                                </div>
                            )}
                        </div>
                    )}

                </motion.div>
            </AnimatePresence>
        </div>
    );
}