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

export function Home() {
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
    </>
  );
}
