// Measures every project with a live URL on PageSpeed Insights (mobile Lighthouse) and writes
// src/data/lighthouse.json, which the project cards read.
// Usage: npm run lighthouse   (PSI_API_KEY from the environment or .env.local, which git ignores)
// A project that fails to measure keeps its previous result, so a bad run never blanks the site.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "../src/content.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "src", "data", "lighthouse.json");
const CATEGORIES = ["performance", "accessibility", "seo", "best-practices"];

const previous = existsSync(outFile) ? JSON.parse(readFileSync(outFile, "utf8")) : { results: {} };
const targets = projects.filter((p) => p.url).map((p) => ({ id: p.id, url: p.url }));

async function measure({ id, url }) {
  const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  api.searchParams.set("url", url);
  api.searchParams.set("strategy", "mobile");
  for (const c of CATEGORIES) api.searchParams.append("category", c);
  if (process.env.PSI_API_KEY) api.searchParams.set("key", process.env.PSI_API_KEY);

  const res = await fetch(api, { signal: AbortSignal.timeout(120_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const { lighthouseResult: lh } = await res.json();
  const score = (c) => Math.round((lh.categories[c]?.score ?? 0) * 100);
  return {
    url,
    performance: score("performance"),
    accessibility: score("accessibility"),
    seo: score("seo"),
    bestPractices: score("best-practices"),
    measuredAt: lh.fetchTime,
    reportUrl: `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(url)}&form_factor=mobile`,
  };
}

const results = { ...previous.results };
// Two at a time: PageSpeed is slow per URL and rate-limits bursts without an API key
for (let i = 0; i < targets.length; i += 2) {
  await Promise.all(
    targets.slice(i, i + 2).map(async (target) => {
      try {
        results[target.id] = await measure(target);
        const r = results[target.id];
        console.log(`${target.id}: perf ${r.performance} · a11y ${r.accessibility} · seo ${r.seo}`);
      } catch (err) {
        console.warn(`${target.id}: ${err.message}${results[target.id] ? " (keeping previous result)" : ""}`);
      }
    }),
  );
}

// Drop projects that no longer have a live URL
for (const id of Object.keys(results)) if (!targets.some((t) => t.id === id)) delete results[id];

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify({ results }, null, 2) + "\n");
console.log(`wrote ${outFile}`);
