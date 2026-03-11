const Footer = () => (
  <footer className="relative py-16 px-6 border-t border-border noise-bg">
    <div className="relative z-10 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.ico"
            alt="Bay Valley Hacks Logo"
            className="w-8 h-8 rounded-lg "
            />
          <div>
            <span className="font-display font-semibold text-foreground">Bay Valley Hacks</span>
            <p className="text-xs text-muted-foreground font-mono">Bay Area's Biggest HS Hackathon</p>
          </div>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {[
            { label: "Instagram", href: "https://instagram.com/bayvalleyhacks" },
            { label: "Discord", href: "https://discord.gg/" },
            { label: "Email", href: "mailto:hello@bayvalleyhacks.com" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg glass text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground font-mono">
          © {new Date().getFullYear()} Bay Valley Hacks. All rights reserved.
        </p>
        <div className="flex gap-4 text-xs font-mono text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Code of Conduct</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
