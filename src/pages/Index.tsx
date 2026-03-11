import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ScheduleSection from "@/components/ScheduleSection";
import SponsorsSection from "@/components/SponsorsSection";
import FAQSection from "@/components/FAQSection";
import CollaboratorsSection from "@/components/CollaboratorsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pt-24 md:pt-28">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ScheduleSection />
      <SponsorsSection />
      <CollaboratorsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
