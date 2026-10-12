"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "@/content";

const STORAGE_KEY = "lang";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "es",
  setLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (saved === "es" || saved === "en") setLangState(saved);
    else if (!navigator.language.toLowerCase().startsWith("es")) setLangState("en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

/** Returns the active language and a translator for `{ es, en }` records. */
export function useLang() {
  const { lang, setLang } = useContext(LangContext);
  const t = (s: Record<Lang, string>) => s[lang];
  return { lang, setLang, t };
}
