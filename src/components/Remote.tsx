"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { ui } from "@/content";
import { useLang } from "@/lib/i18n";
import { useInView } from "@/lib/useInView";
import { Eyebrow } from "./Section";

// WebGL only runs in the browser; load the globe once the card is near the viewport.
const Globe = dynamic(() => import("./Globe").then((m) => m.Globe), { ssr: false });

export function Remote() {
  const { lang, t } = useLang();
  const [ref, inView] = useInView<HTMLDivElement>(0.1);
  // Hover previews a country; a tap/click pins it until tapped again
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const focusId = hovered ?? pinned;

  const places = useMemo(
    () => ui.remote.globe.map((p) => ({ id: p.id, location: p.location, label: p.label[lang], detail: p.detail[lang] })),
    [lang],
  );

  return (
    <section className="reveal mx-auto max-w-6xl px-4 sm:px-6">
      <div
        ref={ref}
        className="relative grid overflow-hidden border-y border-ink md:grid-cols-[1.1fr_1fr]"
      >
        <div className="relative z-10 py-10 sm:py-14 md:pr-10">
          <Eyebrow>{t(ui.remote.eyebrow)}</Eyebrow>
          <p className="mt-6 text-muted">{t(ui.remote.lead)}</p>
          <h2 className="mt-2 font-display text-3xl leading-tight font-medium tracking-[-0.02em] text-balance sm:text-5xl">
            {t(ui.remote.title)}
          </h2>
          <ul className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
            {ui.remote.places.map((p) => {
              const active = focusId === p.focus;
              return (
                <li key={p.focus}>
                  <button
                    type="button"
                    aria-pressed={pinned === p.focus}
                    onMouseEnter={() => setHovered(p.focus)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(p.focus)}
                    onBlur={() => setHovered(null)}
                    onClick={() => setPinned((cur) => (cur === p.focus ? null : p.focus))}
                    className={`h-full w-full border-t-2 px-1 pt-3 pb-2 text-left transition-colors duration-300 ${
                      active ? "border-accent" : "border-line hover:border-ink"
                    }`}
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold sm:text-base">
                      <span
                        className={`size-2 rounded-full bg-accent transition-transform duration-300 ${active ? "scale-150" : ""}`}
                      />
                      {t(p.country)}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-muted sm:text-xs">{t(p.detail)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Globe sits low and slightly cropped, like a horizon */}
        <div className="relative -mt-6 h-72 sm:h-96 md:mt-0 md:h-auto md:min-h-[420px]">
          <div className="absolute inset-x-0 top-0 mx-auto w-[min(520px,115%)] max-w-none md:top-8 md:-right-10 md:left-auto md:w-[560px]">
            {inView && <Globe places={places} homeId="bog" focusId={focusId} />}
          </div>
        </div>
      </div>
    </section>
  );
}
