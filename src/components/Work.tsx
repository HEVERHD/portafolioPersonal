"use client";

import { useEffect, useRef, useState } from "react";
import { categories, projects, ui, type Category, type Project } from "@/content";
import { useLang } from "@/lib/i18n";
import { ArrowUpRight, Check } from "./icons";
import { BookingDemo } from "./BookingDemo";
import { FastStoreDemo } from "./FastStoreDemo";
import { HandNote } from "./HandNote";
import { LighthouseScores } from "./LighthouseScores";
import { Picture } from "./Picture";
import { ProjectIndex } from "./ProjectIndex";
import { Eyebrow, Section, Tags } from "./Section";

/** Phone mockup. `hoverScroll` pans the page on parent hover; `scrollable` lets the visitor scroll it. */
function PhoneFrame({ src, alt, hoverScroll, scrollable, className = "" }: {
  src: string;
  alt: string;
  hoverScroll?: boolean;
  scrollable?: boolean;
  className?: string;
}) {
  return (
    <div className={`rounded-[1.6rem] bg-gradient-to-br from-[#2a2a3a] to-[#0d0d14] p-[5px] shadow-xl shadow-black/25 ${className}`}>
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
      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
        {project.live.map((l) => (
          <li key={l.url}>
            <a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border-b border-ink pb-0.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
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
      className={`group relative overflow-hidden border border-line bg-surface transition-colors hover:border-ink ${
        featured ? "md:col-span-2 md:grid md:grid-cols-[1fr_1.15fr]" : ""
      }`}
    >
      {/* Media: desktop capture with the phone version on top */}
      <div className={`relative overflow-hidden bg-surface-2 ${featured ? "md:order-2 md:min-h-full" : ""}`}>
        <Picture
          src={project.desktop!}
          widths={[600, 1200]}
          sizes={featured ? "(min-width: 768px) 620px, 95vw" : "(min-width: 768px) 540px, 95vw"}
          alt={project.name}
          width={1200}
          height={750}
          className={`w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] ${
            featured ? "aspect-[16/10] md:absolute md:inset-0 md:aspect-auto md:size-full" : "aspect-[16/10]"
          }`}
        />
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
        {/* Handwritten note pointing at the phone mockup */}
        {project.note && project.mobile && (
          <HandNote
            text={t(project.note)}
            className={`absolute right-[29%] bottom-[14%] z-10 ${featured ? "md:right-[32%] md:bottom-[24%]" : ""}`}
          />
        )}
      </div>

      <div className="flex flex-col p-6 sm:p-7">
        <p className="text-xs font-medium text-muted">{t(project.kind)}</p>
        <h3 className={`mt-1.5 font-display font-medium tracking-tight ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{project.name}</h3>
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

        <div className="mt-5 empty:hidden">
          <LighthouseScores projectId={project.id} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
          <button
            onClick={onOpen}
            className="bg-ink px-4 py-2.5 text-sm font-semibold text-bg transition-colors after:absolute after:inset-0 after:content-[''] hover:bg-accent"
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
          {!project.url && project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
            >
              {t(ui.code)} <ArrowUpRight className="size-3.5" />
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
    <article className="flex flex-col border border-dashed border-line p-6">
      <p className="text-xs font-medium text-muted">{t(project.kind)}</p>
      <h3 className="mt-1.5 font-display text-2xl font-medium tracking-tight">{project.name}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{t(project.summary)}</p>
      <div className="mt-4 flex items-center justify-between gap-4">
        <Tags items={project.tags} />
        {project.codeUrl && (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 border-b border-ink pb-0.5 text-sm font-medium hover:border-accent hover:text-accent"
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
      className="m-auto max-h-[92vh] w-[min(1100px,calc(100vw-2rem))] overflow-hidden border border-ink bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/50"
      aria-labelledby="project-dialog-title"
    >
      {project && (
        <div className="grid max-h-[92vh] overflow-y-auto md:grid-cols-[1.4fr_1fr] md:overflow-hidden">
          {/* Media */}
          <div className="relative flex items-center justify-center gap-6 bg-surface-2 p-6 md:p-8">
            {project.desktop && (
              <Picture
                src={project.desktop}
                widths={[600, 1200]}
                sizes="(min-width: 768px) 520px, 60vw"
                alt={project.name}
                width={1200}
                height={750}
                className="hidden h-auto w-[68%] border border-line shadow-lg shadow-black/10 sm:block"
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
                <p className="text-xs font-medium text-muted">{t(project.kind)}</p>
                <h3 id="project-dialog-title" className="mt-1.5 font-display text-3xl font-medium tracking-tight sm:text-4xl">
                  {project.name}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label={t(ui.work.close)}
                className="grid size-9 shrink-0 place-items-center border border-line text-lg leading-none text-muted transition-colors hover:border-ink hover:text-ink"
              >
                ×
              </button>
            </div>

            <p className="mt-4 leading-relaxed text-muted">{t(project.summary)}</p>

            {project.features.length > 0 && (
              <>
                <p className="mt-6 text-sm font-semibold">{t(ui.work.features)}</p>
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

            <p className="mt-6 text-sm font-semibold">{t(ui.work.stack)}</p>
            <div className="mt-3">
              <Tags items={project.tags} />
            </div>

            <div className="mt-6 empty:hidden">
              <LighthouseScores projectId={project.id} detailed />
            </div>

            {project.demo && (
              <div className="mt-6">{project.demo === "faststore" ? <FastStoreDemo /> : <BookingDemo />}</div>
            )}

            <div className="mt-6 space-y-4">
              <LiveLinks project={project} />
              {project.url && !project.live && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent"
                >
                  {t(ui.visit)} <ArrowUpRight />
                </a>
              )}
              {!project.url && project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent"
                >
                  {t(ui.code)} <ArrowUpRight />
                </a>
              )}
            </div>

            {list.length > 1 && (
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-5 [margin-top:max(2rem,auto)]">
                <button
                  onClick={() => onNavigate((index! - 1 + list.length) % list.length)}
                  aria-label={t(ui.work.prev)}
                  className="border border-line px-4 py-2 text-sm whitespace-nowrap text-muted transition-colors hover:border-ink hover:text-ink"
                >
                  ← {t(ui.work.prevShort)}
                </button>
                <span className="font-display text-sm text-muted tabular-nums">
                  {index! + 1} / {list.length}
                </span>
                <button
                  onClick={() => onNavigate((index! + 1) % list.length)}
                  aria-label={t(ui.work.next)}
                  className="border border-line px-4 py-2 text-sm whitespace-nowrap text-muted transition-colors hover:border-ink hover:text-ink"
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
  const [view, setView] = useState<"cards" | "index">("cards");

  const visible = projects.filter((p) => filter === "all" || p.category === filter);
  const showcase = visible.filter((p) => p.category !== "internal");
  const internal = visible.filter((p) => p.category === "internal");
  const count = (id: Category | "all") =>
    id === "all" ? projects.length : projects.filter((p) => p.category === id).length;

  return (
    <Section id="proyectos" eyebrow={t(ui.sections.work)} title={t(ui.sections.workTitle)}>
      {/* Card or index view */}
      <div className="mb-6 flex items-center gap-3 text-sm" role="group" aria-label={t(ui.work.view)}>
        <span className="text-muted">{t(ui.work.view)}:</span>
        {(["cards", "index"] as const).map((v, i) => (
          <span key={v} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden className="text-line">/</span>}
            <button
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={view === v ? "font-semibold text-ink underline decoration-accent underline-offset-4" : "text-muted hover:text-ink"}
            >
              {t(ui.work[v])}
            </button>
          </span>
        ))}
      </div>

      {/* Filters */}
      <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <div className="flex w-max gap-6 border-b border-line" role="group" aria-label={t(ui.sections.work)}>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              aria-pressed={filter === c.id}
              className={`-mb-px inline-flex items-center gap-2 border-b-2 pb-3 text-sm whitespace-nowrap transition-colors ${
                filter === c.id
                  ? "border-accent font-semibold text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {t(c.label)}
              <span className="text-xs text-muted tabular-nums">{count(c.id)}</span>
            </button>
          ))}
        </div>
      </div>

      {view === "index" && (
        <div className="mt-8">
          <ProjectIndex projects={[...showcase, ...internal]} onOpen={(p) => setOpen(showcase.indexOf(p))} />
        </div>
      )}

      {view === "cards" && showcase.length > 0 && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {showcase.map((p, i) => (
            <ProjectCard key={p.id} project={p} onOpen={() => setOpen(i)} />
          ))}
        </div>
      )}

      {view === "cards" && internal.length > 0 && (
        <>
          {filter === "all" && (
            <Eyebrow className="mt-14">{t(ui.sections.internal)}</Eyebrow>
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
