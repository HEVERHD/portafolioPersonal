"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content";
import { useLang } from "@/lib/i18n";
import { ArrowUpRight } from "./icons";

const PREVIEW_W = 360;

/**
 * Projects set like a magazine's table of contents. On devices with a mouse, hovering a title
 * shows its screenshot floating next to the cursor; on touch screens each row carries a thumbnail.
 */
export function ProjectIndex({ projects, onOpen }: { projects: Project[]; onOpen: (project: Project) => void }) {
  const { t } = useLang();
  const previewRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState<Project | null>(null);

  // The preview eases toward the cursor (or snaps to it with reduced motion)
  useEffect(() => {
    if (!hovered) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const tick = () => {
      const k = reduced ? 1 : 0.16;
      pos.current.x += (target.current.x - pos.current.x) * k;
      pos.current.y += (target.current.y - pos.current.y) * k;
      const tilt = reduced ? 0 : Math.max(-6, Math.min(6, (target.current.x - pos.current.x) * 0.05));
      const el = previewRef.current;
      if (el) {
        // Sit to the right of the cursor, flipping left near the edge; stay inside the viewport vertically
        let x = pos.current.x + 28;
        if (x + PREVIEW_W > innerWidth - 16) x = pos.current.x - 28 - PREVIEW_W;
        const y = Math.max(16, Math.min(innerHeight - el.offsetHeight - 16, pos.current.y - 120));
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${tilt}deg)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [hovered]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    target.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
      <ol className="border-t border-ink">
        {projects.map((p, i) => {
          const opensDialog = p.category !== "internal";
          const href = opensDialog ? undefined : p.codeUrl;
          const content = (
            <>
              <span className="w-8 shrink-0 pt-2 font-display text-sm text-accent tabular-nums sm:w-12">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Touch screens: thumbnail instead of the floating preview */}
              {p.desktop && (
                <img
                  src={p.desktop}
                  alt=""
                  loading="lazy"
                  className="hidden aspect-[16/10] w-24 shrink-0 border border-line object-cover object-top [@media(pointer:coarse)]:block"
                />
              )}
              <span className="min-w-0 flex-1">
                <span className="block font-display text-2xl leading-tight font-medium tracking-tight break-words transition-[color,translate] duration-300 group-hover:translate-x-2 group-hover:text-accent sm:text-5xl">
                  {p.name}
                </span>
                <span className="mt-1 block text-sm text-muted">{t(p.kind)}</span>
              </span>
              <span className="hidden shrink-0 pt-3 text-right text-xs text-muted md:block">{p.tags.slice(0, 3).join(" / ")}</span>
              <ArrowUpRight className="mt-3 size-5 shrink-0 text-muted transition-[color,translate] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </>
          );
          const rowClass = "group flex w-full items-start gap-4 py-6 text-left sm:gap-6";

          return (
            <li
              key={p.id}
              className="border-b border-line"
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse" || !p.desktop) return setHovered(null);
                // Start the preview at the cursor so it doesn't fly in from the corner
                pos.current = { x: e.clientX, y: e.clientY };
                target.current = { x: e.clientX, y: e.clientY };
                setHovered(p);
              }}
            >
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className={rowClass}>
                  {content}
                </a>
              ) : opensDialog ? (
                <button type="button" onClick={() => onOpen(p)} className={rowClass}>
                  {content}
                </button>
              ) : (
                <div className={rowClass}>{content}</div>
              )}
            </li>
          );
        })}
      </ol>

      {/* Floating preview, printed like the site's photo frames */}
      <div
        ref={previewRef}
        aria-hidden
        className={`pointer-events-none fixed top-0 left-0 z-40 border border-line bg-surface-2 p-2 shadow-2xl shadow-black/20 transition-opacity duration-200 [@media(pointer:coarse)]:hidden ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        style={{ width: PREVIEW_W }}
      >
        {hovered?.desktop && <img src={hovered.desktop} alt="" className="aspect-[16/10] w-full object-cover object-top" />}
      </div>
    </div>
  );
}
