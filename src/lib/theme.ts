"use client";

import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY as STORAGE_KEY } from "./theme-script";

export type Theme = "light" | "dark";

const EVENT = "themechange";

function current(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** Active theme plus a toggle that remembers the visitor's choice; follows the system until they choose. */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    setThemeState(current());
    const sync = () => setThemeState(current());
    window.addEventListener(EVENT, sync);

    // Follow system changes only while the visitor hasn't picked a theme
    const media = matchMedia("(prefers-color-scheme: dark)");
    const onSystem = (e: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(STORAGE_KEY);
      } catch {}
      if (saved) return;
      document.documentElement.dataset.theme = e.matches ? "dark" : "light";
      window.dispatchEvent(new Event(EVENT));
    };
    media.addEventListener("change", onSystem);
    return () => {
      window.removeEventListener(EVENT, sync);
      media.removeEventListener("change", onSystem);
    };
  }, []);

  const toggle = () => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  };

  return { theme, toggle };
}
