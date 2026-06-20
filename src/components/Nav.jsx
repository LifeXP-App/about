import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { APP_URL } from "../data.jsx";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex h-16 max-w-6xl items-center justify-between px-5 transition-colors duration-300 sm:px-8 ${
          scrolled
            ? "border-b border-border bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <a href="#top" className="font-serif text-xl font-semibold tracking-tight">
          LifeXP
        </a>

        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#aspects" className="transition-colors hover:text-text">Aspects</a>
          <a href="#how" className="transition-colors hover:text-text">How it works</a>
          <a href="#mastery" className="transition-colors hover:text-text">Mastery</a>
          <a href="#science" className="transition-colors hover:text-text">Why it works</a>
        </nav>

        <a
          href={APP_URL}
          className="rounded-full bg-text px-4 py-2 text-sm font-medium text-bg transition-transform duration-150 hover:opacity-90 active:scale-[0.97]"
        >
          Get early access
        </a>
      </div>
    </motion.header>
  );
}
