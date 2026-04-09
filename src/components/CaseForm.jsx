import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Trash2 } from 'lucide-react';

const TOPICS = [
    { value: 'domestic_violence', label: '🛡️ Domestic Violence' },
    { value: 'property_rights', label: '🏠 Property Rights' },
    { value: 'divorce_maintenance', label: '⚖️ Divorce & Maintenance' },
    { value: 'general', label: '📋 General' },
];

const STATUSES = [
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'hearing_scheduled', label: 'Hearing Scheduled' },
    { value: 'closed', label: 'Closed' },
];

export default function CaseForm({ onSave, initialData = null }) {
    const [form, setForm] = useState({
        title: initialData?.title || '',
        client_name: initialData?.client_name || '',
        topic: initialData?.topic || 'domestic_violence',
        status: initialData?.status || 'open',
        description: initialData?.description || '',
        notes: initialData?.notes || '',
        deadlines: initialData?.deadlines || [],
    });
    const [saving, setSaving] = useState(false);
    const [newDeadlineLabel, setNewDeadlineLabel] = useState('');
    const [newDeadlineDate, setNewDeadlineDate] = useState('');

    const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

    const addDeadline = () => {
        if (!newDeadlineLabel || !newDeadlineDate) return;
        set('deadlines', [...form.deadlines, { label: newDeadlineLabel, date: newDeadlineDate, done: false }]);
        setNewDeadlineLabel('');
        setNewDeadlineDate('');
    };

    const removeDeadline = (i) => set('deadlines', form.deadlines.filter((_, idx) => idx !== i));

    const handleSave = async () => {
        if (!form.title.trim()) return;
        setSaving(true);
        if (initialData?.id) {
            await base44.entities.LegalCase.update(initialData.id, form);
        } else {
            await base44.entities.LegalCase.create(form);
        }
        setSaving(false);
        onSave();
    };

    return (
        <div className="space-y-5">
            <h2 className="font-bold text-foreground text-base">{initialData ? 'Edit Case' : 'New Legal Case'}</h2>

            {/* Basic Info */}
            <div className="space-y-3">
                <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Case Title *</label>
                    <input
                        value={form.title}
                        onChange={e => set('title', e.target.value)}
                        placeholder="e.g. Sharma vs Sharma – Domestic Violence"
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                </div>
                <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Client Name</label>
                    <input
                        value={form.client_name}
                        onChange={e => set('client_name', e.target.value)}
                        placeholder="Client's full name"
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Topic</label>
                        <select
                            value={form.topic}
                            onChange={e => set('topic', e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                            {TOPICS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
                        <select
                            value={form.status}
                            onChange={e => set('status', e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                            {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Case Description</label>
                    <textarea
                        value={form.description}
                        onChange={e => set('description', e.target.value)}
                        placeholder="Describe the case facts, background, key events..."
                        rows={4}
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                </div>
                <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Notes</label>
                    <textarea
                        value={form.notes}
                        onChange={e => set('notes', e.target.value)}
                        placeholder="Additional notes, observations..."
                        rows={2}
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                </div>
            </div>

            {/* Deadlines */}
            <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Deadlines & Hearings</label>
                {form.deadlines.length > 0 && (
                    <div className="space-y-2 mb-3">
                        {form.deadlines.map((d, i) => (
                            <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl border border-border bg-muted/30 text-xs">
                                <span className="flex-1 font-medium text-foreground">{d.label}</span>
                                <span className="text-muted-foreground">{new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                <button onClick={() => removeDeadline(i)} className="text-destructive hover:text-destructive/70">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex gap-2">
                    <input
                        value={newDeadlineLabel}
                        onChange={e => setNewDeadlineLabel(e.target.value)}
                        placeholder="e.g. Court Hearing"
                        className="flex-1 px-3 py-2 rounded-xl border border-border bg-card text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <input
                        type="date"
                        value={newDeadlineDate}
                        onChange={e => setNewDeadlineDate(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-border bg-card text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <button onClick={addDeadline} className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <button
                onClick={handleSave}
                disabled={!form.title.trim() || saving}
                className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-40 hover:bg-primary/90 transition-colors"
            >
                {saving ? 'Saving...' : initialData ? 'Update Case' : 'Create Case'}
            </button>
        </div>
    );
}