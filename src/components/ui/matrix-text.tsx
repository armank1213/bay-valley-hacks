"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface LetterState {
  char: string;
  isMatrix: boolean;
  isSpace: boolean;
}

interface MatrixTextProps {
  text?: string;
  className?: string;
  style?: React.CSSProperties;
  initialDelay?: number;
  letterAnimationDuration?: number;
  letterInterval?: number;
  matrixColor?: string;
  resolvedColor?: string;
  /** If true, animation fires once when element scrolls into view */
  triggerOnView?: boolean;
}

export const MatrixText = ({
  text = "Hello World!",
  className,
  style,
  initialDelay = 200,
  letterAnimationDuration = 480,
  letterInterval = 85,
  matrixColor = "#e8521a",
  resolvedColor = "inherit",
  triggerOnView = false,
}: MatrixTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  const [letters, setLetters] = useState<LetterState[]>(() =>
    text.split("").map((char) => ({
      char,
      isMatrix: false,
      isSpace: char === " ",
    }))
  );
  const [started, setStarted] = useState(false);

  const getRandomChar = useCallback(() => (Math.random() > 0.5 ? "1" : "0"), []);

  const runAnimation = useCallback(() => {
    if (started) return;
    setStarted(true);
    let idx = 0;
    const step = () => {
      if (idx >= text.length) return;
      const i = idx;
      requestAnimationFrame(() => {
        setLetters((prev) => {
          const next = [...prev];
          if (!next[i].isSpace) next[i] = { ...next[i], char: getRandomChar(), isMatrix: true };
          return next;
        });
        setTimeout(() => {
          setLetters((prev) => {
            const next = [...prev];
            next[i] = { ...next[i], char: text[i], isMatrix: false };
            return next;
          });
        }, letterAnimationDuration);
      });
      idx++;
      setTimeout(step, letterInterval);
    };
    setTimeout(step, initialDelay);
  }, [started, text, getRandomChar, letterAnimationDuration, letterInterval, initialDelay]);

  // Auto-fire on mount when not using triggerOnView
  useEffect(() => {
    if (!triggerOnView) runAnimation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fire when scrolled into view
  useEffect(() => {
    if (triggerOnView && inView) runAnimation();
  }, [triggerOnView, inView, runAnimation]);

  const variants = useMemo(
    () => ({
      matrix: { color: matrixColor, textShadow: `0 0 10px ${matrixColor}90` },
      normal: { color: resolvedColor, textShadow: "none" },
    }),
    [matrixColor, resolvedColor]
  );

  return (
    <div
      ref={ref}
      className={cn("flex flex-wrap items-center justify-center", className)}
      style={style}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial="normal"
          animate={letter.isMatrix ? "matrix" : "normal"}
          variants={variants}
          transition={{ duration: 0.07, ease: "easeInOut" }}
          style={{ display: "inline-block", whiteSpace: "pre", fontVariantNumeric: "tabular-nums" }}
        >
          {letter.isSpace ? "\u00A0" : letter.char}
        </motion.span>
      ))}
    </div>
  );
};
