import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /**
   * Delay in ms, useful for staggered reveals.
   */
  delayMs?: number;
  /**
   * Reveal only once (default true). If false, will animate each time it enters.
   */
  once?: boolean;
  /**
   * IntersectionObserver threshold (default 0.15).
   */
  threshold?: number;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

export default function ScrollReveal({
  children,
  className,
  delayMs = 0,
  once = true,
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  const reducedMotion = useMemo(() => prefersReducedMotion(), []);

  useEffect(() => {
    if (reducedMotion) {
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShown(true);
        else if (!once) setShown(false);
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once, reducedMotion, threshold]);

  return (
    <div
      ref={ref}
      className={[
        // hidden state
        shown ? "animate-fade-in" : "opacity-0 translate-y-6",
        className ?? "",
      ].join(" ")}
      style={{ animationDelay: delayMs ? `${delayMs}ms` : undefined }}
    >
      {children}
    </div>
  );
}

