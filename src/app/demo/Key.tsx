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
          'relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border text-lg font-semibold transition-all sm:h-14 sm:w-14'
        )}
        style={isHovered
          ? {
              borderColor: 'color-mix(in oklab, rgb(var(--accent-blue)) 45%, var(--card-border))',
              background: 'linear-gradient(135deg, color-mix(in oklab, rgb(var(--accent-blue)) 18%, var(--card-bg)) 0%, color-mix(in oklab, rgb(var(--accent-cyan)) 22%, var(--card-bg)) 100%)',
              color: 'rgb(var(--text-primary))',
              boxShadow: '0 10px 24px color-mix(in oklab, rgb(var(--accent-blue)) 32%, transparent)',
            }
          : {
              borderColor: 'var(--card-border)',
              background: 'var(--card-bg-strong)',
              color: 'rgb(var(--text-primary))',
            }}
        animate={isHovered ? { y: -2, scale: 1.05 } : { y: 0, scale: 1 }}
        transition={{ duration: 0.15 }}
      >
        <span className="relative z-10">{letter}</span>

        {ripple && (
          <motion.span
            className="pointer-events-none absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 10,
              height: 10,
              marginLeft: -5,
              marginTop: -5,
              background: 'color-mix(in oklab, rgb(var(--text-primary)) 30%, transparent)',
            }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 8, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        )}

        {isHovered && <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.09), transparent)' }} />}
      </motion.div>

      {isHovered && dwellProgress > 0 && (
        <motion.div
          className="absolute inset-x-0 -bottom-2 h-1.5 overflow-hidden rounded-full border"
          style={{
            borderColor: 'color-mix(in oklab, rgb(var(--accent-blue)) 35%, transparent)',
            background: 'var(--card-bg-strong)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${dwellProgress}%`,
              background: 'linear-gradient(90deg, rgb(var(--accent-blue)) 0%, rgb(var(--accent-cyan)) 55%, rgb(var(--accent-emerald)) 100%)',
            }}
          />
        </motion.div>
      )}
    </motion.div>
  )
}
