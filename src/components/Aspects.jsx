import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal.jsx";
import { ASPECTS } from "../data.jsx";

export function Aspects() {
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

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ASPECTS.map(({ name, desc, Icon, color }) => (
            <RevealItem
              key={name}
              className="group rounded-2xl border border-border bg-surface p-5 transition-colors duration-300 hover:border-border-strong"
            >
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                style={{ background: `color-mix(in srgb, ${color} 14%, transparent)` }}
              >
                <Icon size={22} weight="duotone" style={{ color }} />
              </span>
              <h3
                className="mt-4 text-base font-semibold"
                style={{ color }}
              >
                {name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{desc}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
