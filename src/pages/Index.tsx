import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import ScheduleSection from "@/components/ScheduleSection"
import SponsorsSection from "@/components/SponsorsSection"
import CollaboratorsSection from "@/components/CollaboratorsSection"
import FAQSection from "@/components/FAQSection"
import Footer from "@/components/Footer"

export default function Index() {
  return (
    <div className="min-h-screen" style={{ background: "rgb(18,9,4)" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ScheduleSection />
      <SponsorsSection />
      <CollaboratorsSection />
      <FAQSection />
      <Footer />
    </div>
  )
}
