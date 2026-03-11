import { useState, useEffect, useCallback } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date("2026-08-15T09:00:00");

const useCountdown = (): TimeLeft => {
  const calc = useCallback(() => {
    const diff = TARGET_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor(diff / (1000 * 60 * 60) % 24),
      minutes: Math.floor(diff / (1000 * 60) % 60),
      seconds: Math.floor(diff / 1000 % 60)
    };
  }, []);

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc), 1000);
    return () => clearInterval(id);
  }, [calc]);

  return time;
};

const CountdownUnit = ({ value, label }: {value: number;label: string;}) =>
<div className="flex flex-col items-center">
    <div className="glow-border rounded-xl px-4 py-3 min-w-[70px] bg-secondary/50">
      <span className="text-3xl sm:text-4xl font-mono font-bold text-primary tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="text-xs font-mono text-muted-foreground mt-2 uppercase tracking-widest">
      {label}
    </span>
  </div>;


const HeroSection = () => {
  const time = useCountdown();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Radial glow following mouse */}
      <div
        className="absolute pointer-events-none w-[600px] h-[600px] rounded-full transition-all duration-700 ease-out"
        style={{
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          background:
          "radial-gradient(circle, hsl(40 95% 55% / 0.08) 0%, transparent 70%)"
        }} />
      

      {/* Static ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-glow-secondary/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Pre-title */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
          


          
        </div>

        {/* Main Title */}
        <h1
          className="mt-8 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight leading-[0.9] animate-fade-in"
          style={{ animationDelay: "0.4s", opacity: 0 }}>
          
          <span className="text-foreground">Code. Innovate.</span>
          <br />
          <span className="text-gradient-primary glow-text">Learn.</span>
        </h1>

        {/* Tagline */}
        <p
          className="mt-6 text-lg sm:text-xl text-muted-foreground font-display max-w-2xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.6s", opacity: 0 }}>
          
          A unified Bay Area student hackathon where teams build, mentors guide, and big ideas take flight.
          <br />
          <span className="text-foreground/70">One weekend. Unlimited potential.</span>
        </p>

        {/* Info pills */}
        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-in"
          style={{ animationDelay: "0.8s", opacity: 0 }}>
          
          {[
          { icon: "📅", text: "August 2026" },
          { icon: "📍", text: "Bay Area, CA" },
          { icon: "⏱", text: "24 Hours" },
          { icon: "🎓", text: "Grades 9–12" }].
          map((item) =>
          <div
            key={item.text}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-mono text-foreground/80">
            
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          )}
        </div>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "1s", opacity: 0 }}>
          
          <a
            href="#register"
            className="group relative px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-base hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 overflow-hidden">
            
            <span className="relative z-10">Register — Secure Your Spot</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-glow-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
          <a
            href="https://discord.gg/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl glow-border text-foreground font-display font-semibold text-base hover:bg-primary/5 transition-all duration-300">
            
            Join Discord
          </a>
        </div>

        <p className="mt-3 text-xs text-muted-foreground font-mono animate-fade-in" style={{ animationDelay: "1.1s", opacity: 0 }}>
          Open to students across the Bay Area. Team & solo-friendly.
        </p>

        {/* Countdown */}
        <div
          className="mt-14 animate-fade-in"
          style={{ animationDelay: "1.2s", opacity: 0 }}>
          
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.3em] mb-4">
            Countdown to hack
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            <CountdownUnit value={time.days} label="Days" />
            <span className="text-2xl text-primary/50 font-mono mt-[-20px]">:</span>
            <CountdownUnit value={time.hours} label="Hours" />
            <span className="text-2xl text-primary/50 font-mono mt-[-20px]">:</span>
            <CountdownUnit value={time.minutes} label="Min" />
            <span className="text-2xl text-primary/50 font-mono mt-[-20px]">:</span>
            <CountdownUnit value={time.seconds} label="Sec" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-20 animate-fade-in"
          style={{ animationDelay: "1.5s", opacity: 0 }}>
          
          


          
        </div>
      </div>
    </section>);

};

export default HeroSection;