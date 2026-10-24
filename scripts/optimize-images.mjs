// Generates responsive AVIF/WebP copies of the site's photos and screenshots in public/img, plus
// src/data/images.json with the intrinsic size of each logo. Originals stay untouched (they are
// still used for Open Graph and JSON-LD). Uses sharp, which ships with Next.js.
// Usage: npm run images   (re-run after replacing any source image)
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const out = join(pub, "img");
mkdirSync(out, { recursive: true });

// Source image (relative to public) → widths to generate
const PHOTOS = {
  "hevert-studio.jpg": [480, 720, 900],
  "hevert-pro.jpg": [480, 720, 900],
  "reel/poster.jpg": [800, 1280],
  "reel/poster-en.jpg": [800, 1280],
  ...Object.fromEntries(
    readdirSync(join(pub, "projects"))
      .filter((f) => f.endsWith(".jpg"))
      .map((f) => [`projects/${f}`, [600, 1200]]),
  ),
};

for (const [src, widths] of Object.entries(PHOTOS)) {
  const name = basename(src, extname(src));
  for (const w of widths) {
    const img = sharp(join(pub, src)).resize({ width: w, withoutEnlargement: true });
    await img.clone().avif({ quality: 50 }).toFile(join(out, `${name}-${w}.avif`));
    await img.clone().webp({ quality: 75 }).toFile(join(out, `${name}-${w}.webp`));
  }
  console.log(`${src}: ${widths.join(", ")}`);
}

// Client logos: WebP copies and their intrinsic size, so the page reserves their space
const logos = {};
for (const f of readdirSync(join(pub, "brands")).filter((f) => f.endsWith(".png"))) {
  const input = sharp(join(pub, "brands", f));
  const { width, height } = await input.metadata();
  await input.webp({ quality: 90, alphaQuality: 100 }).toFile(join(out, `${basename(f, ".png")}.webp`));
  logos[`/brands/${f}`] = { width, height };
}

writeFileSync(join(root, "src", "data", "images.json"), JSON.stringify({ logos }, null, 2) + "\n");
console.log(`logos: ${Object.keys(logos).length}`);
