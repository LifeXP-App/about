import { useRef } from "react";

/* Card with a soft radial highlight that tracks the cursor.
   Updates CSS custom props directly on the node, so no re-renders. */
export function SpotlightCard({
  children,
  className = "",
  color = "var(--accent)",
  as: As = "div",
  style,
  ...props
}) {
  const ref = useRef(null);

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <As
      ref={ref}
      onMouseMove={onMove}
      className={`group/spot relative overflow-hidden ${className}`}
      style={{ "--spot": color, ...style }}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx) var(--my), color-mix(in srgb, var(--spot) 18%, transparent), transparent 60%)",
        }}
      />
      <span className="relative z-10 block">{children}</span>
    </As>
  );
}
