"use client";

import data from "@/data/lighthouse.json";
import { ui } from "@/content";
import { useLang } from "@/lib/i18n";
import { ArrowUpRight } from "./icons";

type Result = {
  url: string;
  performance: number;
  accessibility: number;
  seo: number;
  bestPractices: number;
  measuredAt: string;
  reportUrl: string;
};

const results = data.results as Record<string, Result | undefined>;

/** Lighthouse's own thresholds: 90+ good, 50–89 needs work, below 50 poor. */
const tone = (score: number) => (score >= 90 ? "bg-[#0c9a4a]" : score >= 50 ? "bg-[#d98a00]" : "bg-[#d0362a]");

/** Real mobile Lighthouse scores for a project, measured by scripts/lighthouse.mjs. Renders nothing without data. */
export function LighthouseScores({ projectId, detailed }: { projectId: string; detailed?: boolean }) {
  const { lang, t } = useLang();
  const r = results[projectId];
  if (!r) return null;

  const scores = [
    [t(ui.lighthouse.performance), r.performance],
    [t(ui.lighthouse.accessibility), r.accessibility],
    [t(ui.lighthouse.seo), r.seo],
  ] as const;
  const date = new Intl.DateTimeFormat(lang === "es" ? "es-CO" : "en-US", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(r.measuredAt),
  );

  return (
    <div className={detailed ? "border-t border-line pt-4" : ""}>
      <dl className="flex flex-wrap gap-x-5 gap-y-1">
        {scores.map(([label, score]) => (
          <div key={label} className="flex items-baseline gap-1.5">
            <span aria-hidden className={`size-2 translate-y-[-1px] rounded-full ${tone(score)}`} />
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="font-display text-lg font-medium tabular-nums">{score}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-1 flex flex-wrap items-center gap-x-3 text-[11px] text-muted">
        <span>
          {t(ui.lighthouse.measured)} {date}
        </span>
        {detailed && (
          <a
            href={r.reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 border-b border-muted hover:border-accent hover:text-accent"
          >
            {t(ui.lighthouse.report)} <ArrowUpRight className="size-3" />
          </a>
        )}
      </p>
    </div>
  );
}
