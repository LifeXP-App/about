/* Lightweight, login-free identity + abuse guards, all in localStorage. */

const NAME_KEY = "gamilife_name";
const VOTES_KEY = "gamilife_votes";
const LAST_POST_KEY = "gamilife_last_post";
const LAST_COMMENT_KEY = "gamilife_last_comment";
const LEGACY_KEYS = {
  [NAME_KEY]: "lxp_name",
  [VOTES_KEY]: "lxp_votes",
  [LAST_POST_KEY]: "lxp_last_post",
  [LAST_COMMENT_KEY]: "lxp_last_comment",
};

const POST_COOLDOWN_MS = 30_000;
const COMMENT_COOLDOWN_MS = 8_000;

export function getName() {
  try {
    return readStorage(NAME_KEY) || "";
  } catch {
    return "";
  }
}

export function setName(name) {
  try {
    localStorage.setItem(NAME_KEY, name.trim().slice(0, 40));
  } catch {
    /* ignore */
  }
}

function votedSet() {
  try {
    return new Set(JSON.parse(readStorage(VOTES_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

export function hasVoted(id) {
  return votedSet().has(id);
}

export function markVoted(id) {
  const set = votedSet();
  set.add(id);
  try {
    localStorage.setItem(VOTES_KEY, JSON.stringify([...set]));
  } catch {
    /* ignore */
  }
}

function cooldownLeft(key, windowMs) {
  try {
    const last = Number(readStorage(key) || 0);
    return Math.max(0, windowMs - (Date.now() - last));
  } catch {
    return 0;
  }
}

function readStorage(key) {
  const current = localStorage.getItem(key);
  if (current !== null) return current;

  const legacy = LEGACY_KEYS[key] && localStorage.getItem(LEGACY_KEYS[key]);
  if (legacy !== null && legacy !== undefined) localStorage.setItem(key, legacy);
  return legacy;
}

export const postCooldownLeft = () => cooldownLeft(LAST_POST_KEY, POST_COOLDOWN_MS);
export const commentCooldownLeft = () =>
  cooldownLeft(LAST_COMMENT_KEY, COMMENT_COOLDOWN_MS);

export function markPosted() {
  try {
    localStorage.setItem(LAST_POST_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

export function markCommented() {
  try {
    localStorage.setItem(LAST_COMMENT_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}
