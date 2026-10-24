/**
 * Serves the AVIF/WebP copies made by scripts/optimize-images.mjs (public/img/{name}-{width}.{ext}),
 * falling back to the original file. `src` is the original path, e.g. "/hevert-studio.jpg".
 */
export function Picture({
  src,
  widths,
  sizes,
  alt,
  width,
  height,
  className,
  priority,
}: {
  src: string;
  widths: number[];
  sizes: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** The page's main image: fetched first and never lazy-loaded. */
  priority?: boolean;
}) {
  const name = src.split("/").pop()!.replace(/\.[^.]+$/, "");
  const srcSet = (ext: string) => widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(", ");

  return (
    // display:contents keeps the <img> styled as if <picture> weren't there
    <picture className="contents">
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </picture>
  );
}
