import { Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import { Seo } from "../components/Seo.jsx";
import { Footer } from "../components/Footer.jsx";

// Placeholder legal copy — not reviewed by counsel. Replace before relying
// on this as actual terms of service. Contact email below is a placeholder.
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

export function TermsOfServicePage() {
  return (
    <>
      <Seo
        title="Terms of Service — GamiLife"
        description="The terms that govern your use of GamiLife."
        path="/terms-of-service"
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
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-faint">Last updated: {LAST_UPDATED}</p>

          <div className="mt-10">
            <Section title="Agreement to terms">
              <p>
                By creating an account or using GamiLife (&quot;the
                app&quot;, &quot;the service&quot;), you agree to these
                Terms of Service. If you don&apos;t agree, please don&apos;t
                use GamiLife.
              </p>
            </Section>

            <Section title="Your account">
              <p>
                You&apos;re responsible for keeping your account credentials
                secure and for all activity that happens under your account.
                You must provide accurate information when creating an
                account, and you must be at least 13 years old to use
                GamiLife.
              </p>
            </Section>

            <Section title="Using GamiLife">
              <p>
                GamiLife lets you log goals and timed activity sessions, and
                awards experience points (XP) across five life aspects based
                on the sessions you complete. XP, levels, achievements, and
                leaderboard standing are for motivation and engagement within
                the app — they don&apos;t represent real-world credentials or
                guarantees of any kind.
              </p>
              <p>
                You agree to use GamiLife honestly — logging sessions and
                goals that reflect real effort, rather than manipulating the
                system to inflate XP or leaderboard rank.
              </p>
            </Section>

            <Section title="Content you post">
              <p>
                You retain ownership of the goals, posts, comments, and
                images you upload to GamiLife. By posting content, you grant
                us a license to store, display, and distribute it within the
                app as needed to provide the service — for example, showing
                your public posts to other users or on leaderboards,
                according to your account&apos;s privacy setting.
              </p>
              <p>
                You&apos;re responsible for the content you post. Don&apos;t
                post anything illegal, abusive, harassing, or that infringes
                someone else&apos;s rights. We may remove content or suspend
                accounts that violate these terms.
              </p>
            </Section>

            <Section title="Social features">
              <p>
                GamiLife includes social features such as following other
                users, commenting, liking, and appearing on leaderboards.
                Treat other users with respect. Harassment, spam, and abuse
                of these features may result in account suspension.
              </p>
            </Section>

            <Section title="Account termination">
              <p>
                You can delete your account at any time from Settings. We
                may suspend or terminate accounts that violate these terms,
                engage in abusive behavior, or attempt to manipulate the
                app&apos;s XP or ranking systems.
              </p>
            </Section>

            <Section title="Disclaimer of warranties">
              <p>
                GamiLife is provided &quot;as is&quot;, without warranties of
                any kind. We work to keep the app reliable, but we don&apos;t
                guarantee it will be uninterrupted, error-free, or available
                at all times.
              </p>
            </Section>

            <Section title="Limitation of liability">
              <p>
                To the extent permitted by law, GamiLife and its team aren&apos;t
                liable for indirect, incidental, or consequential damages
                arising from your use of the app.
              </p>
            </Section>

            <Section title="Changes to these terms">
              <p>
                We may update these terms from time to time. If we make
                material changes, we&apos;ll let you know through the app or
                by email before the changes take effect. Continuing to use
                GamiLife after changes take effect means you accept the
                updated terms.
              </p>
            </Section>

            <Section title="Contact us">
              <p>
                Questions about these terms? Reach out at{" "}
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
