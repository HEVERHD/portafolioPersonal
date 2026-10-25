// Builds the site's favicons from public/icon.svg at fixed URLs (search engines want a stable
// address and sizes in multiples of 48px): public/favicon.ico (16, 32, 48) and public/icon-192.png.
// Usage: npm run icons
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const pub = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const svg = readFileSync(join(pub, "icon.svg"));
const png = (size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();

// ICO container holding PNG images (supported by every current browser and by Google)
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(images.length, 4);
let offset = 6 + 16 * images.length;
const entries = images.map((img, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i], 0); // width
  e.writeUInt8(sizes[i], 1); // height
  e.writeUInt16LE(1, 4); // color planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(img.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += img.length;
  return e;
});
writeFileSync(join(pub, "favicon.ico"), Buffer.concat([header, ...entries, ...images]));
writeFileSync(join(pub, "icon-192.png"), await png(192));
console.log("favicon.ico, icon-192.png");
