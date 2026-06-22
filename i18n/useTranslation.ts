import { messages } from "./messages";
import { useLanguageStore } from "@/stores/languageStore";

function getNestedValue(object: unknown, path: string) {
  return path.split(".").reduce<unknown>((currentValue, key) => {
    if (
      currentValue &&
      typeof currentValue === "object" &&
      key in currentValue
    ) {
      return (currentValue as Record<string, unknown>)[key];
    }

    return undefined;
  }, object);
}

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);

  function t(key: string) {
    const value = getNestedValue(messages[language], key);

    if (typeof value === "string") {
      return value;
    }

    return key;
  }

  return { t, language };
}
