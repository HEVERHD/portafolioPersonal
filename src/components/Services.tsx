"use client";

import type { CSSProperties, JSX } from "react";
import { skills, stack, ui, type Skill, type StackGroup, type Tech } from "@/content";
import { useLang } from "@/lib/i18n";
import { IconBackend, IconFrontend, IconMobile, IconStore } from "./icons";
import { Section } from "./Section";

// Bento placement per group (literal class strings so Tailwind generates them).
const LAYOUT: Record<StackGroup["id"], string> = {
  frontend: "md:col-span-2 lg:col-span-4 lg:row-span-2",
  backend: "lg:col-span-2 lg:row-span-2",
  styling: "lg:col-span-2",
  design: "lg:col-span-4",
  workflow: "md:col-span-2 lg:col-span-6",
};

const mask = (icon: string): CSSProperties => ({
  mask: `url(/tech/${icon}.svg) center / contain no-repeat`,
  WebkitMask: `url(/tech/${icon}.svg) center / contain no-repeat`,
});

/** Technology pill: brand-colored logo, glows in the brand color on hover (see .tech-chip in globals.css). */
function TechChip({ tech, large }: { tech: Tech; large?: boolean }) {
  const size = large ? "size-5" : "size-4";
  return (
    <li
      className={`tech-chip inline-flex items-center gap-2 rounded-full border border-line bg-bg/60 font-medium text-ink/90 transition-all duration-300 hover:-translate-y-0.5 ${
        large ? "px-4 py-2.5 text-[15px]" : "px-3 py-1.5 text-sm"
      }`}
      style={{ "--c": tech.color } as CSSProperties}
    >
      {tech.icon ? (
        <span aria-hidden className={`block shrink-0 ${size}`} style={{ backgroundColor: tech.color, ...mask(tech.icon) }} />
      ) : tech.badge ? (
        <span
          aria-hidden
          className={`grid shrink-0 place-items-center rounded-[4px] font-bold leading-none ${size} ${large ? "text-[10px]" : "text-[9px]"}`}
          style={{ backgroundColor: tech.badge.bg, color: tech.color, boxShadow: `inset 0 0 0 1px ${tech.color}` }}
        >
          {tech.badge.text}
        </span>
      ) : (
        <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ backgroundColor: tech.color }} />
      )}
      {tech.name}
    </li>
  );
}

function StackCard({ group }: { group: StackGroup }) {
  const { t } = useLang();
  const featured = group.id === "frontend";
  const glow = group.items[0].color;

  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-white/15 sm:p-7 ${LAYOUT[group.id]}`}
    >
      {/* Soft glow in the group's lead color */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full opacity-[0.12] blur-3xl"
        style={{ backgroundColor: glow }}
      />
      <div className="relative flex items-center justify-between gap-3">
        <h3 className="font-mono text-xs tracking-widest text-muted uppercase">{t(group.group)}</h3>
        {featured ? (
          <span className="rounded-full border border-neon/40 bg-neon/10 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-neon uppercase">
            ★ {t(ui.stackCard.core)}
          </span>
        ) : (
          <span className="font-mono text-xs text-muted/60">{String(group.items.length).padStart(2, "0")}</span>
        )}
      </div>

      <ul className={`relative mt-5 flex flex-wrap gap-2 ${featured ? "sm:gap-2.5" : ""}`}>
        {group.items.map((tech) => (
          <TechChip key={tech.name} tech={tech} large={featured} />
        ))}
      </ul>

      {featured && (
        <div className="relative mt-auto flex items-center gap-3 border-t border-line pt-5 text-sm text-muted [margin-top:max(1.5rem,auto)]">
          <span className="flex gap-1.5">
            {["apple", "googleplay"].map((icon) => (
              <span key={icon} aria-hidden className="block size-4 bg-ink" style={mask(icon)} />
            ))}
          </span>
          {t(ui.stackCard.mobile)}
        </div>
      )}
    </article>
  );
}

const SKILL_ICONS: Record<Skill["id"], (p: { className?: string }) => JSX.Element> = {
  frontend: IconFrontend,
  mobile: IconMobile,
  ecommerce: IconStore,
  backend: IconBackend,
};

/** Specialty card with a soft glow that follows the pointer (see .spotlight in globals.css). */
function SkillCard({ skill }: { skill: Skill }) {
  const { t } = useLang();
  const Icon = SKILL_ICONS[skill.id];

  return (
    <article
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className="spotlight group relative overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-white/15 sm:p-8"
    >
      {/* Fixed corner glow, like a light source behind the card */}
      <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-accent/25 blur-3xl" />

      <div className="relative flex gap-5 sm:gap-6">
        <div className="relative shrink-0 self-start">
          <div aria-hidden className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon to-accent opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-70" />
          <div className="relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-neon to-accent text-white shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105 sm:size-16">
            <Icon className="size-7 sm:size-8" />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="font-display text-xl font-semibold sm:text-2xl">{t(skill.title)}</h3>
          <p className="mt-1 font-mono text-xs text-neon">{skill.tech}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{t(skill.text)}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {skill.proof.map((p) => (
              <li key={p} className="rounded-full border border-line bg-bg/60 px-2.5 py-0.5 text-[11px] text-ink/80">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function Services() {
  const { t } = useLang();

  return (
    <Section id="servicios" eyebrow={t(ui.sections.services)} title={t(ui.sections.servicesTitle)}>
      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((s) => (
          <SkillCard key={s.id} skill={s} />
        ))}
      </div>

      <p className="mt-20 font-mono text-xs tracking-widest text-neon uppercase">{t(ui.sections.stack)}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {stack.map((g) => (
          <StackCard key={g.id} group={g} />
        ))}
      </div>
    </Section>
  );
}
