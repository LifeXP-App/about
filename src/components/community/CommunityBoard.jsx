import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, CircleNotch } from "@phosphor-icons/react";
import { Reveal } from "../ui/Reveal.jsx";
import { PostComposer } from "./PostComposer.jsx";
import { PostCard } from "./PostCard.jsx";
import {
  fetchPosts,
  subscribeToPosts,
  COMMUNITY_READY,
} from "../../lib/community.js";

const TABS = [
  { key: "top", label: "Top" },
  { key: "new", label: "New" },
];

export function CommunityBoard({ showHeading = true }) {
  const [sort, setSort] = useState("top");
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  const load = useCallback(async (s) => {
    setStatus("loading");
    try {
      setPosts(await fetchPosts(s));
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (!COMMUNITY_READY) {
      setStatus("error");
      return;
    }
    load(sort);
  }, [sort, load]);

  // Live: prepend posts created by other people, skipping ones we already have.
  useEffect(() => {
    if (!COMMUNITY_READY) return;
    return subscribeToPosts((row) =>
      setPosts((prev) => (prev.some((p) => p.id === row.id) ? prev : [row, ...prev]))
    );
  }, []);

  function handleCreated(post) {
    setPosts((prev) => [post, ...prev]);
  }

  return (
    <section id="community" className="mx-auto max-w-2xl">
      <div>
        {showHeading && (
          <Reveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1.5 text-[13px] font-medium text-muted">
              <Users size={15} weight="duotone" className="text-accent" />
              The Wall
            </span>
            <h2 className="mt-5 font-serif text-3xl font-medium leading-tight tracking-[-0.01em] text-text sm:text-[2.6rem]">
              Don't just sign up. Show up.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted">
              Post the goal you're chasing, upvote the ones that hit, and reply to
              people doing the work. This is the community before the app.
            </p>
          </Reveal>
        )}

        <div className={showHeading ? "mt-12" : ""}>
          <PostComposer onCreated={handleCreated} />

          {COMMUNITY_READY && (
            <div className="mb-4 flex items-center gap-1 rounded-full border border-border bg-bg p-1 text-sm font-medium w-fit">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setSort(t.key)}
                  className={`rounded-full px-4 py-1.5 transition-colors ${
                    sort === t.key
                      ? "bg-text text-bg"
                      : "text-muted hover:text-text"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {status === "loading" && (
            <div className="flex items-center justify-center gap-2 py-12 text-muted">
              <CircleNotch size={20} className="animate-spin" />
              Loading the wall…
            </div>
          )}

          {status === "error" && (
            <div className="rounded-2xl border border-border bg-bg px-6 py-10 text-center text-muted">
              The wall is warming up. Check back in a moment.
            </div>
          )}

          {status === "ready" && (
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))}
              </AnimatePresence>
              {posts.length === 0 && (
                <div className="rounded-2xl border border-border bg-bg px-6 py-10 text-center text-muted">
                  Be the first to post. What are you leveling up?
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
