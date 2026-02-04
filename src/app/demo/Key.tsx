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

  /* ---------- SAFE AUDIO (SELECTION ONLY) ---------- */
  const handleSelect = (e: React.MouseEvent | React.TouchEvent) => {
    // Create ripple effect
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = 'touches' in e ? ((e as React.TouchEvent).touches[0]?.clientX ?? 0) - rect.left : (e as React.MouseEvent).clientX - rect.left
    const y = 'touches' in e ? ((e as React.TouchEvent).touches[0]?.clientY ?? 0) - rect.top : (e as React.MouseEvent).clientY - rect.top
    setRipple({ x, y })
    setTimeout(() => setRipple(null), 600)

    // Play audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => { })
    } else if (typeof Audio !== 'undefined') {
      const audio = new Audio('/click.mp3')
      audio.volume = 0.25
      audio.play().catch(() => { })
      audioRef.current = audio
    }

    // Haptic feedback
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
      whileTap={{ scale: 0.95 }}
    >
      {/* KEY BODY */}
      <motion.div
        className={cn(
          'flex items-center justify-center relative overflow-hidden',
          'h-12 w-12 sm:h-14 sm:w-14',
          'rounded-xl border font-semibold text-lg',
          'select-none cursor-default transition-all duration-200',
          isHovered
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400/50 text-white shadow-lg'
            : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-600'
        )}
        animate={isHovered ? {
          boxShadow: [
            '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
            '0 0 30px rgba(59, 130, 246, 0.4), 0 0 50px rgba(139, 92, 246, 0.3)',
            '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
          ],
          scale: 1.08,
        } : { scale: 1 }}
        transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
      >
        {/* Letter */}
        <span className="relative z-10">{letter}</span>

        {/* Ripple effect */}
        {ripple && (
          <motion.span
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 10,
              height: 10,
              marginLeft: -5,
              marginTop: -5,
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 10, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}

        {/* Inner glow when hovered */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
        )}
      </motion.div>

      {/* DWELL PROGRESS - Enhanced */}
      {isHovered && dwellProgress > 0 && (
        <motion.div
          className="absolute inset-x-0 -bottom-3 h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
            style={{
              width: `${dwellProgress}%`,
              backgroundSize: '200% 100%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      )}

      {/* Outer glow effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl -z-10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      )}

      {/* Pulse ring when dwelling */}
      {isHovered && dwellProgress > 50 && (
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-blue-400 -z-10"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.3, opacity: 0 }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </motion.div>
  )
}
