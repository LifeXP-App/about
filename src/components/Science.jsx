import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal.jsx";

const PRINCIPLES = [
  {
    k: "01",
    title: "Immediate feedback",
    body: "A reward you can see the instant you finish is what makes a behavior worth repeating. XP closes the gap between effort and payoff.",
  },
  {
    k: "02",
    title: "Compounding by 1%",
    body: "Single sessions look small. Stacked over months they are the whole story. LifeXP makes that slow curve visible while it happens.",
  },
  {
    k: "03",
    title: "Identity, not outcomes",
    body: "You stop chasing a finish line and start becoming the kind of person who shows up. Every session is a vote for who you are.",
  },
];

export function Science() {
  return (
    <section id="science" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Why it works
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl font-medium leading-tight tracking-[-0.01em] text-text sm:text-[2.6rem]">
            Motivation fades. The right system keeps you going anyway.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {PRINCIPLES.map(({ k, title, body }) => (
            <RevealItem key={k} className="bg-bg p-7">
              <span className="font-serif text-3xl font-medium text-faint">{k}</span>
              <h3 className="mt-4 text-lg font-semibold text-text">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mt-6 rounded-2xl border border-border bg-surface p-6 sm:p-7">
            <p className="max-w-3xl leading-relaxed text-muted">
              <span className="font-medium text-text">Inspired by the research, built for real life. </span>
              LifeXP draws on modern habit-building science, including ideas
              popularized in <em>Atomic Habits</em>, and layers on the things a
              book cannot give you: gamification, social accountability, and
              AI-powered feedback on every session.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
