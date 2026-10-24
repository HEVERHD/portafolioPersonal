"use client";

import { contact, ui } from "@/content";
import { useCv, useLang } from "@/lib/i18n";
import { ArrowUpRight, Download, GitHub, LinkedIn, Mail, WhatsApp } from "./icons";
import { Eyebrow } from "./Section";

export function Contact() {
  const { t } = useLang();
  const cv = useCv();
  const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(t(ui.whatsappMsg))}`;

  const channels = [
    { href: wa, label: "WhatsApp", value: contact.whatsappLabel, icon: <WhatsApp />, external: true },
    { href: `mailto:${contact.email}`, label: "Email", value: contact.email, icon: <Mail />, external: false },
    { href: contact.linkedin, label: "LinkedIn", value: "in/hever-gdesing", icon: <LinkedIn />, external: true },
    { href: contact.github, label: "GitHub", value: "HEVERHD", icon: <GitHub />, external: true },
  ];

  return (
    <section id="contacto" className="reveal mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="border-t border-ink pt-5">
        <Eyebrow>{t(ui.sections.contact)}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] font-medium tracking-[-0.02em] text-balance sm:text-7xl">
          {t(ui.sections.contactTitle)}
        </h2>
        <p className="mt-5 max-w-xl text-lg text-muted">{t(ui.sections.contactText)}</p>
      </div>

      {/* Channels as a ruled list, like a colophon */}
      <ul className="mt-12 border-t border-line">
        {channels.map((c) => (
          <li key={c.label}>
            <a
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line py-5 transition-colors hover:text-accent sm:grid-cols-[160px_1fr_auto]"
            >
              <span className="flex items-center gap-3 text-sm text-muted group-hover:text-accent">
                {c.icon}
                {c.label}
              </span>
              <span className="truncate font-display text-xl font-medium sm:text-2xl">{c.value}</span>
              <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </li>
        ))}
      </ul>

      <a
        href={cv}
        download
        className="mt-8 inline-flex items-center gap-2 bg-ink px-5 py-3.5 text-sm font-semibold text-bg transition-colors hover:bg-accent"
      >
        <Download />
        {t(ui.downloadCv)}
      </a>

      <footer className="mt-20 flex flex-col justify-between gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} Hevert Gelis</p>
        <p>{t(ui.footer)}</p>
      </footer>
    </section>
  );
}
