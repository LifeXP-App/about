import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Reveal } from "./ui/Reveal.jsx";
import { APP_URL } from "../data.jsx";

export function CtaSection() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden px-5 py-28 text-center sm:px-8 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 0%, color-mix(in srgb, var(--accent) 13%, transparent), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="font-serif text-2xl italic leading-snug text-muted sm:text-3xl">
            Most platforms capture moments. LifeXP captures momentum.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-8 font-serif text-4xl font-medium tracking-[-0.02em] text-text sm:text-5xl">
            Ready to level up?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-muted">
            Start turning effort into something you can finally see.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <motion.a
            href={APP_URL}
            whileHover={reduce ? undefined : { y: -2 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-fg shadow-[0_16px_40px_-12px_var(--accent)] transition-colors hover:bg-accent-hover"
          >
            Get early access
            <ArrowRight size={18} weight="bold" />
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
