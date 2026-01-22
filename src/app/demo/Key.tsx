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
      audioRef.current.play().catch(() => {})
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
          'rounded-lg border font-semibold text-lg',
          'select-none cursor-default transition-all duration-150',
          isHovered
            ? 'bg-slate-100 border-slate-900 text-slate-900'
            : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
        )}
      >
        {letter}
      </div>

      {/* DWELL PROGRESS (CLEAN + MEDICAL SAFE) */}
      {isHovered && dwellProgress > 0 && (
        <div className="absolute inset-x-1 -bottom-1 h-1 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full bg-slate-900 transition-all duration-100"
            style={{ width: `${dwellProgress}%` }}
          />
        </div>
      )}
    </div>
  )
}
