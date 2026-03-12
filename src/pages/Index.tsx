import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import MarqueeStrip from "@/components/MarqueeStrip"
import AboutSection from "@/components/AboutSection"
import TracksSection from "@/components/TracksSection"
import ScheduleSection from "@/components/ScheduleSection"
import SponsorsSection from "@/components/SponsorsSection"
import CollaboratorsSection from "@/components/CollaboratorsSection"
import FAQSection from "@/components/FAQSection"
import Footer from "@/components/Footer"

export default function Index() {
  return (
    <div className="min-h-screen relative" style={{ background: "rgb(18,9,4)" }}>
      {/* Film grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.025]"
           style={{
             backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
             backgroundSize: "256px 256px",
             mixBlendMode: "overlay",
           }} />

      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <TracksSection />
      <ScheduleSection />
      <SponsorsSection />
      <CollaboratorsSection />
      <FAQSection />
      <Footer />
    </div>
  )
}
