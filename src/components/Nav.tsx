"use client";

import { useState } from "react";
import { ui } from "@/content";
import { useLang } from "@/lib/i18n";

const links = [
  ["experience", "#experiencia"],
  ["work", "#proyectos"],
  ["services", "#servicios"],
  ["about", "#sobre-mi"],
  ["contact", "#contacto"],
] as const;

export function Nav() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="font-display text-lg font-bold tracking-tight">
          hevert<span className="text-neon">.</span>dev
        </a>

        <ul className="hidden items-center gap-7 text-sm text-muted md:flex">
          {links.map(([key, href]) => (
            <li key={key}>
              <a href={href} className="transition-colors hover:text-ink">
                {t(ui.nav[key])}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-line p-0.5 font-mono text-xs" role="group" aria-label="Language">
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
                  lang === l ? "bg-ink text-bg" : "text-muted hover:text-ink"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            className="grid size-9 place-items-center rounded-full border border-line md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Menu"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-0.5 w-4 bg-ink transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-4 bg-ink transition-all ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-line px-4 py-3 md:hidden">
          {links.map(([key, href]) => (
            <li key={key}>
              <a href={href} onClick={() => setOpen(false)} className="block py-2.5 text-muted hover:text-ink">
                {t(ui.nav[key])}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
