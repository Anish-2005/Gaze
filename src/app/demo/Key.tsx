'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface KeyProps {
  letter: string
  isHovered: boolean
  dwellProgress: number
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
}

export default function Key({
  letter,
  isHovered,
  dwellProgress,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: KeyProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null)

  const handleSelect = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = 'touches' in e
      ? ((e as React.TouchEvent).touches[0]?.clientX ?? 0) - rect.left
      : (e as React.MouseEvent).clientX - rect.left
    const y = 'touches' in e
      ? ((e as React.TouchEvent).touches[0]?.clientY ?? 0) - rect.top
      : (e as React.MouseEvent).clientY - rect.top

    setRipple({ x, y })
    setTimeout(() => setRipple(null), 500)

    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    } else if (typeof Audio !== 'undefined') {
      const audio = new Audio('/click.mp3')
      audio.volume = 0.22
      audio.play().catch(() => {})
      audioRef.current = audio
    }

    if ('vibrate' in navigator) {
      navigator.vibrate(8)
    }

    onClick?.()
  }

  return (
    <motion.div
      data-gaze-key={letter}
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleSelect}
      onTouchStart={(e) => {
        e.preventDefault()
        onMouseEnter?.()
      }}
      onTouchEnd={(e) => {
        e.preventDefault()
        onMouseLeave?.()
        setTimeout(() => handleSelect(e), 40)
      }}
      whileTap={{ scale: 0.96 }}
    >
      <motion.div
        className={cn(
          'relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border text-lg font-semibold transition-all sm:h-14 sm:w-14',
          isHovered
            ? 'border-cyan-300/50 bg-gradient-to-br from-cyan-500/35 to-blue-500/35 text-white shadow-[0_0_0_1px_rgba(125,211,252,0.22),0_12px_24px_rgba(14,116,144,0.35)]'
            : 'border-slate-600 bg-slate-900/85 text-slate-100 hover:border-slate-400 hover:bg-slate-800'
        )}
        animate={isHovered ? { y: -2, scale: 1.05 } : { y: 0, scale: 1 }}
        transition={{ duration: 0.15 }}
      >
        <span className="relative z-10">{letter}</span>

        {ripple && (
          <motion.span
            className="pointer-events-none absolute rounded-full bg-white/30"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 10,
              height: 10,
              marginLeft: -5,
              marginTop: -5,
            }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 8, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        )}

        {isHovered && <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />}
      </motion.div>

      {isHovered && dwellProgress > 0 && (
        <motion.div
          className="absolute inset-x-0 -bottom-2 h-1.5 overflow-hidden rounded-full border border-cyan-500/30 bg-slate-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300 transition-all"
            style={{ width: `${dwellProgress}%` }}
          />
        </motion.div>
      )}
    </motion.div>
  )
}
