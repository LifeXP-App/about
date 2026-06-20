import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "@phosphor-icons/react";
import { CommunityBoard } from "../components/community/CommunityBoard.jsx";
import { Reveal } from "../components/ui/Reveal.jsx";
import { Footer } from "../components/Footer.jsx";

export function CommunityPage() {
  return (
    <>
      <div className="grain" aria-hidden />

      <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="font-serif text-xl font-semibold tracking-tight">
            LifeXP
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-text"
          >
            <ArrowLeft size={16} />
            Back to site
          </Link>
        </div>
      </header>

      <main className="px-5 pb-28 pt-16 sm:px-8 sm:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[13px] font-medium text-muted">
              <Clock size={15} weight="duotone" className="text-accent" />
              V1 is rolling out
            </span>
            <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-text sm:text-5xl">
              Join the chat while you wait.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted">
              Post the goal you're chasing, upvote the ones that hit, and reply
              to people doing the work. No login, just a name.
            </p>
          </Reveal>
        </div>

        <div className="mt-14">
          <CommunityBoard showHeading={false} />
        </div>
      </main>

      <Footer />
    </>
  );
}
