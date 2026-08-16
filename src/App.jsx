import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { NotFound } from "./pages/NotFound.jsx";

const AboutPage = lazy(() =>
  import("./pages/AboutPage.jsx").then((m) => ({ default: m.AboutPage }))
);

// Full chat lives on its own route and pulls in supabase-js — load on demand.
const CommunityPage = lazy(() =>
  import("./pages/CommunityPage.jsx").then((m) => ({ default: m.CommunityPage }))
);

const PrivacyPolicyPage = lazy(() =>
  import("./pages/PrivacyPolicyPage.jsx").then((m) => ({ default: m.PrivacyPolicyPage }))
);
const TermsOfServicePage = lazy(() =>
  import("./pages/TermsOfServicePage.jsx").then((m) => ({ default: m.TermsOfServicePage }))
);
const DeleteAccountPage = lazy(() =>
  import("./pages/DeleteAccountPage.jsx").then((m) => ({ default: m.DeleteAccountPage }))
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={
            <Suspense
              fallback={
                <div className="flex min-h-[100dvh] items-center justify-center text-muted">
                  Loading GamiLife…
                </div>
              }
            >
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="/community"
          element={
            <Suspense
              fallback={
                <div className="flex min-h-[100dvh] items-center justify-center text-muted">
                  Loading the chat…
                </div>
              }
            >
              <CommunityPage />
            </Suspense>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <Suspense
              fallback={
                <div className="flex min-h-[100dvh] items-center justify-center text-muted">
                  Loading…
                </div>
              }
            >
              <PrivacyPolicyPage />
            </Suspense>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <Suspense
              fallback={
                <div className="flex min-h-[100dvh] items-center justify-center text-muted">
                  Loading…
                </div>
              }
            >
              <TermsOfServicePage />
            </Suspense>
          }
        />
        <Route
          path="/delete-account"
          element={
            <Suspense
              fallback={
                <div className="flex min-h-dvh items-center justify-center text-muted">
                  Loading…
                </div>
              }
            >
              <DeleteAccountPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
