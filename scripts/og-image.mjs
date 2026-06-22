/**
 * Generates the 1200×630 social share image at public/og.png.
 * Run once (committed to the repo); re-run after brand/copy changes:
 *   node scripts/og-image.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const logo = await readFile(path.join(ROOT, "public/logodark.png"));
const logoUri = `data:image/png;base64,${logo.toString("base64")}`;

const ASPECTS = [
  ["Physique", "#8d2e2e"],
  ["Energy", "#b8862f"],
  ["Logic", "#713599"],
  ["Creativity", "#357f9e"],
  ["Social", "#31784e"],
];

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #0d0d10;
    font-family: -apple-system, system-ui, "Segoe UI", sans-serif;
    color: #f4f4f5;
    position: relative;
  }
  .wash {
    position: absolute; inset: 0;
    background:
      radial-gradient(60% 55% at 80% 12%, rgba(58,95,224,0.28), transparent 70%),
      radial-gradient(55% 50% at 8% 95%, rgba(113,53,153,0.22), transparent 70%);
  }
  .pad { position: relative; padding: 72px 80px; height: 100%; display: flex; flex-direction: column; }
  .brand { display: flex; align-items: center; gap: 16px; }
  .brand img { width: 56px; height: 56px; }
  .brand span { font-size: 34px; font-weight: 600; letter-spacing: -0.02em; }
  h1 {
    font-family: Georgia, "Times New Roman", serif;
    font-weight: 500; font-size: 76px; line-height: 1.05; letter-spacing: -0.02em;
    margin-top: auto; max-width: 940px;
  }
  p { margin-top: 28px; font-size: 30px; line-height: 1.4; color: #a1a1aa; max-width: 820px; }
  .aspects { margin-top: auto; display: flex; gap: 14px; flex-wrap: wrap; }
  .pill {
    display: flex; align-items: center; gap: 10px;
    border: 1px solid #2a2a30; background: #161619;
    border-radius: 999px; padding: 12px 20px; font-size: 22px; font-weight: 500;
  }
  .dot { width: 14px; height: 14px; border-radius: 50%; }
</style></head><body>
  <div class="wash"></div>
  <div class="pad">
    <div class="brand"><img src="${logoUri}" alt=""><span>LifeXP</span></div>
    <h1>Make your growth impossible to ignore.</h1>
    <p>Turn real effort into XP, levels, and mastery — built on modern habit science.</p>
    <div class="aspects">
      ${ASPECTS.map(([n, c]) => `<div class="pill"><span class="dot" style="background:${c}"></span>${n}</div>`).join("")}
    </div>
  </div>
</body></html>`;

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "networkidle0" });
const out = path.join(ROOT, "public/og.png");
await page.screenshot({ path: out, type: "png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log(`[og-image] wrote ${path.relative(ROOT, out)}`);
