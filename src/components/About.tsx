"use client";

import { about, ui } from "@/content";
import { useLang } from "@/lib/i18n";
import { Section } from "./Section";

export function About() {
  const { t } = useLang();

  return (
    <Section id="sobre-mi" eyebrow={t(ui.sections.about)}>
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,340px)_1fr] md:gap-16">
        <img
          src="/hevert-pro.jpg"
          alt="Hevert Gelis"
          width={900}
          height={1350}
          loading="lazy"
          className="aspect-[4/5] w-full max-w-sm rounded-3xl object-cover object-top"
        />
        <div>
          <p className="font-display text-2xl leading-snug sm:text-3xl">{t(about.text)}</p>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="font-mono text-xs tracking-widest text-neon uppercase">{t(ui.sections.education)}</p>
              <ul className="mt-4 space-y-4">
                {about.education.map((e) => (
                  <li key={e.place}>
                    <p className="font-semibold">{t(e.title)}</p>
                    <p className="text-sm text-muted">
                      {e.place}
                      {"status" in e && e.status && (
                        <span className="ml-2 rounded-full border border-neon/40 px-2 py-0.5 font-mono text-[10px] text-neon">
                          {t(e.status)}
                        </span>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-neon uppercase">{t(ui.sections.languages)}</p>
              <ul className="mt-4 space-y-2 text-muted">
                {about.languages.map((l) => (
                  <li key={l.en}>{t(l)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
