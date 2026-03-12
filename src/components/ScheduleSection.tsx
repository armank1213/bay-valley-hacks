import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { MatrixText } from "@/components/ui/matrix-text"

type Day = "saturday"
interface Ev { time: string; title: string; desc: string; type: "main" | "workshop" | "food" | "fun" }

const schedule: Record<Day, Ev[]> = {
  saturday: [
    { time: "8:00 AM",  title: "Doors Open & Check-in", desc: "Pick up your badge, swag bag, find your workspace.", type: "main" },
    { time: "9:00 AM",  title: "Opening Ceremony", desc: "Welcome, sponsor intros, and theme reveal.", type: "main" },
    { time: "10:00 AM", title: "Hacking Begins", desc: "The 14-hour clock starts now.", type: "main" },
    { time: "12:00 PM", title: "Lunch", desc: "Recharge with a catered lunch.", type: "food" },
    { time: "2:00 PM",  title: "Workshops", desc: "Learn from industry professionals.", type: "workshop" },
    { time: "4:00 PM",  title: "Mentor Office Hours", desc: "1-on-1 help from industry mentors.", type: "main" },
    { time: "6:00 PM",  title: "Dinner", desc: "Evening meal and socializing.", type: "food" },
    { time: "8:00 PM",  title: "Final Submissions", desc: "Pencils down — submit your projects.", type: "main" },
    { time: "9:00 PM",  title: "Project Expo & Demos", desc: "Present to judges and attendees.", type: "main" },
    { time: "10:00 PM", title: "Closing Ceremony & Prizes", desc: "Awards, shoutouts, and wrap-up.", type: "main" },
  ],
}

const typeColor: Record<string, string> = {
  main: "#e8521a", workshop: "#c0922a", food: "#4a9a65", fun: "#6a7ec5",
}

const dayLabels: Record<Day, string> = {
  saturday: "Saturday Apr 18",
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

export default function ScheduleSection() {
  const [day, setDay] = useState<Day>("saturday")

  return (
    <section id="schedule" className="py-24 sm:py-32 px-6"
             style={{ background: "rgb(30,28,25)" }}>
      <div className="max-w-4xl mx-auto">

        <Reveal>
          <p className="text-xs font-ui tracking-[0.28em] uppercase mb-10 text-[#e8521a]">
            Schedule
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <MatrixText
            text="Saturday, April 18th"
            triggerOnView
            matrixColor="#e8521a"
            resolvedColor="rgb(237,230,220)"
            className="font-headline leading-tight mb-3 justify-start"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 600 }}
          />
          <p className="font-serif text-sm mb-10 italic" style={{ color: "rgba(237,230,220,0.38)" }}>
            We'll lock in exact times closer to the event.
          </p>
        </Reveal>

        {/* Day tabs */}
        <Reveal delay={0.1}>
          <div className="flex gap-2 mb-10 flex-wrap">
            {(Object.keys(schedule) as Day[]).map((d) => (
              <button key={d} onClick={() => setDay(d)}
                      className="px-5 py-2 rounded-lg text-xs font-ui font-semibold tracking-wide transition-all duration-200"
                      style={{
                        background: day === d ? "#e8521a" : "rgba(237,230,220,0.06)",
                        color: day === d ? "#fff" : "rgba(237,230,220,0.45)",
                        border: "none",
                      }}>
                {dayLabels[d]}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Timeline */}
        <AnimatePresence mode="wait">
          <motion.div key={day}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="relative pl-5"
            style={{ borderLeft: "2px solid rgba(237,230,220,0.08)" }}
          >
            {schedule[day].map((ev, i) => (
              <motion.div key={`${day}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex gap-5 py-5"
                style={{ borderBottom: "1px solid rgba(237,230,220,0.06)" }}
              >
                <div className="absolute -left-[17px] top-[26px] w-2 h-2 rounded-full"
                     style={{ background: typeColor[ev.type] }} />
                <span className="w-16 shrink-0 text-xs font-ui tabular-nums pt-0.5"
                      style={{ color: "rgba(237,230,220,0.3)" }}>
                  {ev.time}
                </span>
                <div>
                  <h3 className="font-serif font-medium text-sm" style={{ color: "rgb(237,230,220)" }}>{ev.title}</h3>
                  <p className="text-xs font-ui mt-0.5 leading-relaxed" style={{ color: "rgba(237,230,220,0.45)" }}>{ev.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
