import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { MatrixText } from "@/components/ui/matrix-text"

const tracks = [
  {
    name: "Best Overall",
    desc: "The grand prize. Show us something we've never seen before — the project that makes judges forget about every other demo.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, rgba(232,82,26,0.15), rgba(255,170,80,0.08))",
    glow: "rgba(232,82,26,0.3)",
  },
  {
    name: "Best AI/ML",
    desc: "Push the boundaries of machine intelligence. From fine-tuned models to novel architectures — build something that thinks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12h8M12 8v8M7 7l2 2M15 7l2 2M7 17l2-2M15 17l2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, rgba(100,180,255,0.12), rgba(160,120,255,0.08))",
    glow: "rgba(100,180,255,0.25)",
  },
  {
    name: "Best Fintech",
    desc: "Reimagine money, payments, or financial access. Build tools that make the financial world more open, fair, or efficient.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, rgba(74,220,130,0.12), rgba(34,197,94,0.06))",
    glow: "rgba(74,220,130,0.25)",
  },
  {
    name: "Best Hardware",
    desc: "Atoms over bits. Bring circuits, sensors, and physical builds. If it blinks, moves, or measures — we want to see it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="8" y="8" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, rgba(255,200,60,0.12), rgba(232,160,26,0.06))",
    glow: "rgba(255,200,60,0.25)",
  },
  {
    name: "Best BioTech",
    desc: "Where code meets biology. Health, genomics, environmental science — use tech to solve problems in the living world.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 22c4-4 8-7.58 8-12a8 8 0 10-16 0c0 4.42 4 8 8 12z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2v10M8.5 7.5c2-1 5-1 7 0M7 12c2.5-1.5 7.5-1.5 10 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, rgba(180,120,255,0.12), rgba(140,80,220,0.06))",
    glow: "rgba(180,120,255,0.25)",
  },
]

function TrackCard({ track, index }: { track: typeof tracks[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-8%" })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      <motion.div
        animate={{
          scale: hovered ? 1.02 : 1,
          y: hovered ? -4 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl p-6 sm:p-7 overflow-hidden cursor-default h-full"
        style={{
          background: track.gradient,
          border: `1px solid ${hovered ? "rgba(237,230,220,0.12)" : "rgba(237,230,220,0.06)"}`,
          transition: "border-color 0.3s",
        }}
      >
        {/* Glow orb on hover */}
        <motion.div
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl pointer-events-none"
          animate={{ opacity: hovered ? 0.6 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: track.glow }}
        />

        {/* Noise texture */}
        <div className="absolute inset-0 rounded-2xl opacity-[0.03] pointer-events-none"
             style={{
               backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
               backgroundSize: "128px 128px",
             }} />

        <div className="relative z-10">
          {/* Icon */}
          <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl"
               style={{
                 background: "rgba(237,230,220,0.06)",
                 border: "1px solid rgba(237,230,220,0.08)",
                 color: "rgba(237,230,220,0.6)",
               }}>
            {track.icon}
          </div>

          {/* Track number */}
          <div className="absolute top-0 right-0 text-[10px] font-ui tracking-[0.2em] uppercase"
               style={{ color: "rgba(237,230,220,0.15)" }}>
            Track {String(index + 1).padStart(2, "0")}
          </div>

          {/* Title */}
          <h3 className="font-headline font-semibold text-lg mb-2"
              style={{ color: "rgb(237,230,220)" }}>
            {track.name}
          </h3>

          {/* Desc */}
          <p className="font-serif text-sm leading-relaxed"
             style={{ color: "rgba(237,230,220,0.45)" }}>
            {track.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-6%" })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

export default function TracksSection() {
  return (
    <section id="tracks" className="py-24 sm:py-32 px-6 relative"
             style={{ background: "rgb(22,20,17)" }}>
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
           style={{ background: "radial-gradient(ellipse, rgba(232,82,26,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <Reveal>
          <p className="text-xs font-ui tracking-[0.28em] uppercase mb-10 text-[#e8521a]">
            Tracks
          </p>
        </Reveal>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
          <Reveal delay={0.05}>
            <MatrixText
              text="Five ways to win."
              triggerOnView
              matrixColor="#e8521a"
              resolvedColor="rgb(237,230,220)"
              className="font-headline leading-tight justify-start"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 600 }}
            />
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <p className="font-serif text-sm mb-14 italic max-w-lg"
             style={{ color: "rgba(237,230,220,0.38)" }}>
            Pick a track that excites you. Every project competes for Best Overall too.
          </p>
        </Reveal>

        {/* Top row: 3 cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {tracks.slice(0, 3).map((track, i) => (
            <TrackCard key={track.name} track={track} index={i} />
          ))}
        </div>

        {/* Bottom row: 2 cards centered */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-[calc(66.666%+0.5rem)] mx-auto">
          {tracks.slice(3).map((track, i) => (
            <TrackCard key={track.name} track={track} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  )
}
