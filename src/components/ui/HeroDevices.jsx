import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { PhoneFrame } from "./PhoneFrame.jsx";
import { BrowserFrame } from "./DeviceFrames.jsx";

const EASE = [0.16, 1, 0.3, 1];

/* Hero device cluster: desktop + overlapping phone.
   - Click a device to bring it to the front.
   - Mouse parallax gives the two devices depth (phone moves more than desktop).
   Both effects collapse to static under reduced motion / on touch. */
export function HeroDevices() {
  const reduce = useReducedMotion();
  const wrap = useRef(null);
  const [front, setFront] = useState("phone");

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 });

  // desktop (further away) drifts a little; phone (closer) drifts more
  const dX = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const dY = useTransform(sy, [-0.5, 0.5], [-7, 7]);
  const pX = useTransform(sx, [-0.5, 0.5], [-22, 22]);
  const pY = useTransform(sy, [-0.5, 0.5], [-16, 16]);
  const pRot = useTransform(sx, [-0.5, 0.5], [-3, 3]);

  function onMove(e) {
    if (reduce || !wrap.current) return;
    const r = wrap.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) / r.width);
    my.set((e.clientY - (r.top + r.height / 2)) / r.height);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  const desktopFront = front === "desktop";

  return (
    <motion.div
      ref={wrap}
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
      className="relative mx-auto w-full max-w-[340px] sm:max-w-none"
    >
      {/* desktop */}
      <motion.button
        type="button"
        onClick={() => setFront("desktop")}
        style={{ x: dX, y: dY, zIndex: desktopFront ? 30 : 10 }}
        animate={{ scale: desktopFront ? 1 : 0.97 }}
        transition={{ duration: 0.4, ease: EASE }}
        aria-label="Bring the desktop view forward"
        className="relative hidden w-full cursor-pointer sm:block"
      >
        <BrowserFrame
          src="/screens/desktop-profile.webp"
          alt="LifeXP on the web: your growth profile with the five-aspect radar"
          priority
          width={1861}
          height={1001}
        />
      </motion.button>

      {/* phone */}
      <motion.button
        type="button"
        onClick={() => setFront("phone")}
        style={{
          x: reduce ? 0 : pX,
          y: reduce ? 0 : pY,
          rotate: reduce ? 0 : pRot,
          zIndex: desktopFront ? 20 : 30,
        }}
        animate={{ scale: front === "phone" ? 1 : 0.94 }}
        transition={{ duration: 0.4, ease: EASE }}
        aria-label="Bring the phone view forward"
        className="mx-auto block w-[220px] max-w-[300px] cursor-pointer sm:absolute sm:-bottom-10 sm:-left-6 sm:mx-0 sm:w-[150px] lg:w-[170px]"
      >
        <PhoneFrame
          src="/screens/feed-post.webp"
          alt="A LifeXP feed post showing a drawing goal with earned XP"
          priority
        />
      </motion.button>

      <FloatChip reduce={reduce} className="-top-4 right-6 z-40 sm:right-10" color="var(--energy)" delay={0.6}>
        +231 XP
      </FloatChip>
      <FloatChip reduce={reduce} className="bottom-6 right-2 z-40 sm:-right-4 sm:bottom-16" color="var(--logic)" delay={0.9}>
        Day 179 streak
      </FloatChip>
    </motion.div>
  );
}

function FloatChip({ children, className, color, delay, reduce }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { duration: 0.4, delay },
        scale: { duration: 0.5, delay, ease: EASE },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`pointer-events-none absolute flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3.5 py-2 text-sm font-semibold shadow-[0_12px_30px_-12px_rgb(var(--shadow-tint)/0.4)] ${className}`}
    >
      <span className="h-2 w-2 rounded-full" style={{ background: color }} aria-hidden />
      {children}
    </motion.div>
  );
}
