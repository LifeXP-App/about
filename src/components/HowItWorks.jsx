import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal.jsx";

const STEPS = [
  {
    title: "Set a goal that means something",
    body: "Run your first marathon, master a craft, rebuild your focus. Your goal becomes a structured commitment, not just an idea you forget by Friday.",
  },
  {
    title: "Run a focused session",
    body: "Start the timer and do the work. LifeXP reads the context behind your effort, its duration, and your intent, then awards XP the moment you finish.",
  },
  {
    title: "Turn effort into achievements",
    body: "Sustained effort plus completion becomes a permanent Achievement. Over time they form a verified timeline of what you actually finished.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="border-y border-border bg-surface px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <Reveal>
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-[-0.01em] text-text sm:text-[2.8rem]">
              The loop is simple. The compounding is not.
            </h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted">
              Three steps, repeated. Each pass leaves a mark you can see, which
              is exactly why the next one gets easier to start.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="relative">
          <div
            aria-hidden
            className="absolute left-[18px] top-3 bottom-3 w-px bg-border"
          />
          {STEPS.map((step, i) => (
            <RevealItem
              key={step.title}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-strong bg-bg font-serif text-sm font-semibold text-text">
                {i + 1}
              </span>
              <div className="pt-1">
                <h3 className="text-xl font-semibold text-text">{step.title}</h3>
                <p className="mt-2 max-w-md leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
