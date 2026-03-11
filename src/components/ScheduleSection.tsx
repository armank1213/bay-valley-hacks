import { useState, useEffect, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";

type Day = "friday" | "saturday" | "sunday";

interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  type: "main" | "workshop" | "food" | "fun";
}

const schedule: Record<Day, ScheduleEvent[]> = {
  friday: [
    { time: "5:00 PM", title: "Doors Open & Check-in", description: "Pick up your badge, swag bag, and find your workspace.", type: "main" },
    { time: "6:00 PM", title: "Opening Ceremony", description: "Welcome address, sponsor intros, and theme reveal.", type: "main" },
    { time: "7:00 PM", title: "Dinner", description: "Fuel up before the hacking begins.", type: "food" },
    { time: "7:30 PM", title: "Team Formation", description: "Find teammates or solidify your squad.", type: "fun" },
    { time: "8:00 PM", title: "Hacking Begins! 🚀", description: "The 24-hour clock starts now.", type: "main" },
    { time: "9:00 PM", title: "Workshop: Intro to AI/ML", description: "Build your first ML model with TensorFlow.", type: "workshop" },
  ],
  saturday: [
    { time: "12:00 AM", title: "Midnight Snacks", description: "Pizza, energy drinks, and snacks to keep you going.", type: "food" },
    { time: "8:00 AM", title: "Breakfast", description: "Start the day right with a hearty breakfast.", type: "food" },
    { time: "10:00 AM", title: "Workshop: UI/UX Design", description: "Learn design principles from industry professionals.", type: "workshop" },
    { time: "12:00 PM", title: "Lunch", description: "Recharge with a catered lunch.", type: "food" },
    { time: "2:00 PM", title: "Workshop: Hardware Hacking", description: "Get hands-on with Arduino and Raspberry Pi.", type: "workshop" },
    { time: "4:00 PM", title: "Mentor Office Hours", description: "One-on-one help from industry mentors.", type: "main" },
    { time: "6:00 PM", title: "Dinner", description: "Evening meal and socializing.", type: "food" },
    { time: "7:00 PM", title: "Fun Activity: Game Night", description: "Take a break with board games and trivia.", type: "fun" },
  ],
  sunday: [
    { time: "8:00 AM", title: "Breakfast", description: "Last breakfast before the final push.", type: "food" },
    { time: "8:00 AM", title: "Hacking Ends ⏰", description: "Pencils down! Submit your projects.", type: "main" },
    { time: "9:00 AM", title: "Project Expo & Demos", description: "Present your project to judges and attendees.", type: "main" },
    { time: "11:00 AM", title: "Judging & Deliberation", description: "Judges review and score all submissions.", type: "main" },
    { time: "12:00 PM", title: "Closing Ceremony & Prizes", description: "Awards, shoutouts, and wrap-up.", type: "main" },
  ],
};

const dayLabels: Record<Day, string> = {
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

const typeColors: Record<string, string> = {
  main: "bg-primary/20 text-primary",
  workshop: "bg-accent/20 text-accent",
  food: "bg-glow-warm/20 text-glow-warm",
  fun: "bg-glow-secondary/20 text-glow-secondary",
};

const ScheduleSection = () => {
  const [activeDay, setActiveDay] = useState<Day>("friday");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="schedule" ref={sectionRef} className="relative py-32 px-6 noise-bg">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full glass glow-border text-xs font-mono text-primary tracking-widest uppercase mb-6">
            Schedule
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight">
            The <span className="text-gradient-primary">Weekend</span> Plan
          </h2>
          <p className="mt-4 text-muted-foreground font-display text-lg">
            Three days of building, learning, and connecting.
          </p>
        </div>

        {/* Day tabs */}
        <div className={`flex justify-center gap-2 mb-10 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {(Object.keys(schedule) as Day[]).map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-2.5 rounded-xl font-display font-semibold text-sm transition-all duration-300 ${
                activeDay === day
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "glass text-muted-foreground hover:text-foreground hover:bg-primary/5"
              }`}
            >
              {dayLabels[day]}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          <div className="space-y-4">
            {schedule[activeDay].map((event, i) => (
              <ScrollReveal
                key={`${activeDay}-${i}`}
                delayMs={i * 70}
                className="will-change-transform"
              >
                <div className="flex gap-5 group">
                  {/* Dot */}
                  <div className="relative flex-shrink-0 mt-1">
                    <div className="w-[12px] h-[12px] rounded-full bg-primary/30 border-2 border-primary group-hover:bg-primary transition-colors ml-[17px]" />
                  </div>

                  {/* Card */}
                  <div className="glass rounded-xl p-5 flex-1 group-hover:glow-border transition-all duration-300 group-hover:-translate-y-0.5">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-primary font-semibold">
                        {event.time}
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ${typeColors[event.type]}`}
                      >
                        {event.type}
                      </span>
                    </div>
                    <h3 className="text-base font-display font-semibold text-foreground">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {event.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
