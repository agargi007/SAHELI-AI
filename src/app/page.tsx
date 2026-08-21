"use client";

import { useState } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import VoiceInterface from "@/components/VoiceInterface";
import LegalResponse from "@/components/LegalResponse";
import SOSButton from "@/components/SOSButton";
import { DisclaimerDialog } from "@/components/DisclaimerDialog";
import { PinLockDialog } from "@/components/PinLockDialog";
import { useAppStore } from "@/store";
import { XOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { language, setLanguage } = useAppStore();
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("language"); // language | voice | response

  const [showPinDialog, setShowPinDialog] = useState(false);

  const handleLanguageSelect = (lang: any) => {
    setLanguage(lang);
    setStep("voice");
  };

  const handleTranscript = async (text: string) => {
    setTranscript(text);
    setLoading(true);
    setStep("response");

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language, isVoice: true })
      });
      const data = await res.json();
      
      // Format mock response to markdown to look good in LegalResponse
      const mdResponse = `## ${data.summary}\n\n**Action Steps:**\n${data.steps.map((s:any) => `- ${s.instruction}`).join('\n')}\n\n**Helplines:**\n${data.helplineNumbers.map((h:any) => `- ${h}`).join('\n')}`;
      
      setResponse(mdResponse);
    } catch (e) {
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTranscript("");
    setResponse("");
    setStep("voice");
  };

  const handleNewQuery = () => {
    setTranscript("");
    setResponse("");
    setStep("language");
  };

  const handleQuickExit = () => window.location.replace("https://www.google.com");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DisclaimerDialog />
      <PinLockDialog open={showPinDialog} onOpenChange={setShowPinDialog} onSuccess={() => alert("Navigating to Cases...")} />

      {/* Header */}
      <header className="px-6 py-5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-lg">⚖</span>
          </div>
          <div>
            <h1 className="font-semibold text-foreground tracking-tight">Saheli AI</h1>
            <p className="text-xs text-muted-foreground">Legal Aid for Women</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setShowPinDialog(true)} className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg border border-border hover:border-foreground/20 transition-colors">
            📁 Cases
          </button>
          <Button variant="ghost" size="icon" onClick={handleQuickExit} className="text-slate-600 hover:bg-slate-200">
            <XOctagon className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {step === "language" && <LanguageSelector onSelect={handleLanguageSelect} />}
        {step === "voice" && <VoiceInterface language={language} onTranscript={handleTranscript} />}
        {step === "response" && (
          <LegalResponse
            transcript={transcript}
            response={response}
            loading={loading}
            language={language}
            onAskAgain={handleReset}
            autoSpeak={true}
          />
        )}
      </main>

      <SOSButton />
    </div>
  );
}
