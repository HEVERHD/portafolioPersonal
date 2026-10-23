"use client";

import { useEffect, useState } from "react";
import { contact, ui } from "@/content";
import { useLang } from "@/lib/i18n";

const CACHE_KEY = "now:last-commit";
const CACHE_MS = 10 * 60 * 1000;
const GITHUB_USER = contact.github.split("/").pop()!;

type Commit = { repo: string; at: string };

/** Latest public push from the GitHub events API, cached for 10 minutes (the API allows 60 calls/hour per IP). */
async function fetchLastCommit(): Promise<Commit | null> {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? "null");
    if (cached && Date.now() - cached.savedAt < CACHE_MS) return cached.commit;
  } catch {}

  const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=30`);
  if (!res.ok) return null;
  const events: { type: string; repo: { name: string }; created_at: string }[] = await res.json();
  const push = events.find((e) => e.type === "PushEvent");
  const commit = push ? { repo: push.repo.name.split("/").pop()!, at: push.created_at } : null;
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), commit }));
  } catch {}
  return commit;
}

function relative(iso: string, lang: string) {
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  const minutes = Math.round((new Date(iso).getTime() - Date.now()) / 60000);
  if (Math.abs(minutes) < 60) return rtf.format(minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return rtf.format(hours, "hour");
  return rtf.format(Math.round(hours / 24), "day");
}

/** "Right now" line: local time in Bogotá and the last public commit. Rendered after mount only. */
export function NowLine() {
  const { lang, t } = useLang();
  const [now, setNow] = useState<Date | null>(null);
  const [commit, setCommit] = useState<Commit | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    fetchLastCommit()
      .then(setCommit)
      .catch(() => setCommit(null));
    return () => clearInterval(id);
  }, []);

  if (!now) return <p className="h-5" />;

  const time = new Intl.DateTimeFormat(lang === "es" ? "es-CO" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Bogota",
  }).format(now);

  return (
    <p className="flex min-h-5 flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
      <span className="relative flex size-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-wa opacity-50 motion-reduce:hidden" />
        <span className="relative size-2 rounded-full bg-wa" />
      </span>
      <span>
        <span className="text-ink tabular-nums">{time}</span> {t(ui.now.time)}
      </span>
      {commit && (
        <>
          <span aria-hidden className="text-line">/</span>
          <span>
            {t(ui.now.lastCommit)}{" "}
            <a
              href={`${contact.github}/${commit.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-muted text-ink hover:border-accent hover:text-accent"
            >
              {commit.repo}
            </a>
            , {relative(commit.at, lang)}
          </span>
        </>
      )}
    </p>
  );
}
