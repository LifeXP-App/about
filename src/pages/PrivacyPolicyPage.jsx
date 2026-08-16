import { Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

import { Seo } from "../components/Seo.jsx";
import { Footer } from "../components/Footer.jsx";

// Placeholder legal copy — not reviewed by counsel. Replace before relying
// on this as an actual privacy policy. Contact email below is a placeholder.
const LAST_UPDATED = "August 12, 2026";

function Section({ title, children }) {
  return (
    <section className="border-b border-border py-8 last:border-b-0">
      <h2 className="font-serif text-xl font-medium text-text sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

export function PrivacyPolicyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy — GamiLife"
        description="How GamiLife collects, uses, and protects your information."
        path="/privacy-policy"
        type="WebPage"
      />

      <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="font-serif text-xl font-semibold tracking-tight">
            GamiLife
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-text"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </header>

      <main className="px-5 pb-24 pt-16 sm:px-8 sm:pt-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl font-medium tracking-[-0.02em] text-text sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-faint">Last updated: {LAST_UPDATED}</p>

          <div className="mt-10">
            <Section title="Overview">
              <p>
                GamiLife (&quot;we&quot;, &quot;us&quot;) is a gamified
                self-improvement app that lets you log real-life activities as
                timed sessions, track goals, and earn XP across five life
                aspects. This policy explains what information we collect,
                how we use it, and the choices you have.
              </p>
            </Section>

            <Section title="Information we collect">
              <p>
                <strong className="text-text">Account information — </strong>
                your email, username, and password (managed securely via our
                authentication provider). If you sign in with Discord or
                another linked identity provider, we receive the basic
                profile information that service shares with us.
              </p>
              <p>
                <strong className="text-text">Activity and goal data — </strong>
                the goals, activities, and sessions you create, including
                session duration, timestamps, XP earned, and any optional
                completion photo you upload.
              </p>
              <p>
                <strong className="text-text">Live session state — </strong>
                while a session is actively running, its timer state is held
                in real time by our session infrastructure, then synced to
                our primary database once the session ends.
              </p>
              <p>
                <strong className="text-text">Usage and crash analytics — </strong>
                we use product analytics and crash-reporting tooling to
                understand how the app is used (pages visited, features used,
                error events) and to automatically capture crash reports when
                the app encounters an unexpected error. Crash reports may
                include device type, OS version, app version, and a stack
                trace. This data is used solely to fix bugs and improve
                stability, is tied to your account only where necessary for
                debugging, and is not sold to third parties.
              </p>
              <p>
                <strong className="text-text">Uploaded images — </strong>
                profile pictures and session completion photos are stored
                with our media hosting provider.
              </p>
            </Section>

            <Section title="How we use your information">
              <p>
                We use your information to operate the app&apos;s core
                features — tracking goals and sessions, calculating XP and
                levels, powering the social feed, leaderboards, and
                notifications, and keeping your account secure. We also use
                aggregated, non-identifying usage data to fix bugs and
                prioritize improvements.
              </p>
            </Section>

            <Section title="Sharing your information">
              <p>
                We do not sell your personal information. We share data only
                with the service providers that help us run GamiLife
                (authentication, hosting, media storage, and analytics
                providers), each bound to only use your data to provide those
                services, and when required by law.
              </p>
              <p>
                Content you choose to make public — such as a public profile,
                posts, or leaderboard placement — is visible to other users
                according to your account&apos;s privacy setting (Public or
                Private) in the app&apos;s Settings.
              </p>
            </Section>

            <Section title="Your choices">
              <p>
                You can review and update your profile information at any
                time from Settings. You can switch your account between
                Public and Private, control notification preferences, and
                permanently delete your account and associated data from the
                Settings page.
              </p>
              <p>
                For step-by-step instructions on account deletion — including
                how to request it by email if you can&apos;t access the app —
                see our{" "}
                <Link
                  to="/delete-account"
                  className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
                >
                  account deletion page
                </Link>
                .
              </p>
            </Section>

            <Section title="Data retention">
              <p>
                We retain your account and activity data for as long as your
                account is active. If you delete your account, we delete or
                anonymize your personal data within a reasonable period,
                except where we&apos;re required to retain certain records by
                law.
              </p>
            </Section>

            <Section title="Children's privacy">
              <p>
                GamiLife is not directed at children under 13, and we do not
                knowingly collect personal information from children under
                13.
              </p>
            </Section>

            <Section title="Changes to this policy">
              <p>
                We may update this policy from time to time. If we make
                material changes, we&apos;ll let you know through the app or
                by email before the changes take effect.
              </p>
            </Section>

            <Section title="Contact us">
              <p>
                Questions about this policy or your data? Reach out at{" "}
                <a
                  href="mailto:support@gamilife.com"
                  className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
                >
                  support@gamilife.com
                </a>
                .
              </p>
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
