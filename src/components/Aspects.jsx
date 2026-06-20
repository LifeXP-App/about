import { useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal.jsx";
import { SpotlightCard } from "./ui/SpotlightCard.jsx";
import { AspectRadar } from "./AspectRadar.jsx";
import { ASPECTS } from "../data.jsx";

export function Aspects() {
  const [active, setActive] = useState(null);

  return (
    <section id="aspects" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Five dimensions
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl font-medium leading-tight tracking-[-0.01em] text-text sm:text-[2.6rem]">
            Every session pays out across the five parts of you that actually
            matter.
          </h2>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* radar */}
          <Reveal className="order-2 lg:order-1">
            <AspectRadar active={active} setActive={setActive} />
          </Reveal>

          {/* legend cards */}
          <RevealGroup className="order-1 grid gap-3 lg:order-2">
            {ASPECTS.map(({ name, desc, Icon, color }, i) => (
              <RevealItem key={name}>
                <SpotlightCard
                  color={color}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className="rounded-2xl border bg-surface p-4 transition-colors duration-200"
                  style={{
                    borderColor: active === i ? color : "var(--border)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300"
                      style={{
                        background: `color-mix(in srgb, ${color} 14%, transparent)`,
                        transform: active === i ? "scale(1.08)" : "none",
                      }}
                    >
                      <Icon size={22} weight="duotone" style={{ color }} />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold" style={{ color }}>
                        {name}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted">{desc}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
