import { Component, useState } from "react";
import "@/App.css";
import { Toaster } from "sonner";
import { LenisProvider } from "@/lib/lenis";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import ReelsShowcase from "@/components/ReelsShowcase";
import Clients from "@/components/Clients";
import Process from "@/components/Process";
import DeliverablesCalculator from "@/components/DeliverablesCalculator";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-center">
          <div>
            <p className="font-display text-2xl font-bold text-bone">Something broke in the house.</p>
            <p className="mt-3 font-mono2 text-xs uppercase tracking-widest text-smoke">Refresh to re-enter</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function Page() {
  const [loaded, setLoaded] = useState(false);
  const [prefilledBrand, setPrefilledBrand] = useState("");

  const handleSelectClient = (brandName) => {
    setPrefilledBrand(brandName);
  };

  return (
    <div className="grain relative min-h-screen bg-ink text-bone">
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <Nav loaded={loaded} />
      <main>
        <Hero loaded={loaded} />
        <Marquee />
        {/* Light Editorial Chapter: Philosophy & Core Capabilities */}
        <div className="relative z-10 -mt-8 rounded-t-[2.5rem] bg-bone md:rounded-t-[4rem]">
          <Manifesto />
          <Services />
        </div>
        <ReelsShowcase onSelectClientForContact={handleSelectClient} />
        <Clients onSelectClientForContact={handleSelectClient} />
        <Process />
        <DeliverablesCalculator />
        <Contact prefilledBrand={prefilledBrand} />
      </main>
      <Footer />
      <Toaster position="bottom-right" theme="dark" richColors />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LenisProvider>
        <Page />
      </LenisProvider>
    </ErrorBoundary>
  );
}
