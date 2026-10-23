"use client";

import { brands, contact, ui } from "@/content";
import { useLang } from "@/lib/i18n";
import { ArrowUpRight, Download, WhatsApp } from "./icons";
import { NowLine } from "./NowLine";

export function Hero() {
  const { t } = useLang();
  const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(t(ui.whatsappMsg))}`;

  return (
    <section className="bg-paper font-body text-press">
      <div className="mx-auto max-w-6xl px-4 pt-28 pb-14 sm:px-6 sm:pt-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-sm text-press-muted">
              <span className="h-px w-8 bg-terra" />
              {t(ui.hero.eyebrow)}
            </p>

            <h1 className="mt-6 font-serif text-[2.9rem] leading-[1.02] font-medium tracking-[-0.02em] text-balance sm:text-7xl">
              {t(ui.hero.headline)}{" "}
              <em className="font-normal text-terra [font-variation-settings:'SOFT'_100]">{t(ui.hero.headlineAccent)}</em>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-press-muted">{t(ui.hero.pitch)}</p>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-press px-5 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-terra"
              >
                <WhatsApp className="size-4" />
                {t(ui.hero.ctaPrimary)}
              </a>
              <a
                href="#proyectos"
                className="inline-flex items-center gap-1 border-b border-press pb-0.5 text-sm font-semibold transition-colors hover:border-terra hover:text-terra"
              >
                {t(ui.hero.ctaSecondary)} <ArrowUpRight className="size-3.5" />
              </a>
              <a
                href={t(contact.cv)}
                download
                className="inline-flex items-center gap-1.5 border-b border-press pb-0.5 text-sm font-semibold transition-colors hover:border-terra hover:text-terra"
              >
                <Download className="size-3.5" />
                {t(ui.downloadCv)}
              </a>
            </div>

            <div className="mt-8">
              <NowLine />
            </div>
          </div>

          {/* Portrait, printed like a magazine photo with a handwritten note */}
          <figure className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <div className="pointer-events-none absolute -top-9 -left-3 z-10 flex items-end gap-1 text-terra sm:-left-12">
              <span className="font-hand text-2xl leading-none -rotate-6">{t(ui.hero.note)}</span>
              <svg viewBox="0 0 60 44" className="mb-[-14px] h-10 w-14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M3 6c18 0 34 8 44 28" />
                <path d="M38 30l9 5 2-10" />
              </svg>
            </div>
            <div className="border border-rule bg-paper-2 p-2.5 shadow-[0_1px_0_#d6cfbf]">
              <img
                src="/hevert-studio.jpg"
                alt="Hevert Gelis en su estudio"
                width={900}
                height={1350}
                className="aspect-[4/5] w-full object-cover object-[50%_20%]"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-xs text-press-muted">
              <span className="font-serif text-sm italic">{t(ui.hero.photoCaption)}</span>
              <span className="shrink-0">{t(ui.hero.location)}</span>
            </figcaption>
          </figure>
        </div>

        {/* Index of numbers, set like a table of contents */}
        <dl className="mt-16 grid border-t border-press sm:grid-cols-3">
          {ui.hero.stats.map((s, i) => (
            <div
              key={s.value + s.label.en}
              className={`flex items-baseline gap-4 border-b border-rule py-5 sm:border-b-0 sm:py-6 ${i ? "sm:border-l sm:pl-6" : ""}`}
            >
              <dt className="font-serif text-4xl font-medium tracking-tight">{s.value}</dt>
              <dd className="text-sm leading-snug text-press-muted">{t(s.label)}</dd>
            </div>
          ))}
        </dl>

        {/* Clients: static row of logos printed in ink */}
        <div className="mt-12 border-t border-rule pt-6">
          <p className="text-sm text-press-muted">{t(ui.hero.brandsLabel)}</p>
          <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
            {brands.map((b) => (
              <li key={b.name}>
                <img
                  src={b.logo}
                  alt={b.name}
                  title={b.name}
                  style={{ height: `calc(clamp(22px, 2.2vw, 30px) * ${b.scale})` }}
                  className="w-auto max-w-none opacity-70 brightness-0 transition-opacity hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
