import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShaderAnimation } from "@/components/ui/shader-animation"
import { GoldenGateBridge } from "@/components/GoldenGateBridge"
import { MatrixText } from "@/components/ui/matrix-text"
import { SaveButton } from "@/components/ui/save-button"

const TARGET = new Date("2026-04-18T08:00:00")

function useCountdown() {
  const calc = useCallback(() => {
    const diff = TARGET.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }, [])
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc), 1000)
    return () => clearInterval(id)
  }, [calc])
  return time
}

function CountUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0")
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-[58px] h-[56px] rounded-lg overflow-hidden"
           style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
        <AnimatePresence mode="wait">
          <motion.span key={display}
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center font-headline tabular-nums"
            style={{ color: "#e8521a", fontSize: "1.65rem", fontWeight: 700 }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[9px] font-ui tracking-[0.2em] uppercase"
            style={{ color: "rgba(255,255,255,0.28)" }}>
        {label}
      </span>
    </div>
  )
}

export default function HeroSection() {
  const time = useCountdown()

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: "660px" }}>
      {/* Layer 1 — Shader */}
      <div className="absolute inset-0 z-0">
        <ShaderAnimation />
      </div>

      {/* Layer 2 — Bridge */}
      <GoldenGateBridge />

      {/* Layer 3 — Vignette. Fade to dark gray at bottom (matching site bg). */}
      <div className="absolute inset-0 z-20 pointer-events-none"
           style={{
             background:
               "radial-gradient(ellipse 85% 50% at 50% 46%, transparent 22%, rgba(8,5,3,0.52) 76%)," +
               "linear-gradient(to bottom, rgba(8,5,3,0.5) 0%, transparent 18%, transparent 58%, rgb(26,24,21) 100%)",
           }} />

      {/* Layer 4 — Content */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-7 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-ui tracking-widest uppercase"
            style={{ background: "rgba(232,82,26,0.12)", border: "1px solid rgba(232,82,26,0.28)", color: "#e8521a" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8521a] animate-pulse" />
            April 18, 2026 · Bay Area, CA
          </motion.div>

          {/* Matrix title — MUCH bigger, Tiempos Headline Black */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="mb-6 w-full"
          >
            <MatrixText
              text="BAY VALLEY HACKS"
              initialDelay={550}
              letterInterval={80}
              letterAnimationDuration={460}
              matrixColor="#e8521a"
              resolvedColor="rgb(237,230,220)"
              className="font-headline leading-none tracking-tighter"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 900 }}
            />
          </motion.div>

          {/* Tagline — Tiempos Text italic */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif italic text-base sm:text-lg max-w-md mb-5 leading-relaxed"
            style={{ color: "rgba(237,230,220,0.5)", fontWeight: 400 }}
          >
            The Bay Area's largest high school hackathon —<br />
            500+ hackers, 14 hours.
          </motion.p>

          {/* Info pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.4 }}
            className="flex flex-wrap justify-center gap-2 mb-7"
          >
            {["14 Hours", "Grades 9–12", "$25K+ Prizes", "Free to Attend"].map((p) => (
              <span key={p} className="px-3 py-1 rounded-full text-[11px] font-ui"
                    style={{ background: "rgba(237,230,220,0.06)", border: "1px solid rgba(237,230,220,0.1)", color: "rgba(237,230,220,0.45)" }}>
                {p}
              </span>
            ))}
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.25, duration: 0.5 }}
            className="mb-8"
          >
            <p className="text-[9px] font-ui tracking-[0.28em] uppercase mb-3"
               style={{ color: "rgba(237,230,220,0.25)" }}>
              Countdown to hack
            </p>
            <div className="flex items-center gap-3">
              <CountUnit value={time.days} label="Days" />
              <span className="text-xl font-headline mb-4" style={{ color: "rgba(232,82,26,0.3)", fontWeight: 700 }}>:</span>
              <CountUnit value={time.hours} label="Hrs" />
              <span className="text-xl font-headline mb-4" style={{ color: "rgba(232,82,26,0.3)", fontWeight: 700 }}>:</span>
              <CountUnit value={time.minutes} label="Min" />
              <span className="text-xl font-headline mb-4" style={{ color: "rgba(232,82,26,0.3)", fontWeight: 700 }}>:</span>
              <CountUnit value={time.seconds} label="Sec" />
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.45, duration: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <SaveButton text={{ idle: "Apply Now", saving: "Registering...", saved: "You're in!" }} />
            <a href="#about"
               onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) }}
               className="px-7 py-3 rounded-full font-ui font-medium text-sm transition-all hover:bg-white/5"
               style={{ border: "1px solid rgba(237,230,220,0.15)", color: "rgba(237,230,220,0.55)" }}>
              Learn More
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll caret */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5"
        style={{ color: "rgba(237,230,220,0.2)" }}
      >
        <span className="text-[9px] font-ui tracking-[0.25em] uppercase">scroll</span>
        <motion.svg width="14" height="8" viewBox="0 0 14 8" fill="none"
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
          <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </motion.svg>
      </motion.div>
    </section>
  )
}
