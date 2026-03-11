import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "500+", label: "Hackers" },
  { value: "24", label: "Hours" },
  { value: "$25K+", label: "In Prizes" },
  { value: "5+", label: "Partner Orgs" },
];

const cards = [
  {
    icon: "🤝",
    title: "Five Bay Area Orgs — One Massive Event",
    body: "We bring local student hackathons together to multiply mentorship, sponsorship, and impact.",
  },
  {
    icon: "🧑‍🏫",
    title: "Real Mentors, Real Guidance",
    body: "Industry professionals and experienced developers available throughout the event for 1-on-1 support.",
  },
  {
    icon: "🏆",
    title: "Workshops & Track Prizes",
    body: "Specialized tracks in AI/ML, Hardware, Civic Tech, and more — each with dedicated workshops and prizes.",
  },
  {
    icon: "🚀",
    title: "Career Pipelines",
    body: "Connect with sponsors and recruiters. Turn your weekend project into an internship opportunity.",
  },
];

const useInView = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
};

const AboutSection = () => {
  const { ref: sectionRef, visible } = useInView(0.1);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6 noise-bg">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full glass glow-border text-xs font-mono text-primary tracking-widest uppercase mb-6">
            What & Why
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight">
            More Than a <span className="text-gradient-primary">Hackathon</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-display text-lg max-w-2xl mx-auto">
            Bay Valley Hacks unites student organizers from across the Bay Area for one massive weekend of creation, learning, and community.
          </p>
        </div>

        {/* Stats bar */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass glow-border rounded-2xl p-6 text-center group hover:bg-primary/5 transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-3xl sm:text-4xl font-display font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={`glass rounded-2xl p-8 group hover:glow-border transition-all duration-500 hover:-translate-y-1 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <span className="text-3xl mb-4 block">{card.icon}</span>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
