import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import { Seo } from "../components/Seo.jsx";

/**
 * Catch-all for unknown URLs. The Vercel SPA rewrite serves index.html with a
 * 200 for any path, so without this Google would see every typo'd URL as a
 * duplicate of the homepage (soft 404). The noindex meta tells crawlers that
 * execute JS to drop the page instead.
 */
export function NotFound() {
  useEffect(() => {
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  return (
    <>
      <Seo
        title="Page not found — GamiLife"
        description="This page doesn't exist. Head back to GamiLife to keep your progress going."
        path="/"
      />
      <div className="grain" aria-hidden />
      <main className="flex min-h-[100dvh] flex-col items-center justify-center px-5 text-center">
        <p className="text-sm font-medium text-muted">404</p>
        <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-text sm:text-5xl">
          This page doesn't exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted">
          The link may be old or mistyped. Everything worth seeing is back on
          the homepage.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-text"
        >
          <ArrowLeft size={16} />
          Back to GamiLife
        </Link>
      </main>
    </>
  );
}
