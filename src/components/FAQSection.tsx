import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Who can participate?",
    a: "Bay Valley Hacks is open to all high school students (grades 9–12) in the Bay Area and beyond. No prior coding experience is required — we welcome beginners and experienced hackers alike!",
  },
  {
    q: "How much does it cost?",
    a: "Nothing! Bay Valley Hacks is completely free to attend. We provide meals, snacks, swag, and workspace — all thanks to our generous sponsors.",
  },
  {
    q: "Do I need a team?",
    a: "Nope! You can register solo and form a team at the event during our team formation session. Teams can have up to 4 members.",
  },
  {
    q: "What should I bring?",
    a: "Bring your laptop, charger, and any hardware you want to hack with. We'll provide everything else — food, drinks, Wi-Fi, power strips, and a comfortable hacking space.",
  },
  {
    q: "What are the prizes?",
    a: "We're offering over $25,000 in prizes across multiple tracks including Best Overall, Best AI/ML, Best Hardware, Best Civic Tech, and more. Specific prizes will be announced closer to the event.",
  },
  {
    q: "How is judging done?",
    a: "Projects are judged on creativity, technical complexity, design, and impact. Each team will demo their project to a panel of judges from industry and academia.",
  },
  {
    q: "Is there travel support?",
    a: "We're working on providing travel stipends for students traveling from outside the immediate Bay Area. More details coming soon.",
  },
  {
    q: "What about the Code of Conduct?",
    a: "We follow the MLH Code of Conduct. Bay Valley Hacks is dedicated to providing a safe, inclusive, and harassment-free experience for everyone.",
  },
];

const FAQSection = () => {
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
    <section id="faq" ref={sectionRef} className="relative py-32 px-6 noise-bg">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full glass glow-border text-xs font-mono text-primary tracking-widest uppercase mb-6">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight">
            Got <span className="text-gradient-primary">Questions?</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-display text-lg">
            Everything you need to know before the big weekend.
          </p>
        </div>

        {/* Accordion */}
        <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass rounded-xl border-none px-6 overflow-hidden data-[state=open]:glow-border transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary hover:no-underline py-5 text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className={`text-center mt-12 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-muted-foreground text-sm font-mono">
            Still have questions?{" "}
            <a href="mailto:hello@bayvalleyhacks.com" className="text-primary hover:underline">
              Reach out to us →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
