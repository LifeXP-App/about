import { useEffect } from "react";

const SITE_URL = "https://www.gamilife.com";
const SOCIAL_IMAGE = `${SITE_URL}/og.png`;

function setMeta(selector, content, previous) {
  const element = document.head.querySelector(selector);
  if (!element) return;
  previous.push([element, element.getAttribute("content")]);
  element.setAttribute("content", content);
}

/** Route metadata for pages that differ from the static homepage head. */
export function Seo({ title, description, path, type = "WebPage", schema }) {
  useEffect(() => {
    const url = new URL(path, SITE_URL).href;
    const previousTitle = document.title;
    const previousMeta = [];
    const canonical = document.head.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.href;
    const homeSchema = document.head.querySelector("script[data-home-schema]");
    const previousSchemaType = homeSchema?.type;

    document.title = title;
    canonical?.setAttribute("href", url);
    setMeta('meta[name="description"]', description, previousMeta);
    setMeta('meta[property="og:title"]', title, previousMeta);
    setMeta('meta[property="og:description"]', description, previousMeta);
    setMeta('meta[property="og:url"]', url, previousMeta);
    setMeta('meta[property="og:image"]', SOCIAL_IMAGE, previousMeta);
    setMeta('meta[property="og:image:secure_url"]', SOCIAL_IMAGE, previousMeta);
    setMeta('meta[property="og:image:alt"]', `${title}.`, previousMeta);
    setMeta('meta[name="twitter:title"]', title, previousMeta);
    setMeta('meta[name="twitter:description"]', description, previousMeta);
    setMeta('meta[name="twitter:image"]', SOCIAL_IMAGE, previousMeta);
    setMeta('meta[name="twitter:image:alt"]', `${title}.`, previousMeta);

    // The homepage graph does not describe this route. Disable it while this
    // page is active and publish a small, route-specific graph instead.
    if (homeSchema) homeSchema.type = "application/json";
    const routeSchema = document.createElement("script");
    routeSchema.type = "application/ld+json";
    routeSchema.dataset.routeSchema = "";
    routeSchema.textContent = JSON.stringify(
      schema || {
        "@context": "https://schema.org",
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#app` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
      }
    );
    document.head.appendChild(routeSchema);

    return () => {
      document.title = previousTitle;
      if (canonical && previousCanonical) canonical.href = previousCanonical;
      previousMeta.forEach(([element, content]) => {
        if (content === null) element.removeAttribute("content");
        else element.setAttribute("content", content);
      });
      if (homeSchema && previousSchemaType) homeSchema.type = previousSchemaType;
      routeSchema.remove();
    };
  }, [description, path, schema, title, type]);

  return null;
}
