import { useState } from 'react';
import { PlayCircle, Shield, Home, Users, FileText, Scale, BookOpen } from 'lucide-react';

const VIDEOS = [
    { id: '1W8bFy1X2Ss', title: 'Domestic Violence Protection', icon: Shield, color: 'text-rose-500' },
    { id: 'Y86MIgmy1xw', title: 'Property and Land Rights', icon: Home, color: 'text-amber-500' },
    { id: 'X357f4P51EA', title: 'Divorce and Maintenance', icon: Users, color: 'text-purple-500' },
    { id: 'mQXO6WWbx0I', title: 'Free Legal Aid', icon: Scale, color: 'text-blue-500' },
    { id: 'H66ugKoX0AU', title: 'Filing an FIR', icon: FileText, color: 'text-emerald-500' },
    { id: '6NsLg4Cg27I', title: 'Child Custody Rights', icon: Users, color: 'text-indigo-500' }
];

export default function LegalEducation() {
    return (
        <div className="w-full max-w-md flex flex-col gap-4">
            <div className="text-center mb-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                    <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Legal Education</h2>
                <p className="text-sm text-muted-foreground mt-1">Watch these videos to learn about your legal rights and procedures.</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {VIDEOS.map((video) => {
                    const Icon = video.icon;
                    return (
                        <div key={video.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:border-primary/30 transition-colors">
                            <div className="aspect-video w-full bg-muted relative">
                                <iframe 
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                />
                            </div>
                            <div className="p-3 flex items-center gap-3">
                                <Icon className={`w-5 h-5 ${video.color}`} />
                                <p className="font-medium text-sm text-foreground">{video.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
