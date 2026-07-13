"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LANGUAGES } from "@/lib/constants";
import { en, loadMessages, type Messages } from "@/lib/i18n/get-messages";
import {
  persistLocaleCode,
  readStoredLocaleCode,
} from "@/lib/i18n/locale-storage";
import { NAV_LABEL_KEYS, type Locale } from "@/lib/i18n/messages";

type Language = (typeof LANGUAGES)[number];

type LocaleContextValue = {
  language: Language;
  locale: Locale;
  setLanguage: (lang: Language) => void;
  t: Messages;
  navLabel: (href: string) => string;
  /** False until stored locale + message packs are resolved */
  ready: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function findLanguage(code: string | null): Language {
  return LANGUAGES.find((lang) => lang.code === code) ?? LANGUAGES[0];
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(LANGUAGES[0]);
  const [messages, setMessages] = useState<Messages>(en);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredLocaleCode();
    const lang = findLanguage(stored);
    setLanguageState(lang);

    if (lang.locale === "en") {
      setMessages(en);
      setReady(true);
      return;
    }

    let cancelled = false;
    void loadMessages(lang.locale).then((loaded) => {
      if (!cancelled) {
        setMessages(loaded);
        setReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = language.locale;
    document.documentElement.dataset.locale = language.code;
    document.documentElement.dir = language.locale === "ar" ? "rtl" : "ltr";
  }, [language, ready]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    persistLocaleCode(lang.code);

    if (lang.locale === "en") {
      setMessages(en);
      return;
    }

    void loadMessages(lang.locale).then(setMessages);
  }, []);

  const value = useMemo<LocaleContextValue>(() => ({
    language,
    locale: language.locale,
    setLanguage,
    t: messages,
    ready,
    navLabel: (href: string) => {
      const key = NAV_LABEL_KEYS[href];
      if (key) return messages.nav[key];
      return href;
    },
  }), [language, setLanguage, messages, ready]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}

/** Shorthand for translated UI strings */
export function useT() {
  return useLocale().t;
}
