export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="reveal mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="border-t border-ink pt-5">
        <Eyebrow>{eyebrow}</Eyebrow>
        {title && (
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] font-medium tracking-[-0.02em] text-balance sm:text-6xl">
            {title}
          </h2>
        )}
      </div>
      <div className="mt-12">{children}</div>
    </section>
  );
}

/** Small section label with a terracotta rule, the same as the hero's. */
export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-sm text-muted ${className}`}>
      <span className="h-px w-8 bg-accent" />
      {children}
    </p>
  );
}

export function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
      {items.map((i, n) => (
        <li key={i} className="flex items-center gap-3">
          {n > 0 && <span aria-hidden className="text-line">/</span>}
          {i}
        </li>
      ))}
    </ul>
  );
}
