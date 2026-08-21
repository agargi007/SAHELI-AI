import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
type Language = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'bn' | 'gu' | 'kn' | 'ml';

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  incognitoMode: boolean;
  setIncognitoMode: (active: boolean) => void;
  isPinLocked: boolean;
  setPinLocked: (locked: boolean) => void;
  savedPin: string | null;
  setSavedPin: (pin: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'hi', // Default to Hindi
      setLanguage: (lang) => set({ language: lang }),
      incognitoMode: false,
      setIncognitoMode: (active) => set({ incognitoMode: active }),
      isPinLocked: true,
      setPinLocked: (locked) => set({ isPinLocked: locked }),
      savedPin: null,
      setSavedPin: (pin) => set({ savedPin: pin }),
    }),
    {
      name: 'saheli-app-storage', // unique name
      storage: createJSONStorage(() => localStorage),
    }
  )
);
