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
        {MASTERY.map(({ title, aspect, Icon, color }) => (
          <RevealItem
            key={title}
            className="group flex flex-col items-center rounded-2xl border border-border bg-bg px-4 py-8 transition-transform duration-300 hover:-translate-y-1"
          >
            <span
              className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
              style={{ background: `color-mix(in srgb, ${color} 14%, transparent)` }}
            >
              <Icon size={28} weight="duotone" style={{ color }} />
            </span>
            <h3 className="mt-4 font-serif text-lg font-semibold" style={{ color }}>
              {title}
            </h3>
            <p className="mt-0.5 text-xs uppercase tracking-wide text-faint">
              {aspect}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
