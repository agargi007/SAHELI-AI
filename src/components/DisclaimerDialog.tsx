"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DisclaimerDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem("saheli-disclaimer-seen");
    if (!hasSeenDisclaimer) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("saheli-disclaimer-seen", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
        // Prevent closing by clicking outside if they haven't accepted
        if (!val && !localStorage.getItem("saheli-disclaimer-seen")) return;
        setOpen(val);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-red-600">⚠️ Important Legal Disclaimer</DialogTitle>
          <DialogDescription className="text-base text-slate-800 pt-4">
            Saheli AI provides general legal information and guidance, <b>not professional legal advice</b>. 
            <br/><br/>
            For formal legal proceedings, please consult a qualified lawyer or contact your nearest Legal Services Authority (NALSA). 
            <br/><br/>
            In case of immediate danger, call <b>100</b> (Police) or <b>181</b> (Women's Helpline).
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <Button onClick={handleAccept} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 text-lg">
            I Understand
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
