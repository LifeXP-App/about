import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

const MAX_LEVEL = 5;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [level, setLevel] = useState(1);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(MAX_LEVEL, Math.floor(v * MAX_LEVEL) + 1);
    setLevel((prev) => (prev === next ? prev : next));
  });

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
        <div className="flex items-center gap-2.5">
          <a href="#top" className="font-serif text-xl font-semibold tracking-tight">
            LifeXP
          </a>
          <span
            aria-hidden
            className="flex items-center gap-1 rounded-full border border-border bg-bg/60 px-2 py-0.5 text-[11px] font-semibold tabular-nums tracking-wide text-muted backdrop-blur-md"
          >
            <span className="text-accent">LV</span>
            <motion.span
              key={level}
              initial={{ y: -6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="text-text"
            >
              {level}
            </motion.span>
            <span className="text-faint">/ {MAX_LEVEL}</span>
          </span>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#aspects" className="transition-colors hover:text-text">Aspects</a>
          <a href="#how" className="transition-colors hover:text-text">How it works</a>
          <a href="#science" className="transition-colors hover:text-text">Why it works</a>
          <a href="#community" className="transition-colors hover:text-text">Community</a>
        </nav>

        <a
          href="#community"
          className="rounded-full bg-text px-4 py-2 text-sm font-medium text-bg transition-transform duration-150 hover:opacity-90 active:scale-[0.97]"
        >
          Join the community
        </a>
      </div>
    </motion.header>
  );
}
