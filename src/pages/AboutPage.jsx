import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Seo } from "../components/Seo.jsx";
import { Footer } from "../components/Footer.jsx";
import { Reveal } from "../components/ui/Reveal.jsx";

const SITE_URL = "https://www.gamilife.com";

const ABOUT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about#webpage`,
      url: `${SITE_URL}/about`,
      name: "About GamiLife: Gamified Self-Improvement App",
      description:
        "Learn what GamiLife is, how its XP system works, why it uses five life aspects, and how the product differs from a conventional habit tracker.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#app` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "GamiLife",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logodark.png`,
      description:
        "GamiLife develops a gamified self-improvement system that turns focused effort into visible progress.",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#app`,
      name: "GamiLife",
      url: `${SITE_URL}/`,
      applicationCategory: "LifestyleApplication",
      applicationSubCategory: "Gamified self-improvement and goal tracking",
      description:
        "A gamified self-improvement app that awards XP for focused sessions across Physique, Energy, Logic, Creativity, and Social.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      featureList: [
        "Focused goal sessions",
        "Effort-based XP allocation",
        "Five-aspect growth profile",
        "Achievements and Mastery Titles",
        "Optional social accountability",
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/about#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About GamiLife",
          item: `${SITE_URL}/about`,
        },
      ],
    },
  ],
};

const FACTS = [
  ["Product", "Gamified self-improvement and goal-tracking app"],
  ["Core loop", "Choose a goal, complete a focused session, earn XP"],
  ["Growth model", "Physique, Energy, Logic, Creativity, and Social"],
  ["Long-term rewards", "Achievements, levels, and Mastery Titles"],
  ["Privacy", "Designed for private progress or optional sharing"],
  ["Current status", "GamiLife V1 is rolling out; the community is open"],
];

export function AboutPage() {
  return (
    <>
      <Seo
        title="About GamiLife: Gamified Self-Improvement App"
        description="Learn how GamiLife turns focused effort into XP, levels, achievements, and mastery across five areas of life—and how it differs from a habit tracker."
        path="/about"
        type="AboutPage"
        schema={ABOUT_SCHEMA}
      />
      <div className="grain" aria-hidden />

      <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="font-serif text-xl font-semibold tracking-tight">
            GamiLife
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-text"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </header>

      <main>
        <section className="px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                About GamiLife
              </p>
              <h1 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-text sm:text-6xl">
                Self-improvement that rewards the work, not just the checkmark.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                GamiLife is a gamified self-improvement app. It turns focused
                work on meaningful goals into XP, levels, Achievements, and a
                visible growth profile across five areas of life.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border bg-surface px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                The direct answer
              </p>
              <h2 className="mt-4 font-serif text-3xl font-medium text-text">
                What does GamiLife do?
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="space-y-5 leading-relaxed text-muted">
                <p>
                  You choose a goal, start a focused session, and do the work.
                  When the session ends, GamiLife uses its context, duration,
                  and intent to allocate XP across the areas you exercised.
                </p>
                <p>
                  Those sessions compound into levels, Achievements, and
                  Mastery Titles. The aim is simple: make gradual progress
                  concrete enough to understand and motivating enough to repeat.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Product facts
              </p>
              <h2 className="mt-4 font-serif text-3xl font-medium text-text sm:text-[2.6rem]">
                GamiLife at a glance.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <dl className="mt-10 divide-y divide-border border-y border-border">
                {FACTS.map(([term, description]) => (
                  <div key={term} className="grid gap-2 py-5 sm:grid-cols-[180px_1fr] sm:gap-8">
                    <dt className="font-semibold text-text">{term}</dt>
                    <dd className="leading-relaxed text-muted">{description}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border bg-surface px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <h2 className="font-serif text-3xl font-medium text-text sm:text-[2.6rem]">
                More than a habit checklist.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                A conventional habit tracker usually records whether a repeated
                task happened. GamiLife is built around goals and focused
                sessions: what you worked on, how long you worked, and which
                capabilities the effort developed. Habits can be part of that
                system, but they are not the whole system.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["Effort first", "XP reflects a completed session and its context, not an empty streak."],
                ["Whole-person view", "Progress is distributed across five connected life aspects."],
                ["Long horizon", "Mastery is earned through sustained commitment, not a quick badge."],
              ].map(([title, body], index) => (
                <Reveal key={title} delay={index * 0.06} className="rounded-2xl border border-border bg-bg p-6">
                  <h3 className="font-semibold text-text">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Evidence, with limits
              </p>
              <h2 className="mt-4 font-serif text-3xl font-medium text-text sm:text-[2.6rem]">
                Why use feedback, repetition, and gamification?
              </h2>
              <div className="mt-6 max-w-3xl space-y-5 leading-relaxed text-muted">
                <p>
                  GamiLife is informed by behavior-design ideas, not presented as
                  a medical treatment. Research associates repetition in a
                  stable context with stronger habit automaticity, while reviews
                  of gamified apps find that goals, progress displays, rewards,
                  and feedback can support engagement. Results vary by product,
                  population, and implementation.
                </p>
                <p>
                  For the underlying evidence, see the 2024 systematic review of
                  habit formation in <a className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11641623/" rel="noreferrer">Healthcare</a> and
                  the systematic review of mobile gamification interventions in <a className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8855282/" rel="noreferrer">JMIR mHealth and uHealth</a>.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-border bg-surface px-5 py-20 sm:px-8 sm:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold text-accent">GamiLife V1 is rolling out</p>
            <h2 className="mt-3 font-serif text-3xl font-medium text-text">
              Start with the people already doing the work.
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">
              The official GamiLife community is open while the first version of
              the product rolls out.
            </p>
            <Link
              to="/community"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
            >
              Join the GamiLife community
              <ArrowRight size={17} weight="bold" />
            </Link>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
