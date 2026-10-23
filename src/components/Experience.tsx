"use client";

import { useEffect, useRef, useState } from "react";
import { jobs, ui, type Job, type Lang } from "@/content";
import { useLang } from "@/lib/i18n";
import { useInView } from "@/lib/useInView";
import { ArrowUpRight } from "./icons";
import { Section, Tags } from "./Section";

const MONTHS = {
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

/** "YYYY-MM" → absolute month index. */
const monthIndex = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};

/** Current month index, read after mount so the static export never bakes in the build date. */
function useNowIndex() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const d = new Date();
    setNow(d.getFullYear() * 12 + d.getMonth());
  }, []);
  return now;
}

/** Inclusive month count, the way LinkedIn shows it (May–Oct = 6 months). */
const jobMonths = (job: Job, now: number) => (job.end ? monthIndex(job.end) : now) - monthIndex(job.start) + 1;

function formatDuration(months: number, lang: Lang) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts =
    lang === "es"
      ? [y && `${y} ${y === 1 ? "año" : "años"}`, m && `${m} ${m === 1 ? "mes" : "meses"}`]
      : [y && `${y} ${y === 1 ? "yr" : "yrs"}`, m && `${m} ${m === 1 ? "mo" : "mos"}`];
  return parts.filter(Boolean).join(" ");
}

/** Time in the role plus a bar showing its share of the whole career, filled on scroll. */
function JobDuration({ job, now, total }: { job: Job; now: number | null; total: number | null }) {
  const { lang, t } = useLang();
  // The observed wrapper must render from the first paint, even before `now` is known.
  const [ref, inView] = useInView<HTMLDivElement>(0.6);
  const months = now === null ? null : jobMonths(job, now);
  const share = months === null || total === null ? 0 : Math.round((months / total) * 100);

  return (
    <div ref={ref} className="mt-4 max-w-[200px]">
      <p className="h-6 font-display text-lg font-medium text-ink">{months !== null && formatDuration(months, lang)}</p>
      <div className="mt-2 h-1 overflow-hidden bg-line">
        <div
          className="h-full origin-left bg-accent transition-transform duration-1000 ease-out motion-reduce:transition-none"
          style={{ width: `${share}%`, transform: `scaleX(${inView && months !== null ? 1 : 0})` }}
        />
      </div>
      <p className="mt-1.5 h-3 text-[11px] text-muted">{months !== null && `${share}% ${t(ui.careerOf)}`}</p>
    </div>
  );
}

/** Store link with the store's logo (Simple Icons, in public/tech). */
function StoreBadge({ href, icon, label, store }: { href: string; icon: string; label: string; store: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 rounded-md bg-ink px-3.5 py-2 transition-colors hover:bg-accent"
    >
      <span
        aria-hidden
        className="block size-5 shrink-0 bg-paper"
        style={{
          mask: `url(/tech/${icon}.svg) center / contain no-repeat`,
          WebkitMask: `url(/tech/${icon}.svg) center / contain no-repeat`,
        }}
      />
      <span className="flex flex-col leading-none">
        <span className="text-[10px] text-paper/70">{label}</span>
        <span className="mt-0.5 text-sm font-semibold text-paper">{store}</span>
      </span>
    </a>
  );
}

/**
 * Scroll-linked progress for the vertical timeline: returns refs for the list, the fill bar and
 * each item, plus which items the fill has reached. The fill height is written straight to the DOM
 * on scroll; React only re-renders when an item turns on or off.
 */
function useTimelineProgress(count: number) {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [reached, setReached] = useState<boolean[]>(() => Array(count).fill(false));

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    // Scroll events already fire at most once per frame, so update directly.
    const update = () => {
      const rect = list.getBoundingClientRect();
      // The line "arrives" at whatever crosses 60% of the viewport height
      const px = Math.max(0, Math.min(rect.height, window.innerHeight * 0.6 - rect.top));
      if (fillRef.current) fillRef.current.style.height = `${px}px`;
      const next = itemRefs.current.map((li) => !!li && li.offsetTop + 8 <= px);
      setReached((prev) => (prev.join() === next.join() ? prev : next));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { listRef, fillRef, itemRefs, reached };
}

export function Experience() {
  const { lang, t } = useLang();
  const now = useNowIndex();
  const { listRef, fillRef, itemRefs, reached } = useTimelineProgress(jobs.length);
  const careerStart = Math.min(...jobs.map((j) => monthIndex(j.start)));
  const total = now === null ? null : now - careerStart + 1;
  const fmt = (ym: string) => {
    const [y, m] = ym.split("-").map(Number);
    return `${MONTHS[lang][m - 1]} ${y}`;
  };

  return (
    <Section id="experiencia" eyebrow={t(ui.sections.experience)} title={t(ui.sections.experienceTitle)}>
      <ol ref={listRef} className="relative border-l border-line">
        {/* Progress fill that grows down the line as you scroll */}
        <div ref={fillRef} aria-hidden className="pointer-events-none absolute top-0 -left-px h-0 w-0.5 bg-accent" />
        {jobs.map((job, i) => (
          <li
            key={job.company}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="relative pb-12 pl-8 last:pb-0 sm:pl-12"
          >
            <span
              className={`absolute top-2 -left-[5px] size-2.5 ring-4 ring-bg transition-colors duration-500 ${
                reached[i] ? "bg-accent" : "bg-line"
              }`}
            />
            <div className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
              <div>
                <p className="text-sm text-muted tabular-nums md:pt-1.5">
                  {fmt(job.start)} — {job.end ? fmt(job.end) : t(ui.present)}
                </p>
                <JobDuration job={job} now={now} total={total} />
              </div>
              <div>
                <h3 className="font-display text-2xl font-medium tracking-tight">{t(job.role)}</h3>
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
                      <div
                        key={h.name}
                        className="flex flex-col border border-line bg-surface p-5 transition-colors hover:border-ink"
                      >
                        <p className="flex items-center gap-2 text-xs font-medium text-muted">
                          <span className="size-1.5 rounded-full bg-wa" />
                          {t(ui.liveApp)}
                        </p>
                        <p className="mt-1.5 font-display text-xl font-medium">{h.name}</p>
                        <p className="text-xs text-muted">{t(h.meta)}</p>
                        <p className="mt-2 flex-1 text-sm text-muted">{t(h.text)}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {h.android && (
                            <StoreBadge href={h.android} icon="googleplay" label={t(ui.stores.getItOn)} store="Google Play" />
                          )}
                          {h.ios && <StoreBadge href={h.ios} icon="apple" label={t(ui.stores.downloadOn)} store="App Store" />}
                          {h.url && (
                            <a
                              href={h.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 border-b border-ink pb-0.5 text-sm font-semibold text-ink hover:border-accent hover:text-accent"
                            >
                              {h.cta && t(h.cta)}
                              <ArrowUpRight className="size-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
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
