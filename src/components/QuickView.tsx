"use client";

import { useEffect, useRef } from "react";
import { about, brands, contact, stack, ui } from "@/content";
import { useLang } from "@/lib/i18n";
import { Download, GitHub, LinkedIn, Mail, WhatsApp } from "./icons";
import { Eyebrow } from "./Section";

/** Recruiter view: the whole profile on one screen, opened from the navbar. */
export function QuickView({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang();
  const ref = useRef<HTMLDialogElement>(null);
  const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(t(ui.whatsappMsg))}`;
  const core = stack.find((g) => g.id === "frontend")?.items.map((i) => i.name) ?? [];

  // React state is the source of truth; the native dialog just follows it.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => () => void (document.documentElement.style.overflow = ""), []);

  const rows: [string, React.ReactNode][] = [
    [t(ui.quick.rows.role), t(ui.quick.role)],
    [t(ui.quick.rows.experience), t(ui.quick.experience)],
    [t(ui.quick.rows.clients), brands.map((b) => b.name).join(", ")],
    [t(ui.quick.rows.stack), core.join(", ")],
    [t(ui.quick.rows.location), t(ui.quick.location)],
    [t(ui.quick.rows.languages), about.languages.map((l) => t(l)).join(" · ")],
    [
      t(ui.quick.rows.availability),
      <span key="a" className="inline-flex items-center gap-2">
        <span className="size-2 rounded-full bg-wa" />
        {t(ui.quick.availability)}
      </span>,
    ],
  ];

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="quick-view-title"
      className="m-auto max-h-[92vh] w-[min(760px,calc(100vw-2rem))] overflow-y-auto border border-ink bg-surface p-0 text-ink shadow-2xl backdrop:bg-ink/40"
    >
      <div className="p-6 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Eyebrow>{t(ui.quick.trigger)}</Eyebrow>
            <h2 id="quick-view-title" className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
              {t(ui.quick.title)}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label={t(ui.work.close)}
            className="grid size-9 shrink-0 place-items-center border border-line text-lg leading-none text-muted transition-colors hover:border-ink hover:text-ink"
          >
            ×
          </button>
        </div>

        <dl className="mt-8 border-t border-ink">
          {rows.map(([label, value]) => (
            <div key={label} className="grid gap-1 border-b border-line py-3.5 sm:grid-cols-[170px_1fr] sm:gap-6">
              <dt className="text-sm text-muted">{label}</dt>
              <dd className="text-[15px]">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={t(contact.cv)}
            download
            className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent"
          >
            <Download />
            {t(ui.downloadCv)}
          </a>
          {[
            { href: wa, label: "WhatsApp", icon: <WhatsApp className="size-4" />, external: true },
            { href: `mailto:${contact.email}`, label: "Email", icon: <Mail className="size-4" />, external: false },
            { href: contact.linkedin, label: "LinkedIn", icon: <LinkedIn className="size-4" />, external: true },
            { href: contact.github, label: "GitHub", icon: <GitHub className="size-4" />, external: true },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-1.5 border-b border-ink pb-0.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              {c.icon}
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </dialog>
  );
}
