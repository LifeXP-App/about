import { useState } from "react";

/* Device mockups for the hero/showcase. If `src` is missing OR fails to load,
   a labeled placeholder renders instead, so the layout is visible before the
   real screenshots are dropped into /public/screens (and it auto-swaps once
   the file exists). */

function Placeholder({ label }) {
  return (
    <div className="flex aspect-[16/10] w-full items-center justify-center bg-surface text-center text-xs text-faint">
      <span className="px-4">{label}</span>
    </div>
  );
}

function FramedImage({ src, alt, label, priority, imgClass = "" }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <Placeholder label={label} />;
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={`block w-full select-none ${imgClass}`}
      draggable={false}
    />
  );
}

export function BrowserFrame({ src, alt, label = "Add desktop screenshot → /screens/desktop-home.png", className = "", priority = false }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border-strong bg-surface-2 shadow-[0_40px_100px_-30px_rgb(var(--shadow-tint)/0.5)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface px-3 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-physique/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-energy/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-social/60" />
        </span>
        <span className="ml-2 flex-1 truncate rounded-md bg-bg px-3 py-1 text-[11px] text-faint">
          lifexp.live
        </span>
      </div>
      <FramedImage src={src} alt={alt} label={label} priority={priority} />
    </div>
  );
}

export function TabletFrame({ src, alt, label = "Add tablet screenshot → /screens/tablet-goals.png", className = "" }) {
  return (
    <div
      className={`rounded-[1.4rem] border border-border-strong bg-[#0a0a0c] p-1.5 shadow-[0_30px_80px_-24px_rgb(var(--shadow-tint)/0.5)] ${className}`}
    >
      <div className="overflow-hidden rounded-[1rem] bg-bg">
        <FramedImage src={src} alt={alt} label={label} />
      </div>
    </div>
  );
}
