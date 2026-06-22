/**
 * Generates favicons, the apple-touch-icon, and PWA icons from public/logodark.png,
 * and converts the in-page screenshots to WebP.
 *
 * The logo is a light mark on transparency, so every icon is composited onto the
 * brand-dark background (#0d0d10) — otherwise it would vanish on a white tab or
 * turn into a black square as an iOS home-screen icon. Run after brand changes:
 *   npm run icons
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUB = path.join(ROOT, "public");
const BG = "#0d0d10";

const logo = path.join(PUB, "logodark.png");

/** Square icon: dark background + logo centered at ~72% (within maskable safe zone). */
async function icon(size, out) {
  const inner = Math.round(size * 0.72);
  const mark = await sharp(logo).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const buf = await sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toBuffer();
  if (out) await writeFile(path.join(PUB, out), buf);
  return buf;
}

// --- Icons ---
await icon(16, "favicon-16.png");
await icon(32, "favicon-32.png");
await icon(180, "apple-touch-icon.png"); // iOS home screen
await icon(192, "icon-192.png"); // PWA
await icon(512, "icon-512.png"); // PWA + maskable
const ico = await pngToIco([await icon(32), await icon(48)]);
await writeFile(path.join(PUB, "favicon.ico"), ico);
console.log("[icons] wrote favicon.ico, favicon-16/32, apple-touch-icon, icon-192/512");

// --- Screenshots → WebP (quality 82) ---
const SCREENS = [
  "session-xp",
  "desktop-home",
  "followers",
  "tablet-goals",
  "desktop-profile",
  "feed-post",
];
for (const name of SCREENS) {
  const src = path.join(PUB, "screens", `${name}.png`);
  const out = path.join(PUB, "screens", `${name}.webp`);
  const info = await sharp(src).webp({ quality: 82 }).toFile(out);
  const before = (await readFile(src)).length;
  console.log(`[webp] ${name}: ${(before / 1024 | 0)}KB → ${(info.size / 1024 | 0)}KB`);
}
