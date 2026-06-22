"use client";

import { useState } from "react";
import { TbWorld } from "react-icons/tb";

import { Language } from "@/i18n/messages";
import { useLanguageStore } from "@/stores/languageStore";
import { loadLanguageDropdownStyles } from "./styles";

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
  const styles = loadLanguageDropdownStyles();
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
    <div className={styles.wrapper}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.globeWrapper}
      >
        <span className={styles.globe}>
          <TbWorld size={17} strokeWidth={1.5} />
        </span>
        <span className={styles.flag}>{currentLanguage?.flag}</span>
      </button>
      <div className={styles.dropdownWrapper(isOpen)}>
        {languages.map((language) => {
          const isSelected = selectedLanguage === language.value;

          return (
            <button
              key={language.value}
              type="button"
              onClick={() => handleLanguageChange(language.value)}
              className={styles.optionWrapper(isSelected)}
            >
              <span className={styles.flagDropdown}>{language.flag}</span>
              <span>{language.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
