import Header from "./landing_page/Header";
import Hero from "./landing_page/Hero";
import Features from "./landing_page/Features";
import WhyFluentRoam from "./landing_page/WhyFluentRoam";
import FAQ from "./landing_page/FAQ";
import Footer from "./landing_page/Footer";

export default function LandingPage() {
  return (
    <div className="from-primary-900 to-secondary-900 flex-1 bg-gradient-to-br via-cyan-300">
      <Header />
      <main>
        <Hero />
        <Features />
        <WhyFluentRoam />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
