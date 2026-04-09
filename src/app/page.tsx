import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import EnvironmentalIntelligence from "@/components/EnvironmentalIntelligence";
import IndustryHub from "@/components/IndustryHub";
import Roadmap from "@/components/Roadmap";
import DemoDashboard from "@/components/DemoDashboard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeatureGrid />
        <EnvironmentalIntelligence />
        <IndustryHub />
        <Roadmap />
        <DemoDashboard />
      </main>
      <Footer />
    </>
  );
}
