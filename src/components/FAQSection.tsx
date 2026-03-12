import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { MatrixText } from "@/components/ui/matrix-text"

const faqs = [
  { q: "Who can come?", a: "Any high school student (grades 9–12). No coding experience required — complete beginners and seasoned hackers are both welcome." },
  { q: "Do I need a team?", a: "No. Register solo and find teammates at our team formation session at the start of the event. Teams are up to 4 people." },
  { q: "Is it actually free?", a: "Yes. All meals, snacks, swag, and workspace are covered. Thanks to our sponsors." },
  { q: "What are the tracks?", a: "We have five tracks: Best Overall, Best AI/ML, Best Fintech, Best Hardware, and Best BioTech." },
  { q: "What should I bring?", a: "Your laptop, charger, and any hardware you want to hack with. We handle the rest." },
  { q: "Do I need to know how to code?", a: "Not at all. Workshops for beginners, mentors to help, and tracks suited to all skill levels." },
  { q: "What are the prizes?", a: "Over $25,000 across tracks: Best Overall, Best AI/ML, Best Fintech, Best Hardware, and Best BioTech." },
  { q: "Code of conduct?", a: "We follow the MLH Code of Conduct. Bay Valley Hacks is a safe, inclusive, harassment-free space." },
]

function FAQItem({ q, a, delay }: { q: string; a: string; delay: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-4%" })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderBottom: "1px solid rgba(237,230,220,0.07)" }}>
      <button onClick={() => setOpen(!open)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left">
        <span className="font-serif font-medium text-sm sm:text-base"
              style={{ color: open ? "#e8521a" : "rgb(237,230,220)" }}>
          {q}
        </span>
        <span className="shrink-0 transition-colors"
              style={{ color: open ? "#e8521a" : "rgba(237,230,220,0.3)" }}>
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden">
            <p className="pb-5 text-sm font-serif leading-relaxed italic pr-8"
               style={{ color: "rgba(237,230,220,0.5)" }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-6%" })

  return (
    <section id="faq" ref={ref} className="py-24 sm:py-32 px-6"
             style={{ background: "rgb(26,24,21)" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12">
          <p className="text-xs font-ui tracking-[0.28em] uppercase mb-4 text-[#e8521a]">FAQ</p>
          <MatrixText
            text="Questions"
            triggerOnView
            matrixColor="#e8521a"
            resolvedColor="rgb(237,230,220)"
            className="font-headline leading-tight justify-start"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 600 }}
          />
        </motion.div>

        {faqs.map((f, i) => (
          <FAQItem key={i} q={f.q} a={f.a} delay={i * 0.04} />
        ))}

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 text-sm font-ui"
          style={{ color: "rgba(237,230,220,0.35)" }}>
          More questions?{" "}
          <a href="mailto:bayvalleyhacks@gmail.com"
             className="underline underline-offset-2 hover:text-[#e8521a] transition-colors">
            bayvalleyhacks@gmail.com
          </a>
        </motion.p>
      </div>
    </section>
  )
}
