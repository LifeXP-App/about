import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal.jsx";
import { MASTERY } from "../data.jsx";

export function Mastery() {
  return (
    <section
      id="mastery"
      className="border-y border-border bg-surface px-5 py-24 text-center sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="font-serif text-3xl font-medium leading-tight tracking-[-0.01em] text-text sm:text-[2.6rem]">
            Cross a threshold, earn a title.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
            As XP compounds, your strongest domain earns you a Mastery Title.
            It is not granted quickly. It emerges from sustained commitment.
          </p>
        </Reveal>
      </div>

      <RevealGroup className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {MASTERY.map((m) => (
          <RevealItem key={m.title}>
            <MasteryCard {...m} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

function MasteryCard({ title, aspect, Icon, color }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 18,
  });

  function onMove(e) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px - 0.5);
    my.set(py - 0.5);
    ref.current.style.setProperty("--px", `${px * 100}%`);
    ref.current.style.setProperty("--py", `${py * 100}%`);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 700, "--mcolor": color }}
      className="group/m relative flex flex-col items-center overflow-hidden rounded-2xl border border-border bg-bg px-4 py-8 [transform-style:preserve-3d]"
    >
      {/* iridescent foil sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/m:opacity-100"
        style={{
          background:
            "radial-gradient(120px circle at var(--px) var(--py), color-mix(in srgb, var(--mcolor) 35%, transparent), transparent 55%), conic-gradient(from 210deg at var(--px) var(--py), rgba(255,255,255,0.18), transparent 40%, color-mix(in srgb, var(--mcolor) 22%, transparent) 70%, transparent)",
          mixBlendMode: "overlay",
        }}
      />
      <span
        className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover/m:scale-110"
        style={{ background: `color-mix(in srgb, ${color} 14%, transparent)` }}
      >
        <Icon size={28} weight="duotone" style={{ color }} />
      </span>
      <h3 className="mt-4 font-serif text-lg font-semibold" style={{ color }}>
        {title}
      </h3>
      <p className="mt-0.5 text-xs uppercase tracking-wide text-faint">{aspect}</p>
    </motion.div>
  );
}
