import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SaveButton } from "@/components/ui/save-button"

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
}

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <footer ref={ref} className="relative py-20 px-6 overflow-hidden" style={{ background: "rgb(14,13,11)" }}>
      {/* Radial glow behind CTA */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
           style={{ background: "radial-gradient(ellipse, rgba(232,82,26,0.06) 0%, transparent 60%)" }} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 pb-16 text-center"
          style={{ borderBottom: "1px solid rgba(237,230,220,0.07)" }}
        >
          <p className="text-xs font-ui tracking-[0.28em] uppercase mb-6 text-[#e8521a]">
            Ready?
          </p>
          <p className="font-headline leading-tight mb-3"
             style={{ color: "rgb(237,230,220)", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 700 }}>
            Come build something.
          </p>
          <p className="font-serif text-sm mb-10 italic max-w-md mx-auto"
             style={{ color: "rgba(237,230,220,0.32)" }}>
            In person · April 18 · Bay Area · 100% free
          </p>
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <SaveButton
              text={{ idle: "Apply Now", saving: "Registering...", saved: "You're in!" }}
              href="https://luma.com/6fla5nan"
              target="_blank"
              rel="noopener noreferrer"
            />
            <a href="mailto:bayvalleyhacks@gmail.com"
               className="px-6 py-3 rounded-full font-ui text-sm transition-all hover:bg-white/5 hover:border-[rgba(237,230,220,0.2)]"
               style={{ border: "1px solid rgba(237,230,220,0.1)", color: "rgba(237,230,220,0.4)" }}>
              bayvalleyhacks@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-2">
            <img src="/logo.ico" alt="BVH" className="w-6 h-6 rounded-md opacity-60" />
            <span className="font-headline font-bold text-xs tracking-wide"
                  style={{ color: "rgba(237,230,220,0.35)" }}>
              Bay Valley Hacks
            </span>
          </div>

          <div className="flex flex-wrap gap-5">
            {[
              { label: "About", onClick: () => scrollTo("#about") },
              { label: "Tracks", onClick: () => scrollTo("#tracks") },
              { label: "Schedule", onClick: () => scrollTo("#schedule") },
              { label: "FAQ", onClick: () => scrollTo("#faq") },
              { label: "Instagram", href: "https://www.instagram.com/bay_valley_hacks?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr"},
              { label: "Discord", href: "https://discord.gg/RUDS4Znz"},
            ].map((l) => "href" in l ? (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                 className="text-xs font-ui hover:text-[#e8521a] transition-colors"
                 style={{ color: "rgba(237,230,220,0.25)" }}>
                {l.label}
              </a>
            ) : (
              <button key={l.label} onClick={l.onClick}
                      className="text-xs font-ui hover:text-[#e8521a] transition-colors"
                      style={{ color: "rgba(237,230,220,0.25)" }}>
                {l.label}
              </button>
            ))}
          </div>

          <p className="text-xs font-ui" style={{ color: "rgba(237,230,220,0.15)" }}>
            © {new Date().getFullYear()} Bay Valley Hacks
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
