"use client";

import { booking, internal, projects, ui } from "@/content";
import { useLang } from "@/lib/i18n";
import { ArrowUpRight, Check } from "./icons";
import { Section, Tags } from "./Section";

export function Work() {
  const { t } = useLang();

  return (
    <Section id="proyectos" eyebrow={t(ui.sections.work)} title={t(ui.sections.workTitle)}>
      {/* Featured: booking product */}
      <article className="grid overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-2">
        <div className="flex flex-col p-6 sm:p-10">
          <p className="font-mono text-xs tracking-widest text-accent uppercase">{t(ui.sections.featured)}</p>
          <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{t(booking.title)}</h3>
          <p className="mt-4 leading-relaxed text-muted">{t(booking.text)}</p>
          <ul className="mt-6 grid gap-2.5 text-sm sm:grid-cols-2">
            {booking.features.map((f) => (
              <li key={f.en} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-neon" />
                {t(f)}
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-line pt-6">
            <p className="text-xs text-muted">{t(ui.liveAt)}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {booking.live.map((l) => (
                <li key={l.url}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-white"
                  >
                    {l.name} <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <Tags items={booking.tags} />
          </div>
        </div>
        <div className="relative min-h-64 bg-surface-2">
          <img
            src={booking.image}
            alt={t(booking.title)}
            width={1200}
            height={750}
            loading="lazy"
            className="absolute inset-0 size-full object-cover object-left-top"
          />
        </div>
      </article>

      {/* Client sites */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden rounded-3xl border border-line bg-surface transition-colors hover:border-accent/50"
          >
            <div className="aspect-[16/10] overflow-hidden bg-surface-2">
              <img
                src={p.image}
                alt={p.name}
                width={1200}
                height={750}
                loading="lazy"
                className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] tracking-wider text-muted uppercase">{t(p.kind)}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold">{p.name}</h3>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:bg-accent">
                  <ArrowUpRight />
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t(p.text)}</p>
              <div className="mt-4">
                <Tags items={p.tags} />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Internal systems: no public screenshots */}
      <p className="mt-14 font-mono text-xs tracking-widest text-muted uppercase">{t(ui.sections.internal)}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {internal.map((s) => (
          <div key={s.name} className="flex items-start justify-between gap-4 rounded-2xl border border-line p-5">
            <div>
              <h3 className="font-display font-semibold">{s.name}</h3>
              <p className="mt-1 text-sm text-muted">{t(s.text)}</p>
            </div>
            {s.url && (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 text-sm text-neon hover:underline"
              >
                {t(ui.code)} <ArrowUpRight className="size-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
