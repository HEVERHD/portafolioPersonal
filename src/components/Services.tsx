"use client";

import { services, stack, ui } from "@/content";
import { useLang } from "@/lib/i18n";
import { Section } from "./Section";

export function Services() {
  const { t } = useLang();

  return (
    <Section id="servicios" eyebrow={t(ui.sections.services)} title={t(ui.sections.servicesTitle)}>
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((s, i) => (
          <article key={s.title.en} className="rounded-3xl border border-line bg-surface p-7">
            <span className="font-mono text-sm text-accent">0{i + 1}</span>
            <h3 className="mt-6 font-display text-xl font-semibold">{t(s.title)}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t(s.text)}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((g) => (
          <div key={g.group.en}>
            <p className="font-mono text-xs tracking-widest text-muted uppercase">{t(g.group)}</p>
            <ul className="mt-4 space-y-1.5">
              {g.items.map((i) => (
                <li key={i} className="font-display text-lg">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
