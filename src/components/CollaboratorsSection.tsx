import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MatrixText } from "@/components/ui/matrix-text"

const collaborators = [
  {
    org: "MountainHacks",
    leads: ["Ansh Suba", "Arman Khan", "Shuvam Kumar Das"],
    organizers: ["Shravan Paladugula", "Ishita Ahelleya", "Aayan Singh", "Yash Kathrani", "Lara Mohan", "Shanmuk Sai Sundaraneedi", "Aahan Rathod", "Laxman Venkatraman", "Alexandra Popusoi", "Gia Vimal", "Sowmya Panguluri", "Zainab Fatima", "Eshwar Bhaversetti"],
  },
  {
    org: "StellarHacks",
    leads: ["Aditya Sujith", "Agastya Kuluvalli"],
    organizers: ["Niti Jain", "Arnav Bajjuri", "Raina Sarkar", "Mira Diwan", "Harshita Pandey", "Veera Jain", "Arnav Sharma", "Adyuth Chirakala", "Gia Vimal", "Ansh Suba", "Ruhan Mitra", "Aarushi Gupta", "Aarav Bhagya", "Shuvam Kumar Das"],
  },
  {
    org: "CHS Hackathon Club",
    leads: ["Pranauv Muthuraman", "Ashmit Pai"],
    organizers: ["Sunay Kaushal", "Dimitri Saha", "Vaibhav Mirayala", "Ron Datta Chowdhury"],
  },
  {
    org: "EastBayHacks",
    leads: ["Sidharth Sanegepalli"],
    organizers: ["Gautam Bhagavan", "Owen Cheng", "Adam Zheng", "Kamron", "Boston"],
  },
  {
    org: "BaHa",
    leads: ["Nandan Pericherla", "Pranauv Muthuraman"],
    organizers: ["Sunay Kaushal", "Chaitu Dupad"]
  },
  {
    org: "CoveHacks",
    leads: ["Shlok Madhekar"],
    organizers: ["Neil Bharwani", "Neel Patil", "Gia Vimal", "Dhiaan Dave", "Anish Dhamija", "Varshith Gude", "Pranauv Muthuraman", "Andrew Savio", "Sai Uppu", "Shreyan Mitra"],
  },
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

function OrgCard({ org, index }: { org: typeof collaborators[0]; index: number }) {
  return (
    <div className="relative rounded-2xl p-5"
         style={{
           background: "rgba(237,230,220,0.02)",
           border: "1px solid rgba(237,230,220,0.08)",
           boxShadow: "inset 0 0 40px rgba(0,0,0,0.28)",
         }}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] font-ui tracking-wider font-semibold px-1.5 py-0.5 rounded"
              style={{ background: "rgba(232,82,26,0.1)", color: "#e8521a" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-serif font-medium text-sm" style={{ color: "rgb(237,230,220)" }}>{org.org}</h3>
      </div>

      <div className="grid gap-4">
        <div>
          <p className="text-[10px] font-ui tracking-[0.2em] uppercase mb-2"
             style={{ color: "rgba(237,230,220,0.45)" }}>
            Leads
          </p>
          <div className="flex flex-wrap gap-2">
            {org.leads.map((lead) => (
              <span key={lead}
                    className="text-xs font-ui px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(232,82,26,0.1)", color: "rgba(237,230,220,0.8)" }}>
                {lead}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-ui tracking-[0.2em] uppercase mb-2"
             style={{ color: "rgba(237,230,220,0.45)" }}>
            Organizers
          </p>
          <div className="flex flex-wrap gap-2">
            {org.organizers.map((organizer) => (
              <span key={organizer}
                    className="text-xs font-ui px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(237,230,220,0.06)", color: "rgba(237,230,220,0.7)" }}>
                {organizer}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
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

        <div className="grid md:grid-cols-2 gap-6">
          {collaborators.map((org, i) => (
            <Reveal key={org.org} delay={0.08 + i * 0.06}>
              <OrgCard org={org} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
