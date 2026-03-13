import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const links = [
  { label: "About", href: "#about" },
  { label: "Tracks", href: "#tracks" },
  { label: "Schedule", href: "#schedule" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Team", href: "#collaborators" },
  { label: "FAQ", href: "#faq" },
]

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let lastScrollY = 0
    const fn = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      if (y < 60) {
        setHidden(false)
      } else if (y > lastScrollY + 6) {
        setHidden(true)
        setOpen(false)
      } else if (y < lastScrollY - 4) {
        setHidden(false)
      }
      lastScrollY = y
    }
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const visible = !hidden || hovered

  const bg = scrolled ? "rgba(32,30,27,0.96)" : "rgba(255,255,255,0.06)"
  const textColor = scrolled ? "rgba(237,230,220,0.75)" : "rgba(237,230,220,0.65)"
  const borderColor = scrolled ? "rgba(60,55,50,0.9)" : "rgba(255,255,255,0.1)"

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4"
      style={{ paddingTop: "calc(1rem + env(safe-area-inset-top))" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-4xl"
      >
        <div
          className="flex items-center justify-between px-5 py-2.5 rounded-2xl transition-all duration-400"
          style={{
            background: bg,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${borderColor}`,
            boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
          }}
        >
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}
             className="flex items-center gap-2 shrink-0">
            <img src="/logo.ico" alt="BVH" className="w-6 h-6 rounded-md" />
            <span className="font-display font-bold text-xs tracking-wide hidden sm:block"
                  style={{ color: "rgb(237,230,220)", transition: "color 0.3s" }}>
              Bay Valley Hacks
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {links.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.href)}
                      className="px-3 py-1.5 text-xs font-ui font-medium tracking-wide rounded-lg transition-all hover:bg-black/5"
                      style={{ color: textColor }}>
                {l.label}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-2">
            <a href="https://discord.gg/RUDS4Znz" target="_blank" rel="noopener noreferrer"
               className="p-1.5 rounded-lg transition-all hover:bg-black/5"
               style={{ color: textColor }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.015.043.03.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a href="https://luma.com/6fla5nan" target="_blank" rel="noopener noreferrer"
               className="px-4 py-1.5 rounded-xl font-ui font-semibold text-xs tracking-wide transition-all hover:brightness-110 active:scale-95"
               style={{ background: "#e8521a", color: "#fff" }}>
              Apply
            </a>
          </div>

          {/* Mobile */}
          <button onClick={() => setOpen(!open)}
                  className="md:hidden p-1.5 rounded-lg"
                  style={{ color: textColor }}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scaleY: 0.9 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.9 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="mt-2 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(32,30,27,0.97)",
                border: "1px solid rgba(60,55,50,0.9)",
                backdropFilter: "blur(20px)",
                transformOrigin: "top",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                {links.map((l) => (
                  <button key={l.label} onClick={() => { scrollTo(l.href); setOpen(false) }}
                          className="text-left px-3 py-2.5 rounded-xl text-sm font-ui transition-all hover:bg-white/5"
                          style={{ color: "rgba(237,230,220,0.65)" }}>
                    {l.label}
                  </button>
                ))}
                <a href="https://luma.com/6fla5nan" target="_blank" rel="noopener noreferrer"
                   className="mt-2 text-center px-5 py-2.5 rounded-xl font-ui font-semibold text-sm"
                   style={{ background: "#e8521a", color: "#fff" }}>
                  Apply
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
