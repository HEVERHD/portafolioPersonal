"use client";

import { jobs, ui } from "@/content";
import { useLang } from "@/lib/i18n";
import { ArrowUpRight } from "./icons";
import { Section, Tags } from "./Section";

const MONTHS = {
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

export function Experience() {
  const { lang, t } = useLang();
  const fmt = (ym: string) => {
    const [y, m] = ym.split("-").map(Number);
    return `${MONTHS[lang][m - 1]} ${y}`;
  };

  return (
    <Section id="experiencia" eyebrow={t(ui.sections.experience)} title={t(ui.sections.experienceTitle)}>
      <ol className="relative border-l border-line">
        {jobs.map((job, i) => (
          <li key={job.company} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
            <span
              className={`absolute top-1.5 -left-[5px] size-2.5 rounded-full ring-4 ring-bg ${
                i === 0 ? "bg-neon shadow-[0_0_12px] shadow-neon" : "bg-muted/60"
              }`}
            />
            <div className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
              <p className="font-mono text-xs text-muted uppercase md:pt-1">
                {fmt(job.start)} — {job.end ? fmt(job.end) : t(ui.present)}
              </p>
              <div>
                <h3 className="font-display text-xl font-semibold">{t(job.role)}</h3>
                <p className="mt-1 text-sm text-muted">
                  <span className="text-ink">{job.company}</span>
                  {job.client && (
                    <>
                      {" → "}
                      <span className="text-ink">{job.client}</span>
                    </>
                  )}{" "}
                  · {t(job.place)}
                </p>
                <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-muted">
                  {job.points.map((p) => (
                    <li key={p.en} className="flex gap-3">
                      <span className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                      {t(p)}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Tags items={job.tags} />
                </div>
                {job.highlights && (
                  <div className={`mt-6 grid gap-3 ${job.highlights.length > 1 ? "lg:grid-cols-2" : ""}`}>
                    {job.highlights.map((h) => (
                      <a
                        key={h.url}
                        href={h.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-neon/50"
                      >
                        <p className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-neon uppercase">
                          <span className="size-1.5 rounded-full bg-wa" />
                          {t(ui.liveApp)}
                        </p>
                        <p className="mt-1.5 font-display text-lg font-semibold">{h.name}</p>
                        <p className="text-xs text-muted">{t(h.meta)}</p>
                        <p className="mt-2 flex-1 text-sm text-muted">{t(h.text)}</p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-neon">
                          {t(h.cta ?? ui.googlePlay)}
                          <ArrowUpRight className="size-3.5" />
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
