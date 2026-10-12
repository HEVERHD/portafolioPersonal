"use client";

import { useEffect, useRef, useState } from "react";
import { categories, projects, ui, type Category, type Project } from "@/content";
import { useLang } from "@/lib/i18n";
import { ArrowUpRight, Check } from "./icons";
import { Section, Tags } from "./Section";

/** Phone mockup. `hoverScroll` pans the page on parent hover; `scrollable` lets the visitor scroll it. */
function PhoneFrame({ src, alt, hoverScroll, scrollable, className = "" }: {
  src: string;
  alt: string;
  hoverScroll?: boolean;
  scrollable?: boolean;
  className?: string;
}) {
  return (
    <div className={`rounded-[1.6rem] bg-gradient-to-br from-[#2a2a3a] to-[#0d0d14] p-[5px] shadow-2xl shadow-black/60 ring-1 ring-white/10 ${className}`}>
      <div
        className={`relative aspect-[390/844] overflow-hidden rounded-[1.3rem] bg-black ${scrollable ? "overflow-y-auto overscroll-contain [scrollbar-width:none]" : ""}`}
        tabIndex={scrollable ? 0 : undefined}
        aria-label={scrollable ? alt : undefined}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={
            scrollable
              ? "block w-full"
              : `size-full object-cover object-top ${hoverScroll ? "transition-[object-position] duration-[6000ms] ease-in-out group-hover:object-bottom" : ""}`
          }
        />
      </div>
    </div>
  );
}

function LiveLinks({ project }: { project: Project }) {
  const { t } = useLang();
  if (!project.live) return null;
  return (
    <div>
      <p className="text-xs text-muted">{t(ui.liveAt)}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {project.live.map((l) => (
          <li key={l.url}>
            <a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-white"
            >
              {l.name} <ArrowUpRight className="size-3.5" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const { t } = useLang();
  const featured = project.featured;

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border border-line bg-surface transition-colors hover:border-accent/50 ${
        featured ? "md:col-span-2 md:grid md:grid-cols-[1fr_1.15fr]" : ""
      }`}
    >
      {/* Media: desktop capture with the phone version on top */}
      <div className={`relative overflow-hidden bg-surface-2 ${featured ? "md:order-2 md:min-h-full" : ""}`}>
        <img
          src={project.desktop}
          alt={project.name}
          width={1200}
          height={750}
          loading="lazy"
          className={`w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] ${
            featured ? "aspect-[16/10] md:absolute md:inset-0 md:aspect-auto md:size-full" : "aspect-[16/10]"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
        {project.mobile && (
          <PhoneFrame
            src={project.mobile}
            alt={`${project.name} móvil`}
            hoverScroll
            className={`absolute right-[5%] bottom-[-18%] w-[24%] transition-transform duration-500 group-hover:-translate-y-[8%] ${
              featured ? "md:bottom-[6%] md:w-[26%]" : ""
            }`}
          />
        )}
      </div>

      <div className="flex flex-col p-6 sm:p-7">
        <p className="font-mono text-[11px] tracking-wider text-neon uppercase">{t(project.kind)}</p>
        <h3 className={`mt-1.5 font-display font-semibold ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>{project.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{t(project.summary)}</p>

        {featured && (
          <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
            {project.features.slice(0, 4).map((f) => (
              <li key={f.en} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-neon" />
                {t(f)}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5">
          <Tags items={project.tags} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
          <button
            onClick={onOpen}
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bg transition-transform after:absolute after:inset-0 after:content-[''] hover:-translate-y-0.5"
          >
            {t(ui.work.details)}
          </button>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
            >
              {t(ui.visit)} <ArrowUpRight className="size-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function InternalCard({ project }: { project: Project }) {
  const { t } = useLang();
  return (
    <article className="flex flex-col rounded-3xl border border-dashed border-line p-6">
      <p className="font-mono text-[11px] tracking-wider text-muted uppercase">{t(project.kind)}</p>
      <h3 className="mt-1.5 font-display text-xl font-semibold">{project.name}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{t(project.summary)}</p>
      <div className="mt-4 flex items-center justify-between gap-4">
        <Tags items={project.tags} />
        {project.codeUrl && (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 text-sm text-neon hover:underline"
          >
            {t(ui.code)} <ArrowUpRight className="size-3.5" />
          </a>
        )}
      </div>
      <p className="mt-4 text-xs text-muted/70">{t(ui.work.privateNote)}</p>
    </article>
  );
}

function ProjectDialog({ list, index, onClose, onNavigate }: {
  list: Project[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const { t } = useLang();
  const ref = useRef<HTMLDialogElement>(null);
  const project = index === null ? null : list[index];

  // React state is the source of truth; the native close/cancel events are not relied on.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project) {
      if (!dialog.open) dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else {
      if (dialog.open) dialog.close();
      document.documentElement.style.overflow = "";
    }
  }, [project]);

  // Never leave the page scroll-locked if the dialog unmounts while open.
  useEffect(() => () => void (document.documentElement.style.overflow = ""), []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % list.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, list.length, onNavigate, onClose]);

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto max-h-[92vh] w-[min(1100px,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-line bg-surface p-0 text-ink shadow-2xl backdrop:bg-bg/80 backdrop:backdrop-blur-sm"
      aria-labelledby="project-dialog-title"
    >
      {project && (
        <div className="grid max-h-[92vh] overflow-y-auto md:grid-cols-[1.4fr_1fr] md:overflow-hidden">
          {/* Media */}
          <div className="relative flex items-center justify-center gap-6 bg-surface-2 p-6 md:p-8">
            {project.desktop && (
              <img
                src={project.desktop}
                alt={project.name}
                className="hidden w-[68%] rounded-xl shadow-2xl shadow-black/50 ring-1 ring-white/10 sm:block"
              />
            )}
            {project.mobile && (
              <div className="w-[48%] max-w-[230px] sm:w-[30%]">
                <PhoneFrame key={project.id} src={project.mobile} alt={`${project.name}: ${t(ui.work.mobileHint)}`} scrollable />
                <p className="mt-3 text-center text-[11px] leading-snug text-muted">↕ {t(ui.work.mobileHint)}</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col p-6 md:max-h-[92vh] md:overflow-y-auto md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-wider text-neon uppercase">{t(project.kind)}</p>
                <h3 id="project-dialog-title" className="mt-1.5 font-display text-2xl font-bold sm:text-3xl">
                  {project.name}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label={t(ui.work.close)}
                className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-lg leading-none text-muted transition-colors hover:text-ink"
              >
                ×
              </button>
            </div>

            <p className="mt-4 leading-relaxed text-muted">{t(project.summary)}</p>

            {project.features.length > 0 && (
              <>
                <p className="mt-6 font-mono text-xs tracking-widest text-muted uppercase">{t(ui.work.features)}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {project.features.map((f) => (
                    <li key={f.en} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-neon" />
                      {t(f)}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <p className="mt-6 font-mono text-xs tracking-widest text-muted uppercase">{t(ui.work.stack)}</p>
            <div className="mt-3">
              <Tags items={project.tags} />
            </div>

            <div className="mt-6 space-y-4">
              <LiveLinks project={project} />
              {project.url && !project.live && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
                >
                  {t(ui.visit)} <ArrowUpRight />
                </a>
              )}
            </div>

            {list.length > 1 && (
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-5 [margin-top:max(2rem,auto)]">
                <button
                  onClick={() => onNavigate((index! - 1 + list.length) % list.length)}
                  aria-label={t(ui.work.prev)}
                  className="rounded-full border border-line px-4 py-2 text-sm whitespace-nowrap text-muted transition-colors hover:text-ink"
                >
                  ← {t(ui.work.prevShort)}
                </button>
                <span className="font-mono text-xs text-muted">
                  {index! + 1} / {list.length}
                </span>
                <button
                  onClick={() => onNavigate((index! + 1) % list.length)}
                  aria-label={t(ui.work.next)}
                  className="rounded-full border border-line px-4 py-2 text-sm whitespace-nowrap text-muted transition-colors hover:text-ink"
                >
                  {t(ui.work.nextShort)} →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}

export function Work() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Category | "all">("all");
  const [open, setOpen] = useState<number | null>(null);

  const visible = projects.filter((p) => filter === "all" || p.category === filter);
  const showcase = visible.filter((p) => p.category !== "internal");
  const internal = visible.filter((p) => p.category === "internal");
  const count = (id: Category | "all") =>
    id === "all" ? projects.length : projects.filter((p) => p.category === id).length;

  return (
    <Section id="proyectos" eyebrow={t(ui.sections.work)} title={t(ui.sections.workTitle)}>
      {/* Filters */}
      <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2" role="group" aria-label={t(ui.sections.work)}>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              aria-pressed={filter === c.id}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                filter === c.id
                  ? "border-ink bg-ink text-bg"
                  : "border-line text-muted hover:border-white/20 hover:text-ink"
              }`}
            >
              {t(c.label)}
              <span className={`font-mono text-[11px] ${filter === c.id ? "text-bg/60" : "text-muted/60"}`}>{count(c.id)}</span>
            </button>
          ))}
        </div>
      </div>

      {showcase.length > 0 && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {showcase.map((p, i) => (
            <ProjectCard key={p.id} project={p} onOpen={() => setOpen(i)} />
          ))}
        </div>
      )}

      {internal.length > 0 && (
        <>
          {filter === "all" && (
            <p className="mt-14 font-mono text-xs tracking-widest text-muted uppercase">{t(ui.sections.internal)}</p>
          )}
          <div className={`grid gap-4 sm:grid-cols-2 ${filter === "all" ? "mt-4" : "mt-8"}`}>
            {internal.map((p) => (
              <InternalCard key={p.id} project={p} />
            ))}
          </div>
        </>
      )}

      <ProjectDialog list={showcase} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </Section>
  );
}
