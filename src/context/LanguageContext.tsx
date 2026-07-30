import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type LangCode } from "../i18n/translations";

interface LanguageContextValue {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "nest-lang";

const getInitialLang = (): LangCode => {
  if (typeof window === "undefined") return "uz";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "uz" || saved === "ru" || saved === "en") return saved;
  return "uz";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<LangCode>(getInitialLang);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = (next: LangCode) => setLangState(next);

  const t = (key: string): string => {
    return translations[lang][key] ?? translations.uz[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
};
