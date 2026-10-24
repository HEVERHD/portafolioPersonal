"use client";

import { createContext, useContext, useEffect } from "react";
import type { Lang } from "@/content";

/** Each language lives at its own address so search engines can index both. */
export const LANG_PATH: Record<Lang, string> = { es: "/", en: "/en" };

const LangContext = createContext<Lang>("es");

/** The page's language comes from its route (/ or /en), never from the browser, so crawlers see stable content. */
export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

/** Returns the active language, a translator for `{ es, en }` records and a switcher that navigates to the other route. */
export function useLang() {
  const lang = useContext(LangContext);
  const t = (s: Record<Lang, string>) => s[lang];
  const setLang = (l: Lang) => {
    if (l === lang) return;
    // Keep the visitor on the same section when switching language
    window.location.assign(LANG_PATH[l] + window.location.hash);
  };
  return { lang, setLang, t };
}
