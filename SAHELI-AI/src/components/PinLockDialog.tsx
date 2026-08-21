"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store";
import { Lock } from "lucide-react";

interface PinLockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function PinLockDialog({ open, onOpenChange, onSuccess }: PinLockDialogProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const { savedPin, setSavedPin } = useAppStore();

  const handleSubmit = () => {
    if (!savedPin) {
      // First time setting PIN
      if (pin.length === 4) {
        setSavedPin(pin);
        onSuccess();
        onOpenChange(false);
      } else {
        setError(true);
      }
    } else {
      // Verifying PIN
      if (pin === savedPin) {
        onSuccess();
        onOpenChange(false);
        setPin("");
        setError(false);
      } else {
        setError(true);
        setPin("");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-slate-700" />
            {savedPin ? "Enter Privacy PIN" : "Set Privacy PIN"}
          </DialogTitle>
          <DialogDescription>
            {savedPin 
              ? "Please enter your 4-digit PIN to access your cases." 
              : "Set a 4-digit PIN to protect your case history."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Input 
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/[^0-9]/g, ''));
              setError(false);
            }}
            className={`text-center text-2xl tracking-[1em] font-mono ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            placeholder="••••"
          />
          {error && (
            <p className="text-sm text-red-500 text-center">
              {savedPin ? "Incorrect PIN" : "PIN must be 4 digits"}
            </p>
          )}
          <Button onClick={handleSubmit} className="w-full bg-slate-800 hover:bg-slate-900">
            {savedPin ? "Unlock" : "Save PIN"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
