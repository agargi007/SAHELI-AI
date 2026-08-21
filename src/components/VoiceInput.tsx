"use client";

import { useState } from "react";
import { Mic, Square } from "lucide-react";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";

export function VoiceInput() {
  const [isRecording, setIsRecording] = useState(false);
  const { language } = useAppStore();

  const labels: Record<string, {listen: string, prompt: string, help: string}> = {
    en: { listen: "Listening...", prompt: "Tap to Speak", help: "Speak your problem to get legal aid." },
    hi: { listen: "सुन रहा हूँ...", prompt: "बोलने के लिए दबाएं", help: "कानूनी सहायता के लिए अपनी समस्या बोलें।" },
    mr: { listen: "ऐकत आहे...", prompt: "बोलण्यासाठी दाबा", help: "कायदेशीर मदतीसाठी तुमची समस्या सांगा." },
    bn: { listen: "শুনছি...", prompt: "বলতে ಟ್ಯಾপ করুন", help: "আইনি সহায়তা পেতে আপনার সমস্যার কথা বলুন।" },
    gu: { listen: "સાંભળી રહ્યો છું...", prompt: "બોલવા માટે ટેપ કરો", help: "કાનૂની સહાય મેળવવા માટે તમારી સમસ્યા કહો." },
    ta: { listen: "கேட்கிறது...", prompt: "பேசத் தட்டவும்", help: "சட்ட உதவி பெற உங்கள் பிரச்சினையை பேசுங்கள்." },
    te: { listen: "వింటున్నాను...", prompt: "మాట్లాడటానికి నొక్కండి", help: "న్యాయ సహాయం పొందడానికి మీ సమస్యను చెప్పండి." },
    kn: { listen: "ಕೇಳುತ್ತಿದ್ದೇನೆ...", prompt: "ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ", help: "ಕಾನೂನು ಸಹಾಯ ಪಡೆಯಲು ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ಹೇಳಿ." },
    ml: { listen: "കേൾക്കുന്നു...", prompt: "സംസാരിക്കാൻ ടാപ്പുചെയ്യുക", help: "നിയമ സഹായം ലഭിക്കുന്നതിന് നിങ്ങളുടെ പ്രശ്നം പറയുക." }
  };

  const handleToggleRecord = () => {
    setIsRecording(!isRecording);
    // Here we will integrate Web Speech API / MediaRecorder
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      <p className="text-xl font-medium text-slate-700 text-center px-4">
        {labels[language].help}
      </p>

      <div className="relative">
        {isRecording && (
          <div className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-75"></div>
        )}
        <button
          onClick={handleToggleRecord}
          className={`relative flex items-center justify-center w-32 h-32 rounded-full shadow-lg transition-all ${
            isRecording ? "bg-red-500 hover:bg-red-600" : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {isRecording ? (
            <Square className="h-12 w-12 text-white" fill="white" />
          ) : (
            <Mic className="h-12 w-12 text-white" />
          )}
        </button>
      </div>

      <p className={`text-lg font-semibold ${isRecording ? "text-red-500 animate-pulse" : "text-slate-600"}`}>
        {isRecording ? labels[language].listen : labels[language].prompt}
      </p>
    </div>
  );
}
