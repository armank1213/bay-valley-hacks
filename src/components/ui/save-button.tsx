"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Check } from "lucide-react"
import confetti from "canvas-confetti"
import { cn } from "@/lib/utils"

interface SaveButtonProps {
  text?: { idle?: string; saving?: string; saved?: string }
  className?: string
  onSave?: () => Promise<void> | void
}

export function SaveButton({
  text = { idle: "Apply", saving: "Sending...", saved: "You're in!" },
  className,
  onSave,
}: SaveButtonProps) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle")

  const handleClick = async () => {
    if (status !== "idle") return
    setStatus("saving")
    try {
      if (onSave) await onSave()
      else await new Promise((r) => setTimeout(r, 1600))
      setStatus("saved")
      confetti({
        particleCount: 110,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#e8521a", "#ff9955", "#ffffff", "#ffcc88"],
        shapes: ["circle"],
        scalar: 0.9,
      })
      setTimeout(() => setStatus("idle"), 2600)
    } catch {
      setStatus("idle")
    }
  }

  const bg =
    status === "saving" ? "#e8521a" :
    status === "saved"  ? "rgb(34,197,94)" :
    "rgb(237,230,220)"

  const fg =
    status === "idle" ? "rgb(26,24,21)" : "white"

  return (
    <motion.button
      onClick={handleClick}
      animate={{ backgroundColor: bg, color: fg, scale: status === "saved" ? [1, 1.05, 1] : 1 }}
      transition={{ duration: 0.22 }}
      whileHover={status === "idle" ? { scale: 1.04 } : {}}
      whileTap={status === "idle" ? { scale: 0.96 } : {}}
      disabled={status !== "idle"}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-ui font-semibold text-sm cursor-pointer overflow-hidden",
        className
      )}
      style={{ minWidth: "150px" }}
    >
      <AnimatePresence mode="wait">
        {status === "saving" && (
          <motion.span key="spin"
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <Loader2 className="w-4 h-4 animate-spin" />
          </motion.span>
        )}
        {status === "saved" && (
          <motion.span key="check"
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <Check className="w-4 h-4" />
          </motion.span>
        )}
      </AnimatePresence>

      <motion.span
        key={status}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.16 }}
      >
        {status === "idle" ? text.idle : status === "saving" ? text.saving : text.saved}
      </motion.span>
    </motion.button>
  )
}
