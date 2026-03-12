import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin } from "lucide-react"
import { MatrixText } from "@/components/ui/matrix-text"

const orgs = [
  { name: "MHHS Hackathon Club", city: "Mountain House", focus: "Student-run hackathons and tech community building" },
  { name: "StellarHacks", city: "Pleasanton", focus: "High school hackathon organizing collective" },
  { name: "CHS Hackathon Club", city: "Bay Area", focus: "Student-led innovation and competitive hacking" },
  { name: "EastBayHacks", city: "East Bay", focus: "East Bay student hackathon community" },
  { name: "BAHA", city: "Bay Area", focus: "Bay Area Hackathon Association" },
  { name: "CoveHacks", city: "Bay Area", focus: "Student-organized hackathon network" },
]

const pins = [
  { name: "MHHS Hackathon Club", sub: "Mountain House", left: "44%", top: "44%" },
  { name: "StellarHacks",        sub: "Pleasanton",     left: "62%", top: "22%" },
  { name: "CHS Hackathon Club",  sub: "Bay Area",       left: "74%", top: "54%" },
  { name: "EastBayHacks",        sub: "East Bay",       left: "55%", top: "70%" },
  { name: "BAHA",                sub: "Bay Area",       left: "18%", top: "30%" },
  { name: "CoveHacks",           sub: "Bay Area",       left: "22%", top: "62%" },
]

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

export default function CollaboratorsSection() {
  return (
    <section id="collaborators" className="py-24 sm:py-32 px-6"
             style={{ background: "rgb(30,28,25)" }}>
      <div className="max-w-5xl mx-auto">

        <Reveal>
          <p className="text-xs font-ui tracking-[0.28em] uppercase mb-10 text-[#e8521a]">
            Collaborators
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <MatrixText
            text="Built by students, for students."
            triggerOnView
            matrixColor="#e8521a"
            resolvedColor="rgb(237,230,220)"
            className="font-headline leading-tight mb-12 justify-start"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 600 }}
          />
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Org list */}
          <div>
            {orgs.map((org, i) => (
              <Reveal key={org.name} delay={0.08 + i * 0.07}>
                <div className="flex gap-4 py-5" style={{ borderBottom: "1px solid rgba(237,230,220,0.07)" }}>
                  <div className="w-0.5 bg-[#e8521a] rounded-full shrink-0" style={{ minHeight: "44px" }} />
                  <div>
                    <h3 className="font-serif font-medium text-sm" style={{ color: "rgb(237,230,220)" }}>{org.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5 mb-1">
                      <MapPin size={10} className="text-[#e8521a]" />
                      <span className="text-xs font-ui" style={{ color: "rgba(237,230,220,0.35)" }}>{org.city}, CA</span>
                    </div>
                    <p className="text-xs font-ui" style={{ color: "rgba(237,230,220,0.45)" }}>{org.focus}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Map */}
          <Reveal delay={0.25}>
            <div className="relative rounded-xl overflow-hidden aspect-[4/3]"
                 style={{ background: "rgba(237,230,220,0.03)", border: "1px solid rgba(237,230,220,0.08)" }}>
              {/* Contour lines */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.07]"
                   viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                {[20, 50, 80, 110, 140].map((r) => (
                  <ellipse key={r} cx="200" cy="150" rx={r * 2} ry={r}
                           fill="none" stroke="rgb(237,230,220)" strokeWidth="1" />
                ))}
              </svg>

              {/* All 6 pins */}
              {pins.map((pin, i) => (
                <motion.div key={pin.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.12, type: "spring", stiffness: 280 }}
                  className="absolute flex flex-col items-start gap-1"
                  style={{ left: pin.left, top: pin.top }}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#e8521a]"
                         style={{ boxShadow: "0 0 10px rgba(232,82,26,0.5)" }} />
                    <span className="text-[10px] font-ui tracking-wider uppercase"
                          style={{ color: "rgba(237,230,220,0.6)" }}>
                      {pin.name}
                    </span>
                  </div>
                  <span className="text-[9px] font-ui rounded-full px-2 py-0.5 ml-4"
                        style={{ background: "rgba(232,82,26,0.1)", color: "rgba(237,230,220,0.5)" }}>
                    {pin.sub}
                  </span>
                </motion.div>
              ))}

              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg px-3 py-1.5 text-[10px] font-ui"
                   style={{ background: "rgba(26,24,21,0.9)", border: "1px solid rgba(237,230,220,0.1)", color: "rgba(237,230,220,0.35)" }}>
                <div className="w-2 h-2 rounded-full bg-[#e8521a]" />
                Partner organizations
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
