import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowFatUp, ChatCircle } from "@phosphor-icons/react";
import { Comments } from "./Comments.jsx";
import { upvote, timeAgo } from "../../lib/community.js";
import { hasVoted, markVoted } from "../../lib/identity.js";

export function PostCard({ post }) {
  const [votes, setVotes] = useState(post.votes);
  const [voted, setVoted] = useState(() => hasVoted(post.id));
  const [count, setCount] = useState(post.comment_count ?? 0);
  const [open, setOpen] = useState(false);

  async function onVote() {
    if (voted) return;
    setVoted(true);
    setVotes((v) => v + 1); // optimistic
    markVoted(post.id);
    try {
      const total = await upvote(post.id);
      if (typeof total === "number") setVotes(total);
    } catch {
      setVoted(false);
      setVotes((v) => v - 1);
    }
  }

  // Trust comes from the server-controlled flag, never the free-form author name.
  const isTeam = post.is_official === true;

  return (
    <div className="flex gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-border-strong sm:gap-4 sm:p-5">
      {/* vote rail */}
      <div className="flex flex-col items-center">
        <button
          onClick={onVote}
          aria-pressed={voted}
          aria-label="Upvote"
          className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all active:scale-90 ${
            voted
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-border text-muted hover:border-accent/40 hover:text-accent"
          }`}
        >
          <ArrowFatUp size={18} weight={voted ? "fill" : "regular"} />
        </button>
        <span className="mt-1 text-sm font-semibold tabular-nums text-text">{votes}</span>
      </div>

      {/* content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-xs text-faint">
          <span
            className={`font-semibold ${isTeam ? "text-accent" : "text-muted"}`}
          >
            {post.author}
          </span>
          {isTeam && (
            <span className="rounded-full bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
              Team
            </span>
          )}
          <span>· {timeAgo(post.created_at)}</span>
        </div>

        <h3 className="mt-1.5 font-medium leading-snug text-text">{post.title}</h3>
        {post.body && (
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{post.body}</p>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-bg hover:text-text"
        >
          <ChatCircle size={15} />
          {count} {count === 1 ? "reply" : "replies"}
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <Comments postId={post.id} onAdded={() => setCount((c) => c + 1)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
