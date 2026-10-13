"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { ui } from "@/content";
import { useLang } from "@/lib/i18n";
import { useInView } from "@/lib/useInView";

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
        className="relative grid overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-surface to-bg md:grid-cols-[1.1fr_1fr]"
      >
        <div className="pointer-events-none absolute -bottom-40 left-1/3 size-[480px] rounded-full bg-accent/20 blur-[120px]" />

        <div className="relative z-10 p-7 sm:p-12">
          <p className="font-mono text-xs tracking-widest text-neon uppercase">{t(ui.remote.eyebrow)}</p>
          <p className="mt-6 text-muted">{t(ui.remote.lead)}</p>
          <h2 className="mt-2 font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
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
                    className={`h-full w-full rounded-2xl border px-3 py-3 text-left backdrop-blur transition-all duration-300 sm:px-4 ${
                      active
                        ? "border-neon/60 bg-neon/10 shadow-[0_0_24px_-8px] shadow-neon"
                        : "border-line bg-bg/50 hover:border-white/20"
                    }`}
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold sm:text-base">
                      <span
                        className={`size-2 rounded-full bg-neon transition-transform duration-300 ${
                          active ? "scale-150 shadow-[0_0_10px] shadow-neon" : "shadow-[0_0_8px] shadow-neon"
                        }`}
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
