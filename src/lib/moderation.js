/* Minimal client-side profanity gate. Not a substitute for real moderation,
   it just keeps the obvious stuff off a public, login-free wall. */

const BLOCKED = [
  "fuck", "shit", "bitch", "asshole", "cunt", "dick", "pussy", "bastard",
  "nigger", "nigga", "faggot", "retard", "slut", "whore", "rape",
];

const LEET = (s) =>
  s
    .toLowerCase()
    .replace(/[@4]/g, "a")
    .replace(/[1!|]/g, "i")
    .replace(/[3]/g, "e")
    .replace(/[0]/g, "o")
    .replace(/[5$]/g, "s")
    .replace(/[^a-z\s]/g, "");

export function isClean(text) {
  if (!text) return true;
  const norm = LEET(text);
  return !BLOCKED.some((w) => new RegExp(`\\b${w}`, "i").test(norm));
}

// Names that would let someone pose as the brand, staff, or a system message.
const RESERVED_SUBSTRINGS = ["lifexp", "life xp", "welcome to"];
const RESERVED_WORDS = [
  "admin", "administrator", "moderator", "mod", "official",
  "team", "staff", "support", "system", "bot",
];

export function validateName(name) {
  const n = (name || "").trim();
  if (!n) return "Pick a display name first.";
  if (n.length < 2) return "Your name needs at least 2 characters.";
  if (n.length > 40) return "That name is too long (40 max).";
  if (!isClean(n)) return "Pick a cleaner display name.";

  const low = n.toLowerCase();
  if (RESERVED_SUBSTRINGS.some((s) => low.includes(s)))
    return "That name is reserved. Pick a different one.";
  if (RESERVED_WORDS.some((w) => new RegExp(`\\b${w}\\b`, "i").test(low)))
    return "That name is reserved. Pick a different one.";
  return null;
}

export function validatePost({ author, title, body }) {
  const nameError = validateName(author);
  if (nameError) return nameError;
  if (!title?.trim()) return "Your post needs a title.";
  if (title.trim().length > 140) return "Title is a bit long (140 max).";
  if ((body || "").length > 2000) return "Post body is too long (2000 max).";
  if (!isClean(`${title} ${body || ""}`))
    return "Let's keep it constructive. Please rephrase.";
  return null;
}

export function validateComment({ author, body }) {
  const nameError = validateName(author);
  if (nameError) return nameError;
  if (!body?.trim()) return "Write something first.";
  if (body.trim().length > 1000) return "Comment is too long (1000 max).";
  if (!isClean(body))
    return "Let's keep it constructive. Please rephrase.";
  return null;
}
