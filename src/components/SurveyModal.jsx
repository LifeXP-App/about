import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react";
import { submitSurvey, markSurveyDone } from "../lib/survey.js";

/* ─── Question definitions ───────────────────────────────────────────────── */

const QUESTIONS = [
  {
    id: "age_range",
    label: "What's your age range?",
    type: "radio",
    options: ["Under 18", "18–24", "25–34", "35–44", "45+"],
  },
  {
    id: "motivation_loss_time",
    label: "How long does it usually take for you to lose motivation in a goal?",
    type: "radio",
    options: [
      "A few days",
      "1–2 weeks",
      "1 month",
      "Several months",
      "I rarely lose motivation",
    ],
  },
  {
    id: "abandonment_reason",
    title: "Abandonment reason 😔",
    label: "When you stop pursuing a goal, what's usually the reason?",
    type: "textarea",
  },
  {
    id: "progress_visibility_score",
    title: "Progress visibility? 🗓️",
    label:
      "Being able to look back and see the progress I've made would help me stay motivated.",
    type: "scale",
  },
  {
    id: "accountability_score",
    title: "A Social layer? 👫",
    label:
      "Being able to share my progress with friends would help me stay motivated.",
    type: "scale",
  },
  {
    id: "progress_visualization_score",
    title: "Progress visualization? 📊",
    label:
      "I often feel like I'm making progress, but I don't have an interesting way to visualize it and feel it",
    type: "scale",
  },
  {
    id: "gender",
    label: "How do you identify?",
    type: "radio",
    options: ["Man", "Woman", "Prefer not to say"],
  },
];

const TOTAL = QUESTIONS.length;

const EASE = [0.16, 1, 0.3, 1];

// 1 → red, 2 → orange, 3 → yellow, 4 → lime, 5 → green
const SCALE_COLORS = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e"];

const SCALE_LABELS = ["NO!", "no", "idk", "yes", "YES!"];

/* ─── Component ──────────────────────────────────────────────────────────── */

export function SurveyModal({ onClose }) {
  const [step, setStep] = useState(0);
  // direction: 1 = forward (slide left), -1 = back (slide right)
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const reduce = useReducedMotion();

  const question = QUESTIONS[step];
  const isFirst = step === 0;
  const isLast = step === TOTAL - 1;

  function handleAnswer(value) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    if (error) setError("");
  }

  function go(delta) {
    setDirection(delta);
    setStep((s) => s + delta);
  }

  /* Dismiss without saving — does NOT mark done, so it reappears on reload. */
  function handleSkip() {
    onClose();
  }

  /* Save answers then close. Even if Supabase fails we mark done locally —
     the user answered honestly and shouldn't be nagged again. */
  async function handleSubmit() {
    setSubmitting(true);
    setError("");
    try {
      await submitSurvey(answers);
    } catch {
      // Swallow DB errors; still close cleanly.
    } finally {
      markSurveyDone();
      setSubmitting(false);
      onClose();
    }
  }

  /* Slide variants — direction is passed as `custom` so exit can read it. */
  const slideVariants = {
    enter: (dir) => ({
      x: reduce ? 0 : dir * 36,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: reduce ? 0 : dir * -36,
      opacity: 0,
    }),
  };

  return (
    /* Backdrop */
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[90] flex items-center justify-center px-8"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      /* Click outside = skip */
      onClick={(e) => e.target === e.currentTarget && handleSkip()}
    >
      {/* Modal card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.24, ease: EASE }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="border-b border-border px-7 pb-5 pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-semibold uppercase tracking-widest text-accent">
                Quick survey · ~1 min
              </p>
              <p className="mt-0.5 text-md  text-muted">
                Help us build LifeXP right
              </p>
            </div>
            <button
              onClick={handleSkip}
              aria-label="Skip survey"
              className="shrink-0 rounded-lg p-1 text-faint transition-colors hover:text-text"
            >
              <X size={17} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex flex-1 gap-1.5">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className="h-4 flex-1 overflow-hidden rounded-full bg-border"
                >
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={false}
                    animate={{ width: i <= step ? "100%" : "0%" }}
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                </div>
              ))}
            </div>
            <span className="shrink-0 text-xs tabular-nums text-faint">
              {step + 1} / {TOTAL}
            </span>
          </div>
        </div>

        {/* ── Question area ─────────────────────────────────────────────────── */}
        <div className="min-h-[260px] px-7 py-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: EASE }}
            >
              {question.title && (
                <h3 className="mb-2 text-xl font-bold text-text">{question.title}</h3>
              )}
              <p className="mb-5 text-md leading-snug text-text">
                {question.label}
              </p>

              {/* ── Radio ──────────────────────────────────────────────────── */}
              {question.type === "radio" && (
                <div className="flex flex-col gap-2">
                  {question.options.map((opt) => {
                    const selected = answers[question.id] === opt;
                    return (
                      <label
                        key={opt}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-md transition-colors ${
                          selected
                            ? "border-accent bg-accent/[0.08] text-text"
                            : "border-border text-muted hover:border-border-strong hover:text-text"
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={opt}
                          checked={selected}
                          onChange={() => handleAnswer(opt)}
                          className="sr-only"
                        />
                        {/* Custom radio dot */}
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            selected ? "border-accent bg-accent" : "border-border-strong"
                          }`}
                        >
                          {selected && (
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                        </span>
                        {opt}
                      </label>
                    );
                  })}
                </div>
              )}

              {/* ── Textarea ───────────────────────────────────────────────── */}
              {question.type === "textarea" && (
                <textarea
                  value={answers[question.id] ?? ""}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder="Share your thoughts…"
                  rows={5}
                  maxLength={1000}
                  className="w-full resize-none rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-text outline-none placeholder:text-faint focus:border-accent"
                />
              )}

              {/* ── Scale 1–5 ──────────────────────────────────────────────── */}
              {question.type === "scale" && (
                <div>
                  <div className="grid grid-cols-5 gap-2">
                    {SCALE_LABELS.map((label, i) => {
                      const n = i + 1;
                      const selected = answers[question.id] === n;
                      const color = SCALE_COLORS[i];
                      return (
                        <button
                          key={n}
                          type="button"
                          onClick={() => handleAnswer(n)}
                          style={{
                            backgroundColor: selected ? `${color}4D` : `${color}18`,
                            borderColor:     selected ? color : `${color}55`,
                            color,
                          }}
                          className="flex h-11 cursor-pointer items-center justify-center rounded-xl border text-sm font-semibold transition-all duration-150"
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] text-faint">
                    <span>Strongly Disagree</span>
                    <span>Strongly Agree</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-t border-border px-7 py-4">
          <button
            onClick={() => go(-1)}
            disabled={isFirst}
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeft size={14} weight="bold" />
            Back
          </button>

          <div className="flex items-center gap-3">
            

            {isLast ? (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                {submitting ? (
                  "Saving…"
                ) : (
                  <>
                    <Check size={13} weight="bold" />
                    Submit
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => go(1)}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
              >
                Next
                <ArrowRight size={13} weight="bold" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
