import { motion, useReducedMotion } from "motion/react";
import { ASPECTS } from "../data.jsx";

const SIZE = 320;
const C = SIZE / 2;
const R = 108;

// A believable, slightly uneven growth profile (0..1 per aspect).
const BASE = [0.72, 0.88, 0.6, 0.92, 0.66];
const LEVELS = [0.25, 0.5, 0.75, 1];

const angleOf = (i) => (-90 + i * 72) * (Math.PI / 180);
const point = (i, r) => [C + R * r * Math.cos(angleOf(i)), C + R * r * Math.sin(angleOf(i))];
const polygon = (vals) => vals.map((v, i) => point(i, v).join(",")).join(" ");

export function AspectRadar({ active, setActive }) {
  const reduce = useReducedMotion();
  const values = BASE.map((v, i) => (active === i ? Math.min(1, v + 0.1) : v));

  return (
    <svg
      viewBox={`-30 0 ${SIZE + 60} ${SIZE}`}
      className="mx-auto w-full max-w-[400px]"
      role="img"
      aria-label="Growth profile across the five aspects"
    >
      {/* grid rings */}
      {LEVELS.map((lvl) => (
        <polygon
          key={lvl}
          points={polygon([lvl, lvl, lvl, lvl, lvl])}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
        />
      ))}

      {/* axes */}
      {ASPECTS.map((_, i) => {
        const [x, y] = point(i, 1);
        return <line key={i} x1={C} y1={C} x2={x} y2={y} stroke="var(--border)" strokeWidth="1" />;
      })}

      {/* data shape, scales out of the center on reveal */}
      <motion.g
        style={{ transformOrigin: `${C}px ${C}px`, transformBox: "view-box" }}
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.polygon
          animate={{ points: polygon(values) }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          points={polygon(values)}
          fill="color-mix(in srgb, var(--accent) 16%, transparent)"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {ASPECTS.map(({ color }, i) => {
          const [x, y] = point(i, values[i]);
          const on = active === i;
          return (
            <motion.circle
              key={i}
              animate={{ cx: x, cy: y, r: on ? 7 : 4 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              cx={x}
              cy={y}
              fill={color}
              stroke="var(--surface)"
              strokeWidth="2"
            />
          );
        })}
      </motion.g>

      {/* labels (interactive) */}
      {ASPECTS.map(({ name, color }, i) => {
        const [x, y] = point(i, 1.22);
        const anchor = x < C - 10 ? "end" : x > C + 10 ? "start" : "middle";
        const on = active === i;
        return (
          <text
            key={name}
            x={x}
            y={y}
            dy="0.32em"
            textAnchor={anchor}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer text-[12px] font-semibold transition-all"
            style={{ fill: on ? color : "var(--text-muted)" }}
          >
            {name}
          </text>
        );
      })}
    </svg>
  );
}
