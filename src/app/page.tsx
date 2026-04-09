import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import FeatureGrid from "@/components/FeatureGrid";
import EnvironmentalIntelligence from "@/components/EnvironmentalIntelligence";
import Integrations from "@/components/Integrations";
import IndustryHub from "@/components/IndustryHub";
import Roadmap from "@/components/Roadmap";
import DemoDashboard from "@/components/DemoDashboard";
import BookAChat from "@/components/BookAChat";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Benefits />
        <FeatureGrid />
        <EnvironmentalIntelligence />
        <Integrations />
        <IndustryHub />
        <Roadmap />
        <DemoDashboard />
        <BookAChat />
      </main>
      <Footer />
    </>
  );
}
