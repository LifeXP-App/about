/**
 * Post-build prerender.
 *
 * AI crawlers (GPTBot, ClaudeBot, PerplexityBot, …) and many social scrapers do
 * not execute JavaScript, so a client-rendered SPA looks empty to them. This
 * serves the freshly built /dist, renders "/" in a real browser, and writes the
 * fully-rendered HTML back over dist/index.html so crawlers get real content.
 *
 * Best-effort: if a browser can't launch (e.g. missing Chromium on a CI host),
 * it logs a warning and exits 0 so the deploy still succeeds — the static
 * fallback baked into index.html keeps crawlers fed in that case.
 */
import http from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../dist");
const ROUTES = ["/"]; // "/community" is a live, auth-gated chat — not worth prerendering.
const PORT = 4317;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
      try {
        const urlPath = decodeURIComponent(req.url.split("?")[0]);
        let filePath = path.join(DIST, urlPath);
        if (urlPath === "/" || !path.extname(filePath)) {
          filePath = path.join(DIST, "index.html"); // SPA fallback
        }
        const body = await readFile(filePath);
        res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream" });
        res.end(body);
      } catch {
        res.writeHead(404);
        res.end("Not found");
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function autoScroll(page) {
  // Trigger any on-scroll / whileInView reveal animations so captured markup is visible.
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        y += step;
        if (y >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 60);
    });
  });
  await new Promise((r) => setTimeout(r, 400));
}

async function main() {
  if (!existsSync(path.join(DIST, "index.html"))) {
    console.warn("[prerender] dist/index.html not found — run `vite build` first. Skipping.");
    return;
  }

  let puppeteer;
  try {
    ({ default: puppeteer } = await import("puppeteer"));
  } catch {
    console.warn("[prerender] puppeteer not installed — skipping prerender, keeping static fallback.");
    return;
  }

  const server = await startServer();
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });
      await page.waitForSelector("#root h1", { timeout: 15000 });
      await autoScroll(page);

      const html = "<!doctype html>\n" + (await page.content()).replace(/^<!doctype html>/i, "").trimStart();
      const outFile =
        route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route, "index.html");
      await writeFile(outFile, html, "utf8");
      console.log(`[prerender] wrote ${path.relative(DIST, outFile)}`);
      await page.close();
    }
  } catch (err) {
    console.warn("[prerender] failed (keeping static fallback):", err.message);
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

main();
