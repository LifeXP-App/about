import { Nav } from "./components/Nav.jsx";
import { Hero } from "./components/Hero.jsx";
import { Aspects } from "./components/Aspects.jsx";
import { HowItWorks } from "./components/HowItWorks.jsx";
import { AiSection } from "./components/AiSection.jsx";
import { Mastery } from "./components/Mastery.jsx";
import { Science } from "./components/Science.jsx";
import { Social } from "./components/Social.jsx";
import { CtaSection } from "./components/CtaSection.jsx";
import { Footer } from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Aspects />
        <HowItWorks />
        <AiSection />
        <Mastery />
        <Science />
        <Social />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
