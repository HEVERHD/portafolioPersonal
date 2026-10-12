import type { CSSProperties } from "react";

// Logos from Simple Icons 16.32.0 (CC0), stored in public/tech. Colors are each brand's own.
const techs = [
  { name: "React · React Native", icon: "react", color: "#61DAFB" },
  { name: "Next.js", icon: "nextdotjs", color: "#FFFFFF" },
  { name: "TypeScript", icon: "typescript", color: "#3178C6" },
  { name: "Node.js", icon: "nodedotjs", color: "#5FA04E" },
  { name: "NestJS", icon: "nestjs", color: "#E0234E" },
  { name: "Tailwind CSS", icon: "tailwindcss", color: "#06B6D4" },
  { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
  { name: "MongoDB", icon: "mongodb", color: "#47A248" },
];

/**
 * Circular portrait with the tech stack slowly orbiting around it.
 * Sizes use container query units, so it scales with the column width.
 * Pauses on hover and stays still for prefers-reduced-motion (see globals.css).
 */
export function Orbit({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="orbit relative aspect-square w-full [container-type:inline-size]">
      {/* Rings */}
      <div className="absolute inset-[4%] rounded-full border border-dashed border-white/20" />
      <div className="absolute inset-[13%] rounded-full border border-white/10" />

      {/* Portrait */}
      <div className="absolute inset-[17%] rounded-full bg-gradient-to-br from-neon via-accent to-accent/20 p-[3px] shadow-[0_0_80px_-10px] shadow-accent/60">
        <img
          src={src}
          alt={alt}
          width={900}
          height={1350}
          className="size-full rounded-full bg-surface object-cover object-[50%_22%]"
        />
      </div>

      {/* Orbiting logos: the ring spins, each chip counter-spins to stay upright */}
      <div className="orbit-spin absolute inset-0" aria-hidden>
        {techs.map((tech, i) => {
          const angle = (360 / techs.length) * i;
          return (
            <div
              key={tech.icon}
              className="absolute top-1/2 left-1/2"
              style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(46cqw) rotate(${-angle}deg)` }}
            >
              <div
                title={tech.name}
                className="orbit-counter grid size-[11cqw] place-items-center rounded-2xl border border-line bg-surface/90 shadow-lg shadow-black/40 backdrop-blur"
              >
                <span
                  className="block size-[55%]"
                  style={
                    {
                      backgroundColor: tech.color,
                      mask: `url(/tech/${tech.icon}.svg) center / contain no-repeat`,
                      WebkitMask: `url(/tech/${tech.icon}.svg) center / contain no-repeat`,
                    } as CSSProperties
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
