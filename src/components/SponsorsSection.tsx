import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

interface Sponsor {
  name: string;
  tier: "platinum" | "gold" | "silver";
}

const sponsors: Record<string, Sponsor[]> = {
  platinum: [
    { name: "TechCorp", tier: "platinum" },
    { name: "InnovateLabs", tier: "platinum" },
  ],
  gold: [
    { name: "CloudBase", tier: "gold" },
    { name: "DevTools Inc", tier: "gold" },
    { name: "AI Systems", tier: "gold" },
  ],
  silver: [
    { name: "StartupHub", tier: "silver" },
    { name: "CodeAcademy", tier: "silver" },
    { name: "HackFund", tier: "silver" },
    { name: "ByteWorks", tier: "silver" },
  ],
};

const tierStyles: Record<string, { border: string; size: string }> = {
  platinum: { border: "glow-border", size: "h-24 sm:h-28" },
  gold: { border: "border border-accent/30", size: "h-20 sm:h-24" },
  silver: { border: "border border-border", size: "h-16 sm:h-20" },
};

const SponsorsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="sponsors" ref={sectionRef} className="relative py-32 px-6 noise-bg">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full glass glow-border text-xs font-mono text-primary tracking-widest uppercase mb-6">
            Sponsors & Partners
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight">
            Backed by the <span className="text-gradient-primary">Best</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-display text-lg max-w-xl mx-auto">
            Our sponsors make Bay Valley Hacks possible. Interested in sponsoring?
          </p>
          <a
            href="mailto:sponsors@bayvalleyhacks.com"
            className="inline-block mt-4 px-6 py-2.5 rounded-xl glow-border text-primary font-display font-semibold text-sm hover:bg-primary/5 transition-all duration-300"
          >
            Become a Sponsor →
          </a>
        </div>

        {/* Tiers */}
        {(["platinum", "gold", "silver"] as const).map((tier, ti) => (
          <ScrollReveal
            key={tier}
            delayMs={200 + ti * 120}
            className={`mb-12 ${visible ? "" : ""}`}
          >
            <div>
              <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-[0.3em] text-center mb-6">
                {tier} sponsors
              </h3>
              <div
                className={`flex flex-wrap justify-center gap-4 ${
                  tier === "platinum" ? "" : ""
                }`}
              >
                {sponsors[tier].map((sponsor, i) => (
                  <ScrollReveal
                    key={sponsor.name}
                    delayMs={300 + ti * 120 + i * 70}
                    className="will-change-transform"
                  >
                    <div
                      className={`glass rounded-2xl ${tierStyles[tier].border} ${tierStyles[tier].size} px-8 flex items-center justify-center group hover:bg-primary/5 transition-all duration-500 hover:-translate-y-1`}
                    >
                      <span className="font-display font-bold text-muted-foreground/60 group-hover:text-foreground transition-colors text-lg">
                        {sponsor.name}
                      </span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default SponsorsSection;
