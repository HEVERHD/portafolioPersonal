"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ui } from "@/content";
import { useLang } from "@/lib/i18n";

const ReelPlayer = dynamic(() => import("./ReelPlayer"), { ssr: false });

export function Showreel() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  // Mount the player only once the section is close to the viewport, and never for reduced motion.
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="reveal mx-auto max-w-6xl px-4 sm:px-6">
      <div ref={ref} className="relative overflow-hidden rounded-[2rem] border border-line bg-surface shadow-2xl shadow-accent/10">
        {/* Poster keeps the layout stable and is the reduced-motion fallback */}
        <img
          src="/reel/poster.jpg"
          alt={t(ui.showreel.alt)}
          width={1280}
          height={720}
          className="aspect-video w-full object-cover"
        />
        {mount && (
          <div className="absolute inset-0">
            <ReelPlayer />
          </div>
        )}
      </div>
      <p className="mt-3 flex items-center justify-center gap-2 font-mono text-xs text-muted">
        <span className="size-1.5 rounded-full bg-neon" />
        {t(ui.showreel.caption)}
      </p>
    </section>
  );
}
