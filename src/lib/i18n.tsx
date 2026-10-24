"use client";

import { createContext, useContext, useEffect } from "react";
import { contact, type Lang } from "@/content";
import { getRole, pagePath, type RoleId } from "@/roles";

const LangContext = createContext<{ lang: Lang; role?: RoleId }>({ lang: "es" });

/**
 * The page's language and role come from its route (/, /en, /vtex, /en/vtex…), never from the
 * browser, so crawlers see stable content.
 */
export function LangProvider({ lang, role, children }: { lang: Lang; role?: RoleId; children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <LangContext.Provider value={{ lang, role }}>{children}</LangContext.Provider>;
}

/** Returns the active language, a translator for `{ es, en }` records and a switcher that navigates to the other route. */
export function useLang() {
  const { lang, role } = useContext(LangContext);
  const t = (s: Record<Lang, string>) => s[lang];
  const setLang = (l: Lang) => {
    if (l === lang) return;
    // Keep the visitor on the same role and section when switching language
    window.location.assign(pagePath(l, role) + window.location.hash);
  };
  return { lang, setLang, t };
}

/** The role this page is aimed at, if any (see src/roles.ts). */
export function useRole() {
  const { role } = useContext(LangContext);
  return role ? getRole(role) : undefined;
}

/** CV for the current page: the role's tailored version when there is one, otherwise the general one. */
export function useCv() {
  const { lang } = useContext(LangContext);
  return useRole()?.cv?.[lang] ?? contact.cv[lang];
}
