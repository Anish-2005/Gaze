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

  useEffect(() => {
    if (typeof Audio !== 'undefined') {
      audioRef.current = new Audio('/click.mp3')
    }
  }, [])

  useEffect(() => {
    if (isHovered && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }, [isHovered])

  return (
    <div
      data-gaze-key={letter}
      className={cn(
        "relative flex items-center justify-center",
        "h-12 w-12 md:h-16 md:w-16 rounded-lg border-2 transition-all duration-200",
        "select-none cursor-default font-bold text-lg md:text-xl",
        "shadow-lg active:shadow-md active:scale-95",
        isHovered
          ? "border-blue-400 bg-gradient-to-b from-blue-100 to-blue-200 text-blue-900 shadow-blue-200/50 scale-105"
          : "border-gray-600 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800 hover:from-gray-200 hover:to-gray-400"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onTouchStart={(e) => {
        // Prevent default to avoid scrolling on mobile
        e.preventDefault()
        // Add haptic feedback if available
        if ('vibrate' in navigator) {
          navigator.vibrate(10)
        }
        onMouseEnter?.()
      }}
      onTouchEnd={(e) => {
        e.preventDefault()
        onMouseLeave?.()
        // Add a small delay for mobile tap-and-hold
        setTimeout(() => onClick?.(), 50)
      }}
    >
      {/* Key letter with 3D effect */}
      <span className="relative z-10 drop-shadow-sm">
        {letter}
      </span>

      {/* Key top surface gradient */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

      {/* Key bottom shadow */}
      <div className="absolute -bottom-1 left-1 right-1 h-1 bg-black/20 rounded-b-lg blur-sm pointer-events-none" />

      {/* Dwell progress ring */}
      {isHovered && dwellProgress > 0 && (
        <>
          {/* Outer glowing ring */}
          <div
            className="absolute inset-0 border-3 border-blue-400 rounded-lg animate-pulse pointer-events-none"
            style={{
              opacity: 0.6 + (dwellProgress / 100) * 0.4,
            }}
          />

          {/* Progress ring */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                className="text-blue-500"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - dwellProgress / 100)}`}
              />
            </svg>
          </div>
        </>
      )}
    </div>
  )
}