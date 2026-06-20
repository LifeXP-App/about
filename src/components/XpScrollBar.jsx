import { motion, useScroll, useSpring } from "motion/react";

/* The page-wide XP gauge bar that fills as you scroll.
   The matching "LV n/5" readout lives inline in the nav (see Nav.jsx). */
export function XpScrollBar() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      style={{
        scaleX: width,
        background:
          "linear-gradient(90deg, var(--energy), var(--accent) 55%, var(--logic))",
      }}
    />
  );
}
