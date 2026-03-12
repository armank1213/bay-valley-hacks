import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MatrixText } from "@/components/ui/matrix-text"

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-6%" })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

const stats = [
  { value: "500+", label: "Hackers" },
  { value: "14", label: "Hours" },
  { value: "$25K+", label: "In prizes" },
  { value: "100%", label: "Free" },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 px-6" style={{ background: "rgb(26,24,21)" }}>
      <div className="max-w-5xl mx-auto">

        <Reveal>
          <p className="text-xs font-ui tracking-[0.28em] uppercase mb-10 text-[#e8521a]">
            About
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <MatrixText
            text="500 hackers. 14 hours."
            triggerOnView
            matrixColor="#e8521a"
            resolvedColor="rgb(237,230,220)"
            className="font-headline leading-tight mb-12 justify-start"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 600 }}
          />
        </Reveal>

        {/* Two-column */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 mb-20">
          <Reveal delay={0.1}>
            <p className="text-xs font-ui tracking-[0.2em] uppercase mb-3"
               style={{ color: "rgba(237,230,220,0.35)" }}>
              When &amp; Where
            </p>
            <p className="font-serif text-base font-medium" style={{ color: "rgb(237,230,220)" }}>
              April 18, 2026
            </p>
            <p className="font-serif text-base mt-0.5" style={{ color: "rgba(237,230,220,0.5)" }}>
              Bay Area, CA · In-person
            </p>
          </Reveal>
          <Reveal delay={0.13}>
            <p className="text-xs font-ui tracking-[0.2em] uppercase mb-3"
               style={{ color: "rgba(237,230,220,0.35)" }}>
              What you get
            </p>
            <p className="font-serif text-base leading-relaxed" style={{ color: "rgba(237,230,220,0.55)" }}>
              All meals covered, workshops from people who actually know their stuff,
              mentors around the clock, and $25K+ in prizes. No experience needed.
            </p>
          </Reveal>
        </div>

        {/* Stats */}
        <Reveal delay={0.18}>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y sm:divide-y-0"
               style={{
                 borderTop: "1px solid rgba(237,230,220,0.08)",
                 borderBottom: "1px solid rgba(237,230,220,0.08)",
                 borderLeft: "1px solid rgba(237,230,220,0.08)",
               }}>
            {stats.map((s) => (
              <div key={s.label} className="py-7 px-6"
                   style={{ borderRight: "1px solid rgba(237,230,220,0.08)" }}>
                <div className="font-headline font-black leading-none mb-1.5 text-[#e8521a]"
                     style={{ fontSize: "clamp(1.7rem, 4vw, 2.6rem)" }}>
                  {s.value}
                </div>
                <div className="text-xs font-ui tracking-widest uppercase"
                     style={{ color: "rgba(237,230,220,0.35)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>


      </div>
    </section>
  )
}
