"use client";

import { useState } from "react";
import { ui } from "@/content";
import { useLang } from "@/lib/i18n";
import { QuickView } from "./QuickView";

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
  const [quick, setQuick] = useState(false);

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/90 font-body text-press backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="font-serif text-xl font-medium tracking-tight">
          Hevert Gelis<span className="text-terra">.</span>
        </a>

        <ul className="hidden items-center gap-7 text-sm text-press-muted md:flex">
          {links.map(([key, href]) => (
            <li key={key}>
              <a href={href} className="transition-colors hover:text-press">
                {t(ui.nav[key])}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuick(true)}
            className="hidden border border-press px-3 py-1.5 text-xs font-semibold transition-colors hover:border-terra hover:bg-terra hover:text-paper sm:inline-block"
          >
            {t(ui.quick.trigger)}
          </button>
          <div className="flex items-center gap-1.5 text-xs" role="group" aria-label="Language">
            {(["es", "en"] as const).map((l, i) => (
              <span key={l} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-rule">/</span>}
                <button
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`uppercase transition-colors ${lang === l ? "font-semibold text-press underline decoration-terra underline-offset-4" : "text-press-muted hover:text-press"}`}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>
          <button
            className="grid size-9 place-items-center border border-rule md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Menu"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-0.5 w-4 bg-press transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-4 bg-press transition-all ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-rule px-4 py-3 md:hidden">
          {links.map(([key, href]) => (
            <li key={key}>
              <a href={href} onClick={() => setOpen(false)} className="block py-2.5 text-press-muted hover:text-press">
                {t(ui.nav[key])}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setOpen(false);
                setQuick(true);
              }}
              className="mt-2 w-full border border-press py-2.5 text-sm font-semibold"
            >
              {t(ui.quick.trigger)}
            </button>
          </li>
        </ul>
      )}
    </header>
    <QuickView open={quick} onClose={() => setQuick(false)} />
    </>
  );
}
