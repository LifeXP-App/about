import { Lock, Users, Trophy } from "@phosphor-icons/react";
import { Reveal } from "./ui/Reveal.jsx";
import { PhoneFrame } from "./ui/PhoneFrame.jsx";
import { BrowserFrame } from "./ui/DeviceFrames.jsx";

const POINTS = [
  { Icon: Trophy, title: "Proof of effort, not performance theater", body: "Share achievements and growth profiles with people who value real progress, not posturing." },
  { Icon: Users, title: "Circles around ambition", body: "Encourage discipline, nudge friends mid-session, and build momentum together." },
  { Icon: Lock, title: "Private or public, you decide", body: "Run LifeXP as a quiet personal engine or an open social environment. You control the exposure." },
];

export function Social() {
  return (
    <section className="border-t border-border bg-surface px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-[-0.01em] text-text sm:text-[2.6rem]">
              Growth stays personal, but never has to be lonely.
            </h2>
          </Reveal>
          <div className="mt-8 space-y-7">
            {POINTS.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bg text-accent">
                    <Icon size={20} weight="duotone" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-text">{title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* feed on the web + followers on phone */}
        <Reveal delay={0.1} className="relative mx-auto w-full max-w-[300px] sm:max-w-[440px]">
          <BrowserFrame
            src="/screens/desktop-home.png"
            alt="The LifeXP social feed on the web"
            className="hidden sm:block"
          />
          <div className="mx-auto w-[220px] max-w-[300px] sm:absolute sm:-bottom-8 sm:-right-6 sm:mx-0 sm:w-[150px] lg:w-[168px]">
            <PhoneFrame
              src="/screens/followers.png"
              alt="LifeXP followers list showing players with mastery titles and life levels"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
