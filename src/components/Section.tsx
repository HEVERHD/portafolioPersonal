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
      <p className="font-mono text-xs tracking-widest text-neon uppercase">{eyebrow}</p>
      {title && (
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      )}
      <div className="mt-12">{children}</div>
    </section>
  );
}

export function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((i) => (
        <li key={i} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
          {i}
        </li>
      ))}
    </ul>
  );
}
