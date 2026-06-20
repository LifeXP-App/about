import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PencilSimpleLine, X } from "@phosphor-icons/react";
import { createPost } from "../../lib/community.js";
import { validatePost } from "../../lib/moderation.js";
import {
  getName,
  setName as persistName,
  postCooldownLeft,
  markPosted,
} from "../../lib/identity.js";

export function PostComposer({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(getName());
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(e) {
    e.preventDefault();
    const msg = validatePost({ author: name, title, body });
    if (msg) return setError(msg);
    const wait = postCooldownLeft();
    if (wait > 0)
      return setError(`Hang on ${Math.ceil(wait / 1000)}s before posting again.`);

    setSending(true);
    setError("");
    try {
      persistName(name);
      const created = await createPost({ author: name, title, body });
      markPosted();
      onCreated?.(created);
      setTitle("");
      setBody("");
      setOpen(false);
    } catch {
      setError("Couldn't post that. Try again in a moment.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mb-6">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex w-full items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 text-left text-muted transition-colors hover:border-accent/40 hover:text-text"
        >
          <PencilSimpleLine size={20} className="text-accent" />
          What are you leveling up? Share it…
        </button>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={submit}
          className="rounded-2xl border border-border-strong bg-surface p-5"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-text">New post</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-faint transition-colors hover:text-text"
            >
              <X size={18} />
            </button>
          </div>

          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            placeholder="Display name (required)"
            aria-label="Display name"
            required
            minLength={2}
            maxLength={40}
            className="mt-4 w-full rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm text-text outline-none placeholder:text-faint focus:border-accent sm:max-w-xs"
          />
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
            placeholder="Title — the goal or win in one line"
            aria-label="Title"
            maxLength={140}
            className="mt-3 w-full rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-[15px] font-medium text-text outline-none placeholder:text-faint focus:border-accent"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Add detail (optional)"
            aria-label="Body"
            rows={3}
            maxLength={2000}
            className="mt-3 w-full resize-none rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm text-text outline-none placeholder:text-faint focus:border-accent"
          />

          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-xs text-physique">{error}</span>
            <button
              type="submit"
              disabled={sending}
              className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {sending ? "Posting…" : "Post to the wall"}
            </button>
          </div>
        </motion.form>
      )}
    </div>
  );
}
