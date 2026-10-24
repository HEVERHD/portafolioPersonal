"use client";

import { useInView } from "@/lib/useInView";

const ARROW = ["M4 30 C 28 6, 58 6, 82 30", "M72 26 L 83 31 L 78 19"];

/**
 * A handwritten terracotta note on a paper slip, with an arrow that draws itself toward the phone
 * mockup the first time the card scrolls into view (shown complete when motion is reduced).
 */
export function HandNote({ text, className = "" }: { text: string; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.6);

  // pathLength=1 lets the dash animation work on any path length; the head draws after the curve
  const stroke = (i: number) => ({
    pathLength: 1,
    strokeDasharray: "1",
    className: `transition-[stroke-dashoffset] ease-out motion-reduce:transition-none ${i ? "delay-1000 duration-300" : "delay-300 duration-700"}`,
    style: { strokeDashoffset: inView ? 0 : 1 },
  });

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none flex items-center gap-1 ${className}`}>
      <span
        className={`-rotate-3 bg-paper px-2.5 py-0.5 font-hand text-xl leading-tight whitespace-nowrap text-terra shadow-md shadow-black/15 transition-[opacity,scale] duration-500 motion-reduce:transition-none sm:text-2xl ${
          inView ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {text}
      </span>
      <svg viewBox="0 0 90 50" className="h-10 w-16 shrink-0 overflow-visible sm:h-12 sm:w-20" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Paper underlay keeps the arrow readable on dark screenshots */}
        <g className="text-paper" stroke="currentColor" strokeWidth="8">
          {ARROW.map((d, i) => (
            <path key={d} d={d} {...stroke(i)} />
          ))}
        </g>
        <g className="text-terra" stroke="currentColor" strokeWidth="3">
          {ARROW.map((d, i) => (
            <path key={d} d={d} {...stroke(i)} />
          ))}
        </g>
      </svg>
    </div>
  );
}
