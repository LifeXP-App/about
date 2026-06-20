import { Link } from "react-router-dom";
import { ArrowFatUp, ChatCircle, ArrowRight, Users } from "@phosphor-icons/react";
import { Reveal } from "../ui/Reveal.jsx";

/* Landing-page teaser: one pinned post + a doorway to the full chat.
   Intentionally static so the home page stays light (no supabase here). */
export function CommunityTeaser() {
  return (
    <section
      id="community"
      className="scroll-mt-20 border-t border-border bg-surface px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1.5 text-[13px] font-medium text-muted">
            <Users size={15} weight="duotone" className="text-accent" />
            The Wall
          </span>
          <h2 className="mt-5 font-serif text-3xl font-medium leading-tight tracking-[-0.01em] text-text sm:text-[2.6rem]">
            The app is coming. The community is already here.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted">
            People are sharing the goals they're chasing while early access rolls
            out. Pull up a chair.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          {/* a hint of more posts stacked behind */}
          <div className="relative mx-auto max-w-xl text-left">
            <div className="absolute inset-x-4 -bottom-3 h-20 rounded-2xl border border-border bg-surface/60" />
            <div className="absolute inset-x-2 -bottom-1.5 h-20 rounded-2xl border border-border bg-surface/80" />

            <article className="relative flex gap-4 rounded-2xl border border-border-strong bg-surface p-5">
              <div className="flex flex-col items-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted">
                  <ArrowFatUp size={18} />
                </span>
                <span className="mt-1 text-sm font-semibold tabular-nums text-text">42</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-faint">
                  <span className="font-semibold text-accent">LifeXP Team</span>
                  <span className="rounded-full bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                    Team
                  </span>
                  <span>· pinned</span>
                </div>
                <h3 className="mt-1.5 font-medium leading-snug text-text">
                  Welcome to the wall. What are you leveling up?
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  Drop the one goal you're chasing right now. No vanity metrics,
                  just real effort. We read every post.
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                  <ChatCircle size={15} />
                  3 replies
                </span>
              </div>
            </article>
          </div>
        </Reveal>

        <Reveal delay={0.18} className="mt-12">
          <Link
            to="/community"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-accent-fg shadow-[0_14px_36px_-12px_var(--accent)] transition-colors hover:bg-accent-hover"
          >
            Join the chat while you wait
            <ArrowRight size={17} weight="bold" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
