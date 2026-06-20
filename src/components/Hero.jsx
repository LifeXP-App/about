import { motion, useReducedMotion } from "motion/react";
import { Sparkle, ArrowDown } from "@phosphor-icons/react";
import { PhoneFrame } from "./ui/PhoneFrame.jsx";
import { APP_URL } from "../data.jsx";

const EASE = [0.16, 1, 0.3, 1];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pt-32"
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
            className="mt-6 font-serif text-[2.6rem] font-medium leading-[1.07] tracking-[-0.02em] text-text sm:text-6xl"
          >
            Turn your growth into a game you actually want to play.
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14, ease: EASE }}
            className="mt-6 max-w-md text-lg leading-relaxed text-muted"
          >
            Set meaningful goals. Earn XP through real effort. Level up across
            every dimension of life.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href={APP_URL}
              className="rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-accent-fg shadow-[0_10px_30px_-10px_var(--accent)] transition-transform duration-150 hover:bg-accent-hover active:scale-[0.97]"
            >
              Get early access
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-[15px] font-medium text-text transition-colors hover:bg-surface"
            >
              See how it works
              <ArrowDown size={16} />
            </a>
          </motion.div>
        </div>

        {/* Right: phone + floating reward chips */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
          className="relative mx-auto w-full max-w-[300px] sm:max-w-[330px]"
        >
          <PhoneFrame
            src="/screens/feed-post.png"
            alt="A LifeXP feed post showing a drawing goal with earned XP"
            priority
          />

          <FloatChip
            reduce={reduce}
            className="-left-6 top-24 sm:-left-10"
            color="var(--energy)"
            delay={0.6}
          >
            +231 XP
          </FloatChip>
          <FloatChip
            reduce={reduce}
            className="-right-4 bottom-28 sm:-right-8"
            color="var(--logic)"
            delay={0.9}
          >
            Day 179 streak
          </FloatChip>
        </motion.div>
      </div>
    </section>
  );
}

function FloatChip({ children, className, color, delay, reduce }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
      animate={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, scale: 1, y: [0, -8, 0] }
      }
      transition={{
        opacity: { duration: 0.4, delay },
        scale: { duration: 0.5, delay, ease: EASE },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`absolute flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3.5 py-2 text-sm font-semibold shadow-[0_12px_30px_-12px_rgb(var(--shadow-tint)/0.4)] ${className}`}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: color }}
        aria-hidden
      />
      {children}
    </motion.div>
  );
}
