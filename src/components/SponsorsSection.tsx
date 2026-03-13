import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MatrixText } from "@/components/ui/matrix-text"

const MAILTO = "mailto:sponsors@bayvalleyhacks.com?subject=Sponsoring%20Bay%20Valley%20Hacks"

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-6%" })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

const tiers = [
  { name: "Partners", slots: ["+", "+", "+"], h: 80, minW: 180 },
  { name: "Gold",     slots: ["+", "+", "+"],          h: 68, minW: 150 },
  { name: "Silver",   slots: ["+", "+", "+", "+"],     h: 56, minW: 110 },
  { name: "Bronze",   slots: ["+", "+", "+", "+", "+", "+"], h: 48, minW: 90  },
]

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="py-24 sm:py-32 px-6" style={{ background: "rgb(26,24,21)" }}>
      <div className="max-w-5xl mx-auto">

        <Reveal>
          <p className="text-xs font-ui tracking-[0.28em] uppercase mb-10 text-[#e8521a]">Sponsors</p>
        </Reveal>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
          <Reveal delay={0.05}>
            <MatrixText
              text="Our backers"
              triggerOnView
              matrixColor="#e8521a"
              resolvedColor="rgb(237,230,220)"
              className="font-headline leading-tight justify-start"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 600 }}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex flex-wrap gap-4 text-sm font-ui" style={{ color: "rgba(237,230,220,0.35)" }}>
              <a href="https://drive.google.com/file/d/1IvsVs252QljS-41NxoOR9AjUO6RVwS8j/view?usp=sharing"
                 target="_blank" rel="noopener noreferrer"
                 className="px-3 py-1.5 rounded-lg border transition-all hover:text-[#e8521a] hover:border-[#e8521a]/60"
                 style={{ borderColor: "rgba(237,230,220,0.2)", color: "rgba(237,230,220,0.7)" }}>
                View Prospectus
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="font-serif text-sm mb-12 italic max-w-lg"
             style={{ color: "rgba(237,230,220,0.4)" }}>
            Bay Valley Hacks runs on support from companies that want to invest in the next generation.
          </p>
        </Reveal>

        <div className="flex flex-col gap-10">
          {tiers.map((tier, ti) => (
            <Reveal key={tier.name} delay={0.12 + ti * 0.08}>
              <div className="flex items-center gap-4 mb-5">
                <span className="text-xs font-ui tracking-[0.22em] uppercase"
                      style={{ color: "rgba(237,230,220,0.3)" }}>
                  {tier.name}
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(237,230,220,0.07)" }} />
              </div>
              <div className="flex flex-wrap gap-3">
                {tier.slots.map((label, si) => (
                  <a key={si} href={MAILTO}
                     className="flex items-center justify-center rounded-lg transition-all duration-200 hover:-translate-y-0.5 group"
                     style={{
                       height: `${tier.h}px`,
                       minWidth: `${tier.minW}px`,
                       padding: "0 20px",
                       background: "rgba(237,230,220,0.03)",
                       border: "1px dashed rgba(237,230,220,0.1)",
                     }}>
                    <span className="text-sm font-ui group-hover:text-[#e8521a] transition-colors duration-150"
                          style={{ color: "rgba(237,230,220,0.25)" }}>
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.45} className="mt-12 flex flex-wrap gap-3">
          <a href="mailto:bayvalleyhacks@gmail.com"
             className="px-5 py-2.5 rounded-lg font-ui font-semibold text-sm transition-all hover:bg-[#e8521a]/10"
             style={{ border: "1.5px solid #e8521a", color: "#e8521a" }}>
            Become a partner
          </a>
        </Reveal>
      </div>
    </section>
  )
}
