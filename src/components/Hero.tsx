"use client";

import { brands, contact, ui } from "@/content";
import { useLang } from "@/lib/i18n";
import { WhatsApp } from "./icons";
import { Orbit } from "./Orbit";

export function Hero() {
  const { t } = useLang();
  const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(t(ui.whatsappMsg))}`;

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 right-0 size-[520px] rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 -left-40 size-[420px] rounded-full bg-neon/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <h1 className="font-display text-5xl leading-[0.95] font-bold tracking-tight sm:text-7xl">
            Hevert <span className="text-gradient">Gelis</span>
          </h1>
          <p className="mt-4 font-mono text-sm text-balance text-neon sm:text-base">{t(ui.hero.role)}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t(ui.hero.pitch)}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              <WhatsApp className="size-4" />
              {t(ui.hero.ctaPrimary)}
            </a>
            <a
              href="#proyectos"
              className="inline-flex items-center rounded-full border border-line px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface-2"
            >
              {t(ui.hero.ctaSecondary)}
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
            {ui.hero.stats.map((s) => (
              <div key={s.value + s.label.en}>
                <dt className="font-display text-3xl font-bold">{s.value}</dt>
                <dd className="mt-1 text-xs text-muted">{t(s.label)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto w-full max-w-sm lg:max-w-[460px]">
          <Orbit src="/hevert-studio.jpg" alt="Hevert Gelis en su estudio" />
          <p className="mt-2 text-center font-mono text-xs text-muted">📍 Bogotá · Cartagena, Colombia</p>
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <p className="font-mono text-xs tracking-widest text-muted uppercase">{t(ui.hero.brandsLabel)}</p>
        <ul className="mt-4 flex flex-wrap gap-x-10 gap-y-3">
          {brands.map((b) => (
            <li key={b} className="font-display text-xl font-semibold text-ink/50 sm:text-2xl">
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
