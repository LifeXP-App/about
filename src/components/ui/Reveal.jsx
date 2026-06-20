import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1];

/* Single element that rises + fades as it enters the viewport. */
export function Reveal({ children, delay = 0, y = 26, className, as = "div" }) {
  const reduce = useReducedMotion();
  const M = motion[as] ?? motion.div;
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

/* Parent that staggers its <RevealItem> children. */
export function RevealGroup({ children, className, stagger = 0.08, as = "div" }) {
  const reduce = useReducedMotion();
  const M = motion[as] ?? motion.div;
  return (
    <M
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </M>
  );
}

export function RevealItem({ children, className, y = 22, as = "div" }) {
  const M = motion[as] ?? motion.div;
  return (
    <M
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </M>
  );
}
