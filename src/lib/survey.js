import { supabase } from "./supabase.js";

const DONE_KEY = "lxp_survey_done";
const VISITOR_KEY = "lxp_visitor_id";

/* Returns true if this browser has already completed or dismissed the survey. */
export function hasTakenSurvey() {
  try {
    return !!localStorage.getItem(DONE_KEY);
  } catch {
    // If storage is inaccessible (private browsing edge cases), skip the survey.
    return true;
  }
}

/* Call on submit OR dismiss so the survey never shows again in this browser. */
export function markSurveyDone() {
  try {
    localStorage.setItem(DONE_KEY, "1");
  } catch {
    /* ignore */
  }
}

/* Returns a stable anonymous UUID for this browser session. Generated once,
   then persisted in localStorage so repeat visits from the same browser share
   the same user_id row even if the user clears the survey flag somehow. */
function getVisitorId() {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    // Fallback: generate a one-off ID (won't persist, but still valid for insert).
    return crypto.randomUUID();
  }
}

/* ── Passive browser signal collection (no user prompt) ─────────────────── */

function getTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch {
    return null;
  }
}

/* Classifies the device into one of: iphone | android | ipad | tablet | desktop.
   Order matters — more specific checks come first.
   iPadOS 13+ reports as "Macintosh" in the UA, so we fall back to maxTouchPoints. */
function getDeviceType() {
  try {
    const ua = navigator.userAgent;
    if (/iphone|ipod/i.test(ua)) return "iphone";
    if (/ipad/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return "ipad";
    if (/android(?!.*mobi)/i.test(ua)) return "tablet";
    if (/android|mobi|blackberry|windows phone|opera mini|iemobile/i.test(ua)) return "android";
    return "desktop";
  } catch {
    return null;
  }
}

/* ── Supabase insert ─────────────────────────────────────────────────────── */

/* Inserts one survey_results row into Supabase.
   Throws on network/DB errors so the caller can surface them. */
export async function submitSurvey(answers) {
  if (!supabase) throw new Error("Supabase client not configured.");

  const { error } = await supabase.from("survey_results").insert({
    user_id: getVisitorId(),
    motivation_loss_time: answers.motivation_loss_time ?? null,
    abandonment_reason: answers.abandonment_reason?.trim() || null,
    progress_visibility_score: answers.progress_visibility_score ?? null,
    accountability_score: answers.accountability_score ?? null,
    progress_visualization_score: answers.progress_visualization_score ?? null,
    age_range: answers.age_range ?? null,
    gender: answers.gender ?? null,
    // Passively collected — never shown to the user.
    timezone: getTimezone(),
    device_type: getDeviceType(),
  });

  if (error) throw error;
}
