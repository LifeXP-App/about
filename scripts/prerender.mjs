/**
 * Post-build prerender.
 *
 * AI crawlers (GPTBot, ClaudeBot, PerplexityBot, …) and many social scrapers do
 * not execute JavaScript, so a client-rendered SPA looks empty to them. This
 * serves the freshly built /dist, renders "/" in a real browser, and writes the
 * fully-rendered HTML back over dist/index.html so crawlers get real content.
 *
 * On Vercel/CI the Chrome bundled with puppeteer can't run (missing system
 * libraries), so we launch the self-contained @sparticuz/chromium build there.
 *
 * Locally this is best-effort (a warning keeps `npm run build` usable without
 * Chromium), but on Vercel a prerender failure fails the build: shipping
 * without the static route HTML silently degrades SEO. Set PRERENDER_OPTIONAL=1
 * to allow a deploy through anyway (the SPA rewrite fallback keeps routes
 * working for humans).
 */
import http from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../dist");
const ROUTES = ["/", "/about", "/community"];
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

  // A static snapshot has no IntersectionObserver lifecycle after delivery.
  // Make any Motion reveal that has not fired crawler-visible before capture.
  await page.evaluate(() => {
    document.querySelectorAll('#root [style*="opacity: 0"]').forEach((element) => {
      element.style.opacity = "1";
      if (element.style.transform.includes("translate")) {
        element.style.transform = "none";
      }
    });
  });
}

async function launchBrowser() {
  // Vercel/CI build containers lack the shared libraries Chrome needs, so use
  // the self-contained @sparticuz/chromium build there. Locally, prefer the
  // Chrome that puppeteer manages. Each path falls back to the other.
  const serverless = async () => {
    const { default: chromium } = await import("@sparticuz/chromium");
    const { default: puppeteer } = await import("puppeteer");
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless ?? true,
    });
  };
  const local = async () => {
    const { default: puppeteer } = await import("puppeteer");
    return puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  };

  const attempts = process.env.VERCEL || process.env.CI ? [serverless, local] : [local, serverless];
  let lastError;
  for (const attempt of attempts) {
    try {
      return await attempt();
    } catch (err) {
      lastError = err;
      console.warn(`[prerender] browser launch attempt failed: ${err.message}`);
    }
  }
  throw lastError;
}

function stampSitemap(sitemap) {
  // Keep <lastmod> at the deploy date so the sitemap never goes stale.
  const today = new Date().toISOString().slice(0, 10);
  return sitemap.replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
}

async function main() {
  if (!existsSync(path.join(DIST, "index.html"))) {
    console.warn("[prerender] dist/index.html not found — run `vite build` first. Skipping.");
    return;
  }

  const sitemapPath = path.join(DIST, "sitemap.xml");
  if (existsSync(sitemapPath)) {
    await writeFile(sitemapPath, stampSitemap(await readFile(sitemapPath, "utf8")), "utf8");
    console.log("[prerender] stamped sitemap.xml lastmod");
  }

  const server = await startServer();
  let browser;
  try {
    browser = await launchBrowser();

    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });
      await page.waitForSelector("#root h1", { timeout: 15000 });
      await autoScroll(page);

      const captured = (await page.content())
        .replace(/^<!doctype html>/i, "")
        // The rendered #root is now the no-JS fallback. Keeping the original
        // <noscript> block would duplicate <main>, <h1>, and homepage copy on
        // every prerendered route.
        .replace(/<noscript>[\s\S]*?<\/noscript>/gi, "")
        .trimStart();
      const html = "<!doctype html>\n" + captured;
      // Vercel's cleanUrls maps route.html to /route. Flat files avoid relying
      // on directory-index behavior or SPA rewrites for direct navigation.
      const outFile =
        route === "/"
          ? path.join(DIST, "index.html")
          : path.join(DIST, `${route.slice(1)}.html`);
      await mkdir(path.dirname(outFile), { recursive: true });
      await writeFile(outFile, html, "utf8");
      console.log(`[prerender] wrote ${path.relative(DIST, outFile)}`);
      await page.close();
    }
  } catch (err) {
    const optional = process.env.PRERENDER_OPTIONAL === "1" || (!process.env.VERCEL && !process.env.CI);
    if (optional) {
      console.warn("[prerender] failed (keeping static fallback):", err.message);
    } else {
      console.error("[prerender] FAILED — crawlers would get no static HTML for /about and /community.");
      console.error("[prerender] Set PRERENDER_OPTIONAL=1 to deploy anyway.");
      console.error(err);
      process.exitCode = 1;
    }
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

main();
