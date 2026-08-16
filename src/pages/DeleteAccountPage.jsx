import { Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import { Seo } from "../components/Seo.jsx";
import { Footer } from "../components/Footer.jsx";

export function DeleteAccountPage() {
  return (
    <>
      <Seo
        title="Delete Your Account — GamiLife"
        description="How to permanently delete your GamiLife account and all associated data."
        path="/delete-account"
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
            Delete Your Account
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            You have full control over your account and data. There are two
            ways to permanently delete your GamiLife account.
          </p>

          <div className="mt-12 space-y-10">

            {/* Option 1 — in-app */}
            <div className="rounded-2xl border border-border bg-surface p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                  1
                </span>
                <div>
                  <h2 className="font-serif text-xl font-medium text-text sm:text-2xl">
                    Delete directly in the app
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted">
                    The fastest way. Open GamiLife, go to{" "}
                    <strong className="text-text">Settings → Account</strong>,
                    and tap <strong className="text-text">Delete Account</strong>.
                    Your account and all associated data are permanently removed
                    immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Option 2 — email request */}
            <div className="rounded-2xl border border-border bg-surface p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                  2
                </span>
                <div>
                  <h2 className="font-serif text-xl font-medium text-text sm:text-2xl">
                    Request deletion by email
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted">
                    If you can&apos;t access the app or prefer to request
                    deletion manually, send us an email and we&apos;ll handle
                    it for you.
                  </p>
                  <div className="mt-5 rounded-xl border border-border bg-surface-2 px-5 py-4 text-[15px] leading-relaxed text-text">
                    To delete your account, email{" "}
                    <a
                      href="mailto:support@gamilife.com"
                      className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
                    >
                      support@gamilife.com
                    </a>{" "}
                    and we&apos;ll process your request within 30 days.
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    Please send the request from the email address associated
                    with your account so we can verify ownership. We&apos;ll
                    confirm once the deletion is complete.
                  </p>
                </div>
              </div>
            </div>

            {/* What gets deleted */}
            <div className="border-t border-border pt-8">
              <h2 className="font-serif text-xl font-medium text-text sm:text-2xl">
                What gets deleted
              </h2>
              <div className="mt-4 space-y-3 leading-relaxed text-muted">
                <p>
                  Deleting your account permanently removes your profile,
                  username, goals, sessions, posts, XP history, uploaded
                  images, and all other personal data we hold. This action
                  cannot be undone.
                </p>
                <p>
                  We may retain certain records for a limited period where
                  required by law (for example, transaction records), but
                  your personal information is removed from our active
                  systems within 30 days of your request.
                </p>
              </div>
            </div>

            {/* Questions */}
            <div className="border-t border-border pt-8">
              <h2 className="font-serif text-xl font-medium text-text sm:text-2xl">
                Questions?
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                If you have any questions about account deletion or your
                data, reach out at{" "}
                <a
                  href="mailto:support@gamilife.com"
                  className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
                >
                  support@gamilife.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
