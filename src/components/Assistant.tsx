"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ui } from "@/content";
import { answer } from "@/lib/answers";
import { useLang, useRole } from "@/lib/i18n";
import { Mascot } from "./Mascot";

/**
 * Optional Cloud Run service in /assistant (answers with Claude). Without it, Tinta answers from the
 * portfolio's own data right in the browser (src/lib/answers.ts): no server and no cost.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_ASSISTANT_URL?.replace(/\/$/, "");
const NOTE_KEY = "assistant-note-seen";
const MAX_CHARS = 600;

type Message = { role: "user" | "assistant"; content: string };

/** "https://play.google.com/store/apps/details?id=…" reads as "play.google.com/…"; short links stay whole. */
function shortUrl(url: string) {
  const bare = url.replace(/^https:\/\/(www\.)?/, "");
  return bare.length > 32 ? `${bare.split("/")[0]}/…` : bare;
}

/** Turns plain URLs in an answer into links; everything else stays text, so nothing is rendered as HTML. */
function Linkified({ text }: { text: string }) {
  return text.split(/(https:\/\/[^\s)]+[^\s).,;:!?])/g).map((part, i) =>
    i % 2 ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="break-all underline decoration-terra underline-offset-2 hover:text-terra">
        {shortUrl(part)}
      </a>
    ) : (
      part
    ),
  );
}

/**
 * "Ask my portfolio": Tinta waits in the corner; it opens a small chat that streams answers from the
 * assistant service, grounded on the same data as the site.
 */
export function Assistant() {
  const { lang, t } = useLang();
  const role = useRole();
  const id = useId();
  const [open, setOpen] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // The handwritten note appears once per visit, a moment after the page settles
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(NOTE_KEY) === "1";
    } catch {}
    if (seen) return;
    const timer = setTimeout(() => setShowNote(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, busy]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const toggle = () => {
    setOpen((o) => !o);
    setShowNote(false);
    try {
      sessionStorage.setItem(NOTE_KEY, "1");
    } catch {}
  };

  async function ask(question: string) {
    const q = question.trim().slice(0, MAX_CHARS);
    if (!q || busy) return;
    const history: Message[] = [...messages, { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;

    if (!ENDPOINT) {
      // Local answers are instant; typing them out a few words at a time keeps Tinta feeling alive
      const full = answer(q, lang);
      const words = full.split(/(?<=\s)/);
      let shown = "";
      for (let i = 0; i < words.length; i += 3) {
        if (controller.signal.aborted) return;
        shown += words.slice(i, i + 3).join("");
        setMessages([...history, { role: "assistant", content: shown }]);
        await new Promise((r) => setTimeout(r, 30));
      }
      setBusy(false);
      return;
    }

    try {
      const res = await fetch(`${ENDPOINT}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Only the last turns travel; the service caps the history anyway
        body: JSON.stringify({ messages: history.slice(-11) }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) throw new Error(res.status === 429 ? "rate" : "http");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: answer }]);
      }
      if (!answer.trim()) throw new Error("empty");
    } catch (err) {
      if (controller.signal.aborted) return;
      // Drop the unanswered turn so the history stays user/assistant alternating
      setMessages(messages);
      setInput(q);
      setError(t(err instanceof Error && err.message === "rate" ? ui.assistant.rateLimited : ui.assistant.error));
    } finally {
      setBusy(false);
    }
  }

  const suggestions = role?.questions ?? ui.assistant.suggestions;

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 font-body text-press sm:right-6 sm:bottom-6">
      {open && (
        <section
          id={`${id}-panel`}
          role="dialog"
          aria-labelledby={`${id}-title`}
          onKeyDown={(e) => e.key === "Escape" && toggle()}
          className="flex max-h-[min(36rem,calc(100dvh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col border border-press bg-paper shadow-[6px_6px_0_var(--color-rule)]"
        >
          <header className="flex items-center gap-3 border-b border-rule px-4 py-3">
            <Mascot thinking={busy} className="size-9 shrink-0" />
            <h2 id={`${id}-title`} className="flex-1 font-serif text-lg leading-tight font-medium">
              {t(ui.assistant.title)}
            </h2>
            <button type="button" onClick={toggle} aria-label={t(ui.assistant.close)} className="p-1 text-xl leading-none text-press-muted hover:text-terra">
              ×
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-[15px] leading-relaxed" aria-live="polite">
            <p className="text-press-muted">{t(ui.assistant.intro)}</p>

            {messages.length === 0 && (
              <ul className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <li key={s.es}>
                    <button
                      type="button"
                      onClick={() => ask(t(s))}
                      className="border border-rule px-3 py-1.5 text-left text-sm transition-colors hover:border-press"
                    >
                      {t(s)}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {messages.map((m, i) =>
              m.role === "user" ? (
                <p key={i} className="ml-auto w-fit max-w-[85%] bg-paper-2 px-3 py-2">
                  {m.content}
                </p>
              ) : (
                <p key={i} className="max-w-[95%] whitespace-pre-line">
                  {m.content ? <Linkified text={m.content} /> : <span className="text-press-muted italic">{t(ui.assistant.thinking)}</span>}
                </p>
              ),
            )}

            {error && <p className="border-l-2 border-terra pl-3 text-sm text-press-muted">{error}</p>}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="border-t border-rule p-3"
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    ask(input);
                  }
                }}
                rows={1}
                maxLength={MAX_CHARS}
                placeholder={t(ui.assistant.placeholder)}
                aria-label={t(ui.assistant.placeholder)}
                className="max-h-28 min-h-10 flex-1 resize-none border border-rule bg-transparent px-3 py-2 text-[15px] focus:border-press focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="bg-press px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-terra disabled:opacity-40 disabled:hover:bg-press"
              >
                {t(ui.assistant.send)}
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-snug text-press-muted">{t(ENDPOINT ? ui.assistant.disclaimer : ui.assistant.disclaimerLocal)}</p>
          </form>
        </section>
      )}

      <div className="flex items-end gap-1">
        {showNote && !open && (
          <span className="mb-10 -rotate-6 font-hand text-xl leading-none text-terra" aria-hidden>
            {t(ui.assistant.note)}
          </span>
        )}
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={open ? `${id}-panel` : undefined}
          aria-label={t(open ? ui.assistant.close : ui.assistant.open)}
          title={t(ui.assistant.open)}
          className="grid size-16 place-items-center rounded-full border border-press bg-paper shadow-[3px_3px_0_var(--color-rule)] transition-transform hover:-translate-y-0.5"
        >
          <Mascot thinking={busy} className="size-11" />
        </button>
      </div>
    </div>
  );
}
