"use client";

import { contact, ui } from "@/content";
import { useLang } from "@/lib/i18n";
import { Download, GitHub, LinkedIn, Mail, WhatsApp } from "./icons";

export function Contact() {
  const { t } = useLang();
  const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(t(ui.whatsappMsg))}`;

  const channels = [
    { href: wa, label: "WhatsApp", value: contact.whatsappLabel, icon: <WhatsApp />, external: true },
    { href: `mailto:${contact.email}`, label: "Email", value: contact.email, icon: <Mail />, external: false },
    { href: contact.linkedin, label: "LinkedIn", value: "in/hever-gdesing", icon: <LinkedIn />, external: true },
    { href: contact.github, label: "GitHub", value: "HEVERHD", icon: <GitHub />, external: true },
  ];

  return (
    <section id="contacto" className="reveal mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-6 sm:p-14">
        <div className="pointer-events-none absolute -top-32 -right-20 size-96 rounded-full bg-accent/25 blur-[100px]" />
        <p className="relative font-mono text-xs tracking-widest text-neon uppercase">{t(ui.sections.contact)}</p>
        <h2 className="relative mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-5xl">
          {t(ui.sections.contactTitle)}
        </h2>
        <p className="relative mt-4 max-w-xl text-muted">{t(ui.sections.contactText)}</p>

        <ul className="relative mt-10 grid gap-3 sm:grid-cols-2">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-4 rounded-2xl border border-line bg-bg/40 p-4 transition-colors hover:border-accent/60 hover:bg-surface-2"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-neon">{c.icon}</span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted">{c.label}</span>
                  <span className="block truncate font-medium">{c.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <a
          href={t(contact.cv)}
          download
          className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
        >
          <Download />
          {t(ui.downloadCv)}
        </a>
      </div>

      <footer className="mt-12 flex flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} Hevert Gelis</p>
        <p>{t(ui.footer)}</p>
      </footer>
    </section>
  );
}
