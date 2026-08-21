"use client";

import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Phone, XOctagon } from "lucide-react";

export function Topbar() {
  const { language, setLanguage } = useAppStore();

  const handleQuickExit = () => {
    // Instantly close or redirect and clear history
    window.location.replace("https://www.google.com");
  };

  const handleSOS = () => {
    // For now, redirect to a safe page or dialer
    // We will build a dedicated SOS modal
    alert("Emergency SOS triggered!");
  };

  const getLanguageLabel = () => {
    switch (language) {
      case "hi": return "हिन्दी";
      case "mr": return "मराठी";
      case "ta": return "தமிழ்";
      case "te": return "తెలుగు";
      case "bn": return "বাংলা";
      case "gu": return "ગુજરાતી";
      case "kn": return "ಕನ್ನಡ";
      case "ml": return "മലയാളം";
      default: return "English";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-orange-50 border-b border-orange-200 shadow-sm">
      <Button variant="ghost" size="icon" onClick={handleQuickExit} className="text-slate-600 hover:bg-slate-200">
        <XOctagon className="h-6 w-6" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" className="gap-2 bg-white font-medium">
            <Globe className="h-4 w-4" />
            {getLanguageLabel()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-64 overflow-y-auto">
          <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("hi")}>हिन्दी</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("mr")}>मराठी</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("bn")}>বাংলা</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("gu")}>ગુજરાતી</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("kn")}>ಕನ್ನಡ</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("ml")}>മലയാളം</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("ta")}>தமிழ்</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("te")}>తెలుగు</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="destructive" onClick={handleSOS} className="gap-2 font-bold bg-red-600 hover:bg-red-700">
        <Phone className="h-4 w-4" />
        SOS
      </Button>
    </div>
  );
}
