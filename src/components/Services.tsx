"use client";

import type { CSSProperties, JSX } from "react";
import { skills, stack, ui, type Skill, type StackGroup, type Tech } from "@/content";
import { useLang, useRole } from "@/lib/i18n";
import { byRole } from "@/roles";
import { IconBackend, IconFrontend, IconMobile, IconStore } from "./icons";
import { Eyebrow, Section } from "./Section";

const mask = (icon: string): CSSProperties => ({
  mask: `url(/tech/${icon}.svg) center / contain no-repeat`,
  WebkitMask: `url(/tech/${icon}.svg) center / contain no-repeat`,
});

/** Monochrome brand marks (pure white or black, like Next.js) would vanish on one of the themes. */
function isMonochrome(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.9 || luminance < 0.08;
}

/** Technology with its brand-colored logo; the underline takes the brand color on hover (.tech-chip). */
function TechChip({ tech, large }: { tech: Tech; large?: boolean }) {
  const size = large ? "size-5" : "size-4";
  // Monochrome marks are printed in ink so they read on paper by day and by night
  const logoColor = isMonochrome(tech.color) ? "currentColor" : tech.color;
  return (
    <li
      className={`tech-chip inline-flex items-center gap-2 border-b border-transparent pb-0.5 text-ink/90 transition-colors ${
        large ? "text-[15px] font-medium" : "text-sm"
      }`}
      style={{ "--c": logoColor } as CSSProperties}
    >
      {tech.icon ? (
        <span aria-hidden className={`block shrink-0 ${size}`} style={{ backgroundColor: logoColor, ...mask(tech.icon) }} />
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

/** One row of the stack, set like a table of contents: group on the left, tools on the right. */
function StackRow({ group }: { group: StackGroup }) {
  const { t } = useLang();
  const featured = group.id === "frontend";

  return (
    <div className="grid gap-4 border-b border-line py-6 md:grid-cols-[220px_1fr] md:gap-10">
      <div>
        <h3 className="font-display text-xl font-medium tracking-tight">{t(group.group)}</h3>
        {featured && <p className="mt-1 text-xs font-medium text-accent">{t(ui.stackCard.core)}</p>}
      </div>
      <div>
        <ul className={`flex flex-wrap ${featured ? "gap-x-6 gap-y-3" : "gap-x-5 gap-y-2.5"}`}>
          {group.items.map((tech) => (
            <TechChip key={tech.name} tech={tech} large={featured} />
          ))}
        </ul>
        {featured && (
          <p className="mt-4 flex items-center gap-3 text-sm text-muted">
            <span className="flex gap-1.5">
              {["apple", "googleplay"].map((icon) => (
                <span key={icon} aria-hidden className="block size-4 bg-ink" style={mask(icon)} />
              ))}
            </span>
            {t(ui.stackCard.mobile)}
          </p>
        )}
      </div>
    </div>
  );
}

const SKILL_ICONS: Record<Skill["id"], (p: { className?: string }) => JSX.Element> = {
  frontend: IconFrontend,
  mobile: IconMobile,
  ecommerce: IconStore,
  backend: IconBackend,
};

/** Specialty as a numbered entry, like a chapter in a printed index. */
function SkillEntry({ skill, index }: { skill: Skill; index: number }) {
  const { t } = useLang();
  const Icon = SKILL_ICONS[skill.id];

  return (
    <article className="border-t border-line pt-6">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-display text-sm text-accent tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        <Icon className="size-5 text-muted" />
      </div>
      <h3 className="mt-3 font-display text-3xl font-medium tracking-tight">{t(skill.title)}</h3>
      <p className="mt-1 text-sm text-muted">{skill.tech}</p>
      <p className="mt-4 leading-relaxed text-muted">{t(skill.text)}</p>
      <p className="mt-4 text-sm">
        <span className="text-muted">{t(ui.stackCard.proof)} </span>
        {skill.proof.join(", ")}
      </p>
    </article>
  );
}

export function Services() {
  const { t } = useLang();
  const role = useRole();

  return (
    <Section id="servicios" eyebrow={t(ui.sections.services)} title={t(ui.sections.servicesTitle)}>
      <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
        {byRole(skills, role?.skills, (s) => s.id).map((s, i) => (
          <SkillEntry key={s.id} skill={s} index={i} />
        ))}
      </div>

      <Eyebrow className="mt-24">{t(ui.sections.stack)}</Eyebrow>
      <div className="mt-6 border-t border-ink">
        {stack.map((g) => (
          <StackRow key={g.id} group={g} />
        ))}
      </div>
    </Section>
  );
}
