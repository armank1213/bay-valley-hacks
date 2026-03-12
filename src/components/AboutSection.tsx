import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { MatrixText } from "@/components/ui/matrix-text"
import { Utensils, Lightbulb, Trophy } from "lucide-react"

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

function AnimatedNumber({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{value}{suffix}
    </span>
  )
}

const stats = [
  { value: 500, suffix: "+", label: "Hackers" },
  { value: 14, suffix: "", label: "Hours" },
  { value: 25, prefix: "$", suffix: "K+", label: "In prizes" },
  { value: 100, suffix: "%", label: "Free" },
]

const highlights = [
  { icon: <Utensils size={18} />, title: "All meals covered", desc: "Breakfast, lunch, dinner, and snacks — you focus on building." },
  { icon: <Lightbulb size={18} />, title: "Beginner-friendly", desc: "Workshops, starter kits, and mentors for first-time hackers." },
  { icon: <Trophy size={18} />, title: "$25K+ in prizes", desc: "Cash and prizes across five tracks — every project has a shot." },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 px-6 relative" style={{ background: "rgb(26,24,21)" }}>
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

        {/* Animated Stats */}
        <Reveal delay={0.18}>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y sm:divide-y-0"
               style={{
                 borderTop: "1px solid rgba(237,230,220,0.08)",
                 borderBottom: "1px solid rgba(237,230,220,0.08)",
                 borderLeft: "1px solid rgba(237,230,220,0.08)",
               }}>
            {stats.map((s) => (
              <div key={s.label} className="py-7 px-6 group relative overflow-hidden"
                   style={{ borderRight: "1px solid rgba(237,230,220,0.08)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                     style={{ background: "radial-gradient(circle at center, rgba(232,82,26,0.06), transparent 70%)" }} />
                <div className="font-headline font-black leading-none mb-1.5 text-[#e8521a] relative"
                     style={{ fontSize: "clamp(1.7rem, 4vw, 2.6rem)" }}>
                  <AnimatedNumber target={s.value} suffix={s.suffix} prefix={s.prefix || ""} />
                </div>
                <div className="text-xs font-ui tracking-widest uppercase relative"
                     style={{ color: "rgba(237,230,220,0.35)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Highlight cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={0.22 + i * 0.06}>
              <div className="group rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
                   style={{
                     background: "rgba(237,230,220,0.025)",
                     border: "1px solid rgba(237,230,220,0.06)",
                   }}>
                <div className="mb-3 inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-300 group-hover:bg-[rgba(232,82,26,0.12)]"
                     style={{
                       background: "rgba(237,230,220,0.05)",
                       color: "rgba(237,230,220,0.4)",
                     }}>
                  <span className="group-hover:text-[#e8521a] transition-colors duration-300">
                    {h.icon}
                  </span>
                </div>
                <h4 className="font-ui font-semibold text-sm mb-1 group-hover:text-[#e8521a] transition-colors duration-300"
                    style={{ color: "rgb(237,230,220)" }}>
                  {h.title}
                </h4>
                <p className="font-serif text-xs leading-relaxed"
                   style={{ color: "rgba(237,230,220,0.4)" }}>
                  {h.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
