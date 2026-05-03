"use client";

import { useState } from "react";
import { TbWorld } from "react-icons/tb";

type Language = "pt-BR" | "es" | "en";

const languages: {
  value: Language;
  label: string;
  flag: string;
}[] = [
  {
    value: "pt-BR",
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
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("pt-BR");

  const currentLanguage = languages.find(
    (language) => language.value === selectedLanguage,
  );

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50 w-fit font-systemia">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          relative
          flex
          h-8
          w-8
          items-center
          justify-center
          text-current
          cursor-pointer
        "
        aria-expanded={isOpen}
        aria-label="Selecionar idioma"
      >
        <TbWorld size={17} strokeWidth={1.5} />
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
            text-[10px]
            leading-non
            bg-transparent
          "
        >
          {currentLanguage?.flag}
        </span>
      </button>

      {isOpen && (
        <div
          className="
            absolute
            right-0
            mt-2
            flex
            w-16
            flex-col
            border
            border-color-arnecke-white
            bg-color-arnecke-white
            text-color-arnecke-blue
          "
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
    border-b
    border-current
    px-2
    text-[8px]
    uppercase
    leading-none
    tracking-[0.12em]
    last:border-b-0
    hover:!bg-color-arnecke-blue
    hover:!text-color-arnecke-white
    ${
      isSelected
        ? "bg-color-arnecke-blue text-color-arnecke-white"
        : "bg-color-arnecke-white text-color-arnecke-blue"
    }
  `}
              >
                <span className="text-[11px] leading-none">
                  {language.flag}
                </span>
                <span>{language.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
