/**
 * Tinta, the assistant's mascot: an ink drop drawn in the site's press color, with paper eyes and
 * terracotta cheeks. It blinks and bobs (CSS in globals.css) and looks around while it's answering.
 */
export function Mascot({ thinking = false, className = "" }: { thinking?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 64 72" className={`mascot ${thinking ? "mascot-thinking" : ""} ${className}`} aria-hidden>
      {/* A couple of hand-drawn sparks so it reads as a character, not an icon */}
      <path d="M47 11l4-5M51 17l6-1" className="stroke-terra" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path
        className="fill-press"
        d="M32 4.5C27.5 15 11 28.5 10.5 46c-.3 13 9.6 21.8 21.7 21.5C44.6 67.2 54 58.7 53.6 45.6 53.1 28.4 36.4 15.2 32 4.5Z"
      />
      <path d="M19.5 38.5c-2.4 6-1.8 11 1.4 15" className="stroke-paper" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity=".45" />
      <g className="mascot-eyes">
        <ellipse cx="25" cy="45" rx="4.4" ry="5.2" className="fill-paper" />
        <ellipse cx="39.5" cy="45" rx="4.4" ry="5.2" className="fill-paper" />
        <g className="mascot-pupils">
          <circle cx="26" cy="46.2" r="2.3" className="fill-press" />
          <circle cx="40.5" cy="46.2" r="2.3" className="fill-press" />
        </g>
      </g>
      <circle cx="18.8" cy="53.5" r="3" className="fill-terra" opacity=".75" />
      <circle cx="45.6" cy="53.5" r="3" className="fill-terra" opacity=".75" />
      <path d="M28.5 54.5c2.4 3 5.6 3 8 0" className="stroke-paper" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
