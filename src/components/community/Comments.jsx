import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { fetchComments, addComment, timeAgo } from "../../lib/community.js";
import { validateComment } from "../../lib/moderation.js";
import {
  getName,
  setName as persistName,
  commentCooldownLeft,
  markCommented,
} from "../../lib/identity.js";

export function Comments({ postId, onAdded }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(getName());
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let alive = true;
    fetchComments(postId)
      .then((c) => alive && setComments(c))
      .catch(() => alive && setError("Couldn't load comments."))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [postId]);

  async function submit(e) {
    e.preventDefault();
    const msg = validateComment({ author: name, body });
    if (msg) return setError(msg);
    if (commentCooldownLeft() > 0)
      return setError("Slow down a sec before commenting again.");

    setSending(true);
    setError("");
    try {
      persistName(name);
      const created = await addComment({ postId, author: name, body });
      markCommented();
      setComments((prev) => [...prev, created]);
      setBody("");
      onAdded?.();
    } catch {
      setError("Couldn't post that. Try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden"
    >
      <div className="mt-4 border-t border-border pt-4">
        {loading ? (
          <p className="text-sm text-faint">Loading replies…</p>
        ) : (
          <ul className="space-y-3">
            <AnimatePresence initial={false}>
              {comments.map((c) => (
                <motion.li
                  key={c.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl bg-bg px-4 py-3"
                >
                  <div className="flex items-baseline gap-2 text-sm">
                    <span className="font-semibold text-text">{c.author}</span>
                    <span className="text-xs text-faint">{timeAgo(c.created_at)}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{c.body}</p>
                </motion.li>
              ))}
            </AnimatePresence>
            {comments.length === 0 && (
              <p className="text-sm text-faint">No replies yet. Start the thread.</p>
            )}
          </ul>
        )}

        <form onSubmit={submit} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            placeholder="Name *"
            aria-label="Display name (required)"
            required
            minLength={2}
            maxLength={40}
            className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-text outline-none placeholder:text-faint focus:border-accent sm:w-32"
          />
          <input
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              if (error) setError("");
            }}
            placeholder="Add a reply…"
            aria-label="Reply"
            className="w-full flex-1 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-text outline-none placeholder:text-faint focus:border-accent"
          />
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:opacity-60"
          >
            <PaperPlaneTilt size={15} weight="fill" />
            Reply
          </button>
        </form>
        {error && <p className="mt-2 text-xs text-physique">{error}</p>}
      </div>
    </motion.div>
  );
}
