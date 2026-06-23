import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Nav } from "../components/Nav.jsx";
import { Hero } from "../components/Hero.jsx";
import { Aspects } from "../components/Aspects.jsx";
import { HowItWorks } from "../components/HowItWorks.jsx";
import { AiSection } from "../components/AiSection.jsx";
import { Mastery } from "../components/Mastery.jsx";
import { Science } from "../components/Science.jsx";
import { Social } from "../components/Social.jsx";
import { CommunityTeaser } from "../components/community/CommunityTeaser.jsx";
import { XpScrollBar } from "../components/XpScrollBar.jsx";
import { Footer } from "../components/Footer.jsx";
import { SurveyModal } from "../components/SurveyModal.jsx";
import { hasTakenSurvey } from "../lib/survey.js";

export function Home() {
  const [showSurvey, setShowSurvey] = useState(false);

  useEffect(() => {
    // Don't bother scheduling the timer if the survey is already done.
    if (hasTakenSurvey()) return;

    // Show after 10 seconds — gives the visitor time to read the hero copy
    // before we interrupt them. Only fires once per browser.
    const timer = setTimeout(() => setShowSurvey(true), 10_000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="grain" aria-hidden />
      <XpScrollBar />
      <Nav />
      <main>
        <Hero />
        <Aspects />
        <HowItWorks />
        <AiSection />
        <Mastery />
        <Science />
        <Social />
        <CommunityTeaser />
      </main>
      <Footer />

      {/* Survey portal — AnimatePresence handles the enter/exit animations */}
      <AnimatePresence>
        {showSurvey && (
          <SurveyModal key="survey" onClose={() => setShowSurvey(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
