import { SaveButton } from "@/components/ui/save-button"

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
}

export default function Footer() {
  return (
    <footer className="py-20 px-6" style={{ background: "rgb(17,16,14)" }}>
      <div className="max-w-5xl mx-auto">
        {/* CTA */}
        <div className="mb-16 pb-16" style={{ borderBottom: "1px solid rgba(237,230,220,0.07)" }}>
          <p className="font-headline leading-tight mb-3"
             style={{ color: "rgb(237,230,220)", fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)", fontWeight: 600 }}>
            Come build something.
          </p>
          <p className="font-serif text-sm mb-8 italic"
             style={{ color: "rgba(237,230,220,0.32)" }}>
            In person · April 18 · Bay Area · 100% free
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <SaveButton text={{ idle: "Apply Now", saving: "Registering...", saved: "You're in!" }} />
            <a href="mailto:bayvalleyhacks@gmail.com"
               className="px-6 py-3 rounded-full font-ui text-sm transition-all hover:bg-white/5"
               style={{ border: "1px solid rgba(237,230,220,0.1)", color: "rgba(237,230,220,0.4)" }}>
              bayvalleyhacks@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
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
              { label: "Schedule", onClick: () => scrollTo("#schedule") },
              { label: "FAQ", onClick: () => scrollTo("#faq") },
              { label: "Instagram", href: "https://instagram.com/bayvalleyhacks" },
              { label: "Discord", href: "https://discord.gg/" },
            ].map((l) => "href" in l ? (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                 className="text-xs font-ui hover:text-white transition-colors"
                 style={{ color: "rgba(237,230,220,0.25)" }}>
                {l.label}
              </a>
            ) : (
              <button key={l.label} onClick={l.onClick}
                      className="text-xs font-ui hover:text-white transition-colors"
                      style={{ color: "rgba(237,230,220,0.25)" }}>
                {l.label}
              </button>
            ))}
          </div>

          <p className="text-xs font-ui" style={{ color: "rgba(237,230,220,0.15)" }}>
            © {new Date().getFullYear()} Bay Valley Hacks
          </p>
        </div>
      </div>
    </footer>
  )
}
