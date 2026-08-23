"use client";

import { useState } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import VoiceInterface from "@/components/VoiceInterface";
import LegalResponse from "@/components/LegalResponse";
import SOSButton from "@/components/SOSButton";
import { DisclaimerDialog } from "@/components/DisclaimerDialog";
import { PinLockDialog } from "@/components/PinLockDialog";
import LegalEducation from "@/components/LegalEducation";
import { useAppStore } from "@/store";
import { XOctagon, FolderClosed, PlayCircle, Home as HomeIcon } from "lucide-react";

export default function Home() {
  const { language, setLanguage } = useAppStore();
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("language"); // language | voice | response | cases | education

  const [showPinDialog, setShowPinDialog] = useState(false);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setStep("voice");
  };

  const handleTranscript = async (text) => {
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
      
      setResponse(data);
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
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#fff5f2] to-[#fffaf8] flex flex-col items-center">
      {/* Tricolour Header Line */}
      <div className="fixed top-0 left-0 w-full h-1 flex z-[60]">
        <div className="flex-1 bg-[#FF9933]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#138808]"></div>
      </div>

      <DisclaimerDialog />
      <PinLockDialog open={showPinDialog} onOpenChange={setShowPinDialog} onSuccess={() => setStep("cases")} />

      {/* TopAppBar */}
      <header className="fixed top-1 left-0 w-full z-50 flex justify-between items-center px-4 h-14 bg-[#fbf9f8]/90 backdrop-blur-sm border-b border-[#e1bfb5]/30 max-w-[600px] mx-auto right-0">
        <button aria-label="Quick Exit" onClick={handleQuickExit} className="flex items-center justify-center w-12 h-12 text-[#594139] hover:bg-[#e4e2e1] transition-colors rounded-full active:scale-95">
           <XOctagon className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-[#ab3500] tracking-wide" onClick={handleNewQuery}>Saheli AI</h1>
        <div className="w-12 h-12 flex items-center justify-center">
            {step !== "cases" && step !== "education" && <SOSButton isIconOnly={true} />}
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center w-full max-w-[600px] px-5 pt-20 pb-[120px]">
        {step === "language" && <LanguageSelector onSelect={handleLanguageSelect} />}
        
        {step === "voice" && (
           <>
              <VoiceInterface language={language} onTranscript={handleTranscript} />
              
              {/* Recent Case Preview */}
              <div className="w-full bg-white rounded-2xl p-6 shadow-sm mt-12 border border-[#e1bfb5]/30 flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b border-[#e4e2e1]/50 pb-3">
                      <h3 className="text-xl font-bold text-[#1b1c1c]">हाल का मामला</h3>
                      <span className="bg-[#a3f69c] text-[#002204] text-sm px-4 py-1.5 rounded-full font-medium tracking-wide">प्रगति पर</span>
                  </div>
                  <div className="flex items-start gap-4 mt-1">
                      <div className="w-12 h-12 bg-[#e9e2cc] rounded-2xl flex items-center justify-center text-[#1e1c0e] shrink-0">
                          <FolderClosed className="w-6 h-6" />
                      </div>
                      <div>
                          <p className="text-lg text-[#1b1c1c] font-medium">संपत्ति विवाद</p>
                          <p className="text-sm text-[#594139] mt-1">अंतिम अपडेट: 2 दिन पहले</p>
                      </div>
                  </div>
                  <button onClick={() => setShowPinDialog(true)} className="w-full mt-4 py-3 border border-[#ab3500] text-[#ab3500] text-base rounded-[1rem] font-medium hover:bg-[#ffdbd0] transition-colors h-12">
                     विवरण देखें
                  </button>
              </div>
           </>
        )}

        {step === "response" && (
          <LegalResponse
            transcript={transcript}
            response={response}
            loading={loading}
            language={language}
            onAskAgain={handleReset}
          />
        )}

        {step === "education" && (
          <LegalEducation />
        )}

        {step === "cases" && (
          <div className="w-full bg-white border border-[#e1bfb5]/30 rounded-2xl p-6 shadow-sm mt-8">
             <h2 className="text-lg font-bold text-[#1b1c1c] mb-4">Your Cases</h2>
             <p className="text-sm text-[#594139] mb-6">This section is securely unlocked. Your case records will appear here.</p>
             <button onClick={() => setStep("voice")} className="w-full py-3 border border-[#ab3500] text-[#ab3500] text-base rounded-[1rem] font-medium hover:bg-[#ffdbd0] transition-colors">
               Back to Home
             </button>
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full max-w-[600px] z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/90 backdrop-blur-md border-t border-[#e1bfb5]/30">
        <button onClick={() => setStep("voice")} className={`flex flex-col items-center justify-center rounded-2xl px-6 py-2 transition-transform duration-200 ${step === 'voice' || step === 'language' || step === 'response' ? 'bg-[#ffdbd0] text-[#ab3500]' : 'text-[#594139] hover:bg-[#f5f3f3]'}`}>
          <HomeIcon className="w-6 h-6" />
          <span className="text-[12px] mt-1 font-bold">Home</span>
        </button>
        <button onClick={() => setShowPinDialog(true)} className={`flex flex-col items-center justify-center rounded-2xl px-6 py-2 transition-transform duration-200 ${step === 'cases' ? 'bg-[#ffdbd0] text-[#ab3500]' : 'text-[#594139] hover:bg-[#f5f3f3]'}`}>
          <FolderClosed className="w-6 h-6" />
          <span className="text-[12px] mt-1 font-bold">My Cases</span>
        </button>
        <button onClick={() => setStep("education")} className={`flex flex-col items-center justify-center rounded-2xl px-6 py-2 transition-transform duration-200 ${step === 'education' ? 'bg-[#ffdbd0] text-[#ab3500]' : 'text-[#594139] hover:bg-[#f5f3f3]'}`}>
          <PlayCircle className="w-6 h-6" />
          <span className="text-[12px] mt-1 font-bold">Help Videos</span>
        </button>
      </nav>
    </div>
  );
}
