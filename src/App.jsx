import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home.jsx";

// Full chat lives on its own route and pulls in supabase-js — load on demand.
const CommunityPage = lazy(() =>
  import("./pages/CommunityPage.jsx").then((m) => ({ default: m.CommunityPage }))
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
      </Routes>
    </>
  );
}
