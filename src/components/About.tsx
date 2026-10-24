"use client";

import { about, ui } from "@/content";
import { useLang } from "@/lib/i18n";
import { Picture } from "./Picture";
import { Section } from "./Section";

export function About() {
  const { t } = useLang();

  return (
    <Section id="sobre-mi" eyebrow={t(ui.sections.about)}>
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,340px)_1fr] md:gap-16">
        {/* Same printed frame as the hero portrait */}
        <div className="w-full max-w-sm border border-line bg-surface-2 p-2.5">
          <Picture
            src="/hevert-pro.jpg"
            widths={[480, 720, 900]}
            sizes="(min-width: 768px) 340px, 90vw"
            alt="Hevert Gelis"
            width={900}
            height={1350}
            className="aspect-[4/5] w-full object-cover object-top"
          />
        </div>
        <div>
          <p className="font-display text-2xl leading-snug font-normal sm:text-[2rem] sm:leading-[1.3]">{t(about.text)}</p>

          <div className="mt-12 grid gap-10 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold">{t(ui.sections.education)}</p>
              <ul className="mt-4 space-y-4">
                {about.education.map((e) => (
                  <li key={e.place}>
                    <p className="font-display text-lg font-medium">{t(e.title)}</p>
                    <p className="text-sm text-muted">
                      {e.place}
                      {"status" in e && e.status && <span className="ml-2 text-accent italic">· {t(e.status)}</span>}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">{t(ui.sections.languages)}</p>
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
