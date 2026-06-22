import { motion, useReducedMotion } from "motion/react";
import { Sparkle, ArrowDown } from "@phosphor-icons/react";
import { MagneticButton } from "./ui/MagneticButton.jsx";
import { HeroDevices } from "./ui/HeroDevices.jsx";

const EASE = [0.16, 1, 0.3, 1];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-20 pt-24 sm:px-8 sm:pt-32"
    >
      {/* soft brand wash, fixed-tint, no pure black */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 18%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%), radial-gradient(50% 40% at 10% 90%, color-mix(in srgb, var(--logic) 10%, transparent), transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Left: copy */}
        <div className="max-w-xl">
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[13px] font-medium text-muted"
          >
            <Sparkle weight="fill" size={14} className="text-accent" />
            Built on modern habit science
          </motion.span>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.06, ease: EASE }}
            className="mt-5 font-serif text-[2.1rem] font-medium leading-[1.1] tracking-[-0.02em] text-text sm:text-6xl sm:leading-[1.07]"
          >
            Make your growth impossible to ignore.
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14, ease: EASE }}
            className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            LifeXP turns real effort into XP, levels, and mastery — visible
            progress you can track, share, and be proud of.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
            className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9"
          >
            <MagneticButton
              as="a"
              href="#community"
              className="rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-accent-fg shadow-[0_10px_30px_-10px_var(--accent)] transition-colors hover:bg-accent-hover"
            >
              Join the community
            </MagneticButton>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-[15px] font-medium text-text transition-colors hover:bg-surface"
            >
              See how it works
              <ArrowDown size={16} />
            </a>
          </motion.div>
        </div>

        {/* Right: interactive device cluster (click-to-front + parallax) */}
        <HeroDevices />
      </div>
    </section>
  );
}
