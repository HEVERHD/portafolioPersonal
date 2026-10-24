"use client";

import { brands, contact, ui } from "@/content";
import images from "@/data/images.json";
import { useCv, useLang, useRole } from "@/lib/i18n";
import { pagePath } from "@/roles";
import { ArrowUpRight, Download, WhatsApp } from "./icons";
import { NowLine } from "./NowLine";
import { Picture } from "./Picture";

export function Hero() {
  const { lang, t } = useLang();
  const role = useRole();
  const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(t(ui.whatsappMsg))}`;
  // Role pages swap the headline and pitch; the rest of the hero stays the same
  const copy = role ?? ui.hero;
  const cv = useCv();

  return (
    <section className="bg-paper font-body text-press">
      <div className="mx-auto max-w-6xl px-4 pt-28 pb-14 sm:px-6 sm:pt-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-7">
            {role && (
              <p className="mb-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-y border-rule py-2.5 text-sm">
                <span className="text-press-muted">
                  {t(ui.role.banner)} <span className="font-semibold text-press">{t(role.label)}</span>
                </span>
                <a href={pagePath(lang)} className="border-b border-press-muted text-press-muted transition-colors hover:border-terra hover:text-terra">
                  {t(ui.role.full)}
                </a>
              </p>
            )}

            {/* The page's h1 carries the name and role for search engines; the big line below is the visual headline */}
            <h1 className="flex items-center gap-3 text-sm font-normal text-press-muted">
              <span className="h-px w-8 shrink-0 bg-terra" />
              <span>
                <span className="font-semibold text-press">Hevert Gelis</span> · {t(copy.eyebrow)}
              </span>
            </h1>

            <p className="mt-6 font-serif text-[2.9rem] leading-[1.02] font-medium tracking-[-0.02em] text-balance sm:text-7xl">
              {t(copy.headline)}{" "}
              <em className="font-normal text-terra">{t(copy.headlineAccent)}</em>
            </p>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-press-muted">{t(copy.pitch)}</p>

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
                href={cv}
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
            <div className="border border-rule bg-paper-2 p-2.5">
              {/* The page's largest element: served first and in AVIF/WebP */}
              <Picture
                src="/hevert-studio.jpg"
                widths={[480, 720, 900]}
                sizes="(min-width: 1024px) 440px, (min-width: 640px) 384px, 90vw"
                alt="Hevert Gelis en su estudio"
                width={900}
                height={1350}
                className="aspect-[4/5] w-full object-cover object-[50%_20%]"
                priority
              />
            </div>
            <figcaption className="mt-3 text-right text-xs text-press-muted">{t(ui.hero.location)}</figcaption>
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
                  src={b.logo.replace(/^\/brands\/(.+)\.png$/, "/img/$1.webp")}
                  alt={b.name}
                  title={b.name}
                  // Intrinsic size lets the browser reserve the space before the logo loads
                  width={images.logos[b.logo as keyof typeof images.logos]?.width}
                  height={images.logos[b.logo as keyof typeof images.logos]?.height}
                  loading="lazy"
                  decoding="async"
                  style={{ height: `calc(clamp(22px, 2.2vw, 30px) * ${b.scale})` }}
                  className="w-auto max-w-none opacity-70 brightness-0 transition-opacity hover:opacity-100 dark:invert"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
