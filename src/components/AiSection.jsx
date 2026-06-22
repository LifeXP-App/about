import { motion, useReducedMotion } from "motion/react";
import { Pulse, TrendUp, Sparkle } from "@phosphor-icons/react";
import { Reveal } from "./ui/Reveal.jsx";
import { Counter } from "./ui/Counter.jsx";
import { PhoneFrame } from "./ui/PhoneFrame.jsx";
import { SESSION_DEMO } from "../data.jsx";

const FEATURES = [
  { Icon: Pulse, text: "Real-time XP based on actual effort, not vanity metrics" },
  { Icon: TrendUp, text: "Difficulty that adapts as you get better" },
  { Icon: Sparkle, text: "Progress you can see compounding, session after session" },
];

export function AiSection() {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* phone */}
        <Reveal className="order-2 mx-auto w-full max-w-[300px] lg:order-1">
          <PhoneFrame
            src="/screens/session-xp.png"
            alt="A LifeXP meditation session awarding XP across aspects"
          />
        </Reveal>

        {/* copy + live demo */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-[-0.01em] text-text sm:text-[2.6rem]">
              An engine that understands effort, not just activity.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              LifeXP reads the context behind what you do, then splits your
              reward across the aspects you actually exercised. Here is what one
              session looks like.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <SessionCard />
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-7 space-y-3">
              {FEATURES.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-[15px] text-text">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface text-accent">
                    <Icon size={16} weight="bold" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SessionCard() {
  const reduce = useReducedMotion();
  return (
    <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-muted">XP gained this session</span>
        <span className="text-xs text-faint">Meditation</span>
      </div>
      <div className="mt-1 font-serif text-5xl font-semibold text-energy">
        <Counter to={192} prefix="+" />
      </div>

      <div className="mt-6 space-y-4">
        {SESSION_DEMO.map(({ name, xp, color, pct }, i) => (
          <div key={name}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-medium" style={{ color }}>{name}</span>
              <span className="text-muted">{xp} XP</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-bg">
              <motion.div
                className="h-full rounded-full"
                style={{ background: color }}
                initial={reduce ? { width: `${pct}%` } : { width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
