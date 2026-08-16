import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import { Reveal } from "./ui/Reveal.jsx";

const FAQS = [
  {
    question: "What is GamiLife?",
    answer:
      "GamiLife is a gamified self-improvement app that turns real effort into XP, levels, Achievements, and Mastery Titles across Physique, Energy, Logic, Creativity, and Social.",
  },
  {
    question: "How does GamiLife award XP?",
    answer:
      "Its AI engine reads the context, duration, and intent behind a focused session, then splits XP across the areas you exercised. Rewards reflect effort rather than vanity metrics.",
  },
  {
    question: "What are the five aspects in GamiLife?",
    answer:
      "Physique covers strength and movement; Energy covers focus and stamina; Logic covers learning and strategy; Creativity covers creation and experimentation; Social covers communication and empathy.",
  },
  {
    question: "Is GamiLife based on science?",
    answer:
      "Yes. GamiLife applies modern habit-building ideas through immediate feedback, visible progress, identity-based behavior, adaptive difficulty, and social accountability.",
  },
  {
    question: "What are Mastery Titles?",
    answer:
      "Mastery Titles are long-term recognition earned through sustained commitment in a life aspect. The five titles are Warrior, Protagonist, Prodigy, Alchemist, and Diplomat.",
  },
  {
    question: "Can I use GamiLife privately?",
    answer:
      "Yes. You decide whether GamiLife is a private personal-growth engine or a public social experience.",
  },
  {
    question: "Is GamiLife a habit tracker?",
    answer:
      "GamiLife can support habits, but it is broader than a habit checklist. It tracks focused work toward meaningful goals, awards XP based on each session's context, and shows growth across five life aspects.",
  },
  {
    question: "How is GamiLife different from other gamified productivity apps?",
    answer:
      "GamiLife rewards the context and effort behind a focused session instead of treating every checked task as equal. It combines goal sessions, a five-aspect growth profile, Achievements, Mastery Titles, and optional social accountability.",
  },
  {
    question: "Is GamiLife available now?",
    answer:
      "GamiLife V1 is rolling out. The official GamiLife community is already open, so you can share the goal you are working on and meet other people building momentum.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-border px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Frequently asked questions
          </p>
          <h2 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-[-0.01em] text-text sm:text-[2.6rem]">
            The short version.
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {FAQS.map(({ question, answer }) => (
            <details key={question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold text-text marker:content-none">
                {question}
                <span aria-hidden className="text-xl font-normal text-accent transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-2xl pt-3 leading-relaxed text-muted">{answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            to="/faq/your-account/how-to-delete-account"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            View All
            <ArrowRight size={15} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
