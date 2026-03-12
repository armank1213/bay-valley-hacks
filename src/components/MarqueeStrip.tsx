import { motion } from "framer-motion"

const items = [
  "500+ Hackers",
  "14 Hours",
  "$25K+ Prizes",
  "Bay Area, CA",
  "April 18, 2026",
  "Best Overall",
  "Best AI/ML",
  "Best Fintech",
  "Best Hardware",
  "Best BioTech",
  "Free to Attend",
  "Grades 9–12",
  "Workshops",
  "Mentors",
  "All Meals Included",
]

const sep = (
  <span className="mx-4 inline-block w-1.5 h-1.5 rounded-full bg-[#e8521a] opacity-40 shrink-0" />
)

function Row({ reverse = false }: { reverse?: boolean }) {
  // Double the items for seamless loop
  const doubled = [...items, ...items]
  return (
    <div className="flex overflow-hidden whitespace-nowrap select-none">
      <motion.div
        className="flex items-center shrink-0"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: 32, ease: "linear" },
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-ui text-[11px] tracking-[0.18em] uppercase"
                  style={{ color: "rgba(237,230,220,0.25)" }}>
              {item}
            </span>
            {sep}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function MarqueeStrip() {
  return (
    <div className="relative py-5 overflow-hidden"
         style={{
           background: "rgb(22,20,17)",
           borderTop: "1px solid rgba(237,230,220,0.04)",
           borderBottom: "1px solid rgba(237,230,220,0.04)",
         }}>
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10"
           style={{ background: "linear-gradient(to right, rgb(22,20,17), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10"
           style={{ background: "linear-gradient(to left, rgb(22,20,17), transparent)" }} />
      <Row />
    </div>
  )
}
