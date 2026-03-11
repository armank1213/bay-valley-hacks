import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Schedule", href: "#schedule" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Collaborators", href: "#collaborators" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled ? "w-[95%] max-w-5xl" : "w-[90%] max-w-4xl"
      }`}
    >
      <div
        className={`glass rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "shadow-lg shadow-primary/5" : ""
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 glow-border flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <span className="text-primary font-bold font-mono text-sm">BV</span>
          </div>
          <span className="font-display font-semibold text-foreground tracking-tight hidden sm:inline">
            Bay Valley Hacks
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleClick(link.href)}
              className="px-3 py-1.5 text-sm font-mono text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide uppercase"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Register CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#register"
            className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
          >
            Register
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground p-1"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="glass rounded-2xl mt-2 p-4 md:hidden animate-fade-in">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleClick(link.href)}
                className="text-left px-3 py-2.5 text-sm font-mono text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors uppercase tracking-wide"
              >
                {link.label}
              </button>
            ))}
            <a
              href="#register"
              className="mt-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm text-center"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
