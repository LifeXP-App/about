import { supabase } from "./supabase.js";

export const COMMUNITY_READY = !!supabase;

/* Posts ─────────────────────────────────────────────────────────────────── */
export async function fetchPosts(sort = "top") {
  if (!supabase) return [];
  const query = supabase.from("community_posts").select("*");
  query.order(sort === "new" ? "created_at" : "votes", { ascending: false });
  query.order("created_at", { ascending: false }).limit(50);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function createPost({ author, title, body }) {
  const { data, error } = await supabase
    .from("community_posts")
    .insert({ author: author.trim(), title: title.trim(), body: body?.trim() || null })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function upvote(postId) {
  const { data, error } = await supabase.rpc("upvote_post", { p_id: postId });
  if (error) throw error;
  return data; // new vote total
}

/* Comments ──────────────────────────────────────────────────────────────── */
export async function fetchComments(postId) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("community_comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function addComment({ postId, author, body }) {
  const { data, error } = await supabase
    .from("community_comments")
    .insert({ post_id: postId, author: author.trim(), body: body.trim() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/* Realtime: fire `onInsert` whenever a new post lands. */
export function subscribeToPosts(onInsert) {
  if (!supabase) return () => {};
  const channel = supabase
    .channel("community_posts_feed")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "community_posts" },
      (payload) => onInsert(payload.new)
    )
    .subscribe();
  return () => supabase.removeChannel(channel);
}

/* "3m ago" style relative time. */
export function timeAgo(iso) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}
