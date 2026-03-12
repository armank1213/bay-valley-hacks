import { useState, useEffect, useCallback, useRef } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&*$"

function rndChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

interface TileProps {
  target: string
  startDelay: number
}

function Tile({ target, startDelay }: TileProps) {
  const [char, setChar] = useState(() => rndChar())
  const [resolved, setResolved] = useState(false)
  const [key, setKey] = useState(0) // bump to trigger CSS flip animation

  useEffect(() => {
    if (target === " ") { setResolved(true); return }

    const timers: ReturnType<typeof setTimeout>[] = []
    const cycles = 7 + Math.floor(Math.random() * 4)

    for (let c = 0; c <= cycles; c++) {
      timers.push(
        setTimeout(() => {
          if (c === cycles) {
            setChar(target)
            setResolved(true)
          } else {
            setChar(rndChar())
          }
          setKey((k) => k + 1)
        }, startDelay + c * 65)
      )
    }
    return () => timers.forEach(clearTimeout)
  }, [target, startDelay])

  if (target === " ") {
    return <div className="w-3 sm:w-4 md:w-5 shrink-0" />
  }

  return (
    <div
      className="relative flex items-center justify-center rounded-md overflow-hidden shrink-0"
      style={{
        width: "clamp(38px, 7vw, 68px)",
        height: "clamp(46px, 8.5vw, 82px)",
        background: resolved ? "#e8521a" : "rgba(232,82,26,0.12)",
        border: resolved ? "none" : "1px solid rgba(232,82,26,0.25)",
        transition: "background 0.25s ease, border 0.25s ease",
        perspective: "200px",
      }}
    >
      <span
        key={key}
        className="tile-flip font-display font-black select-none leading-none"
        style={{
          fontSize: "clamp(1.4rem, 4.5vw, 3.2rem)",
          color: resolved ? "#fff" : "rgba(232,82,26,0.85)",
          display: "block",
        }}
      >
        {char}
      </span>
    </div>
  )
}

interface ScrambleTextProps {
  text: string
  startDelay?: number
  charStagger?: number
  className?: string
}

export function ScrambleText({
  text,
  startDelay = 500,
  charStagger = 80,
}: ScrambleTextProps) {
  // split into words for natural line-wrapping
  const words = text.split(" ")

  let charIndex = 0
  return (
    <div className="flex flex-wrap justify-center gap-y-2 gap-x-1.5">
      {words.map((word, wi) => (
        <div key={wi} className="flex items-center gap-[3px] sm:gap-1">
          {word.split("").map((letter) => {
            const delay = startDelay + charIndex++ * charStagger
            return (
              <Tile
                key={`${wi}-${charIndex}`}
                target={letter}
                startDelay={delay}
              />
            )
          })}
          {/* word spacer (except last) */}
          {wi < words.length - 1 && <div className="w-2 sm:w-3 shrink-0" />}
        </div>
      ))}
    </div>
  )
}
