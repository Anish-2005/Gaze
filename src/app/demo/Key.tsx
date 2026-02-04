'use client'

import { useEffect, useRef } from 'react'
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

  /* ---------- SAFE AUDIO (SELECTION ONLY) ---------- */
  useEffect(() => {
    if (typeof Audio !== 'undefined') {
      audioRef.current = new Audio('/click.mp3')
      audioRef.current.volume = 0.25
    }
  }, [])

  const handleSelect = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => { })
    }

    if ('vibrate' in navigator) {
      navigator.vibrate(8)
    }

    onClick?.()
  }

  return (
    <div
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
        setTimeout(handleSelect, 40)
      }}
    >
      {/* KEY BODY */}
      <div
        className={cn(
          'flex items-center justify-center',
          'h-12 w-12 sm:h-14 sm:w-14',
          'rounded-xl border font-semibold text-lg',
          'select-none cursor-default transition-all duration-200',
          isHovered
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400 text-white scale-105 shadow-lg shadow-blue-500/30'
            : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-600'
        )}
      >
        {letter}
      </div>

      {/* DWELL PROGRESS */}
      {isHovered && dwellProgress > 0 && (
        <div className="absolute inset-x-1 -bottom-2 h-1.5 rounded-full bg-slate-700 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
            style={{ width: `${dwellProgress}%` }}
          />
        </div>
      )}

      {/* Glow effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-md -z-10" />
      )}
    </div>
  )
}
