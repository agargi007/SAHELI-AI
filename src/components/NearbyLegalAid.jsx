import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Loader2, ChevronDown, ChevronUp, Phone, Building2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const LABELS = {
    hi: { btn: 'नजदीकी कानूनी सहायता खोजें', loading: 'खोज रहे हैं...', denied: 'स्थान अनुमति नहीं मिली', title: 'नजदीकी कानूनी सहायता केंद्र', district: 'जिला' },
    mr: { btn: 'जवळील कायदेशीर मदत शोधा', loading: 'शोधत आहे...', denied: 'स्थान परवानगी नाकारली', title: 'जवळील कायदेशीर मदत केंद्रे', district: 'जिल्हा' },
    ta: { btn: 'அருகில் உள்ள சட்ட உதவி', loading: 'தேடுகிறோம்...', denied: 'இடம் அனுமதி மறுக்கப்பட்டது', title: 'அருகில் உள்ள சட்ட உதவி மையங்கள்', district: 'மாவட்டம்' },
    te: { btn: 'సమీప న్యాయ సహాయం', loading: 'వెతుకుతున్నాం...', denied: 'స్థాన అనుమతి నిరాకరించబడింది', title: 'సమీప న్యాయ సహాయ కేంద్రాలు', district: 'జిల్లా' },
    bn: { btn: 'নিকটবর্তী আইনি সহায়তা খুঁজুন', loading: 'খুঁজছি...', denied: 'অবস্থান অনুমতি প্রত্যাখ্যাত', title: 'নিকটবর্তী আইনি সহায়তা কেন্দ্র', district: 'জেলা' },
    gu: { btn: 'નજીકની કાનૂની સહાય શોધો', loading: 'શોધી રહ્યા છીએ...', denied: 'સ્થાન પરવાનગી નકારી', title: 'નજીકની કાનૂની સહાય કેન્દ્રો', district: 'જિલ્લો' },
    en: { btn: 'Find Nearby Legal Aid', loading: 'Searching...', denied: 'Location permission denied', title: 'Nearby Legal Aid Centres', district: 'District' },
};

export default function NearbyLegalAid({ language }) {
    const [status, setStatus] = useState('idle'); // idle | loading | done | error
    const [district, setDistrict] = useState('');
    const [clinics, setClinics] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const labels = LABELS[language] || LABELS.en;

    const findNearby = () => {
        if (!navigator.geolocation) { setStatus('error'); return; }
        setStatus('loading');
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                const result = await base44.integrations.Core.InvokeLLM({
                    prompt: `Given GPS coordinates latitude=${latitude}, longitude=${longitude}, identify the district and state in India. Then list 4-5 real government-sponsored legal aid offices, district courts, or NGO legal clinics in that district. Include their name, address, and phone number if available. Return JSON only.`,
                    add_context_from_internet: true,
                    response_json_schema: {
                        type: 'object',
                        properties: {
                            district: { type: 'string' },
                            state: { type: 'string' },
                            clinics: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        address: { type: 'string' },
                                        phone: { type: 'string' }
                                    }
                                }
                            }
                        }
                    }
                });
                setDistrict(`${result.district}, ${result.state}`);
                setClinics(result.clinics || []);
                setStatus('done');
                setExpanded(true);
            },
            () => setStatus('error')
        );
    };

    return (
        <div className="w-full max-w-sm">
            {status === 'idle' && (
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={findNearby}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-primary/30 bg-primary/5 text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
                >
                    <MapPin className="w-4 h-4" />
                    {labels.btn}
                </motion.button>
            )}

            {status === 'loading' && (
                <div className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-border bg-muted text-muted-foreground text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {labels.loading}
                </div>
            )}

            {status === 'error' && (
                <div className="w-full py-3 px-4 rounded-2xl border border-destructive/20 bg-destructive/5 text-destructive text-sm text-center">
                    {labels.denied}
                </div>
            )}

            {status === 'done' && (
                <div className="border border-border rounded-2xl overflow-hidden">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-accent transition-colors"
                    >
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <MapPin className="w-4 h-4 text-primary" />
                            {labels.title}
                            <span className="text-xs font-normal text-muted-foreground">· {district}</span>
                        </div>
                        {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </button>

                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="divide-y divide-border">
                                    {clinics.map((c, i) => (
                                        <div key={i} className="px-4 py-3 flex items-start gap-3">
                                            <Building2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-foreground">{c.name}</p>
                                                <p className="text-xs text-muted-foreground mt-0.5">{c.address}</p>
                                                {c.phone && (
                                                    <a href={`tel:${c.phone}`} className="flex items-center gap-1 text-xs text-primary mt-1 hover:underline">
                                                        <Phone className="w-3 h-3" /> {c.phone}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}