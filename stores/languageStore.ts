import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Language } from "@/i18n/messages";

type LanguageStore = {
  language: Language;
  setLanguage: (language: Language) => void;
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "pt",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "arnecke-language",
    },
  ),
);
