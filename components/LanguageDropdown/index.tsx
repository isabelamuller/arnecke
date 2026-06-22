"use client";

import { useState } from "react";
import { TbWorld } from "react-icons/tb";

import { Language } from "@/i18n/messages";
import { useLanguageStore } from "@/stores/languageStore";

const languages: {
  value: Language;
  label: string;
  flag: string;
}[] = [
  {
    value: "pt",
    label: "PT",
    flag: "🇧🇷",
  },
  {
    value: "es",
    label: "ES",
    flag: "🇪🇸",
  },
  {
    value: "en",
    label: "EN",
    flag: "🇺🇸",
  },
];

export const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLanguage = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const currentLanguage = languages.find(
    (language) => language.value === selectedLanguage,
  );

  const handleLanguageChange = (language: Language) => {
    setLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50 w-fit font-systemia">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          group
          relative
          flex
          h-8
          w-8
          cursor-pointer
          items-center
          justify-center
          text-current
          transition-all
          duration-300
          ease-out
          hover:opacity-75
          active:scale-120
        "
        aria-expanded={isOpen}
        aria-label="Selecionar idioma"
      >
        <span
          className="
            flex
            items-center
            justify-center
            transition-transform
            duration-300
            ease-out
          "
        >
          <TbWorld size={17} strokeWidth={1.5} />
        </span>

        <span
          className="
            absolute
            bottom-0
            right-0
            flex
            h-4
            w-4
            items-center
            justify-center
            bg-transparent
            text-[10px]
            leading-none
          "
        >
          {currentLanguage?.flag}
        </span>
      </button>

      <div
        className={`
          absolute
          right-0
          mt-2
          flex
          w-16
          origin-top-right
          flex-col
          overflow-hidden
          border
          border-[#0200F7]
          bg-color-arnecke-white
          text-color-arnecke-blue
          shadow-[0_8px_18px_rgba(0,0,0,0.12)]
          transition-all
          duration-300
          ease-[cubic-bezier(0.16,1,0.3,1)]
          ${
            isOpen
              ? "pointer-events-auto  scale-100 opacity-100 blur-0"
              : "pointer-events-none  scale-95 opacity-0 blur-[2px]"
          }
        `}
      >
        {languages.map((language) => {
          const isSelected = selectedLanguage === language.value;

          return (
            <button
              key={language.value}
              type="button"
              onClick={() => handleLanguageChange(language.value)}
              className={`
                flex
                h-8
                w-full
                cursor-pointer
                items-center
                justify-between
                px-2
                text-[8px]
                uppercase
                leading-none
                tracking-[0.12em]
                transition-colors
                duration-200
                ease-out
                hover:bg-color-arnecke-blue
                hover:text-color-arnecke-white
                ${
                  isSelected
                    ? "bg-color-arnecke-blue text-color-arnecke-white"
                    : "bg-color-arnecke-white text-color-arnecke-blue"
                }
              `}
            >
              <span className="text-[11px] leading-none">{language.flag}</span>

              <span>{language.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
