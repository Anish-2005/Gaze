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
        "h-20 w-20 rounded-xl border-2 transition-all duration-200",
        "select-none cursor-default",
        isHovered
          ? "border-blue-500 bg-blue-50 scale-105 shadow-lg"
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {/* Key letter */}
      <span className="text-2xl font-semibold text-gray-800 z-10">
        {letter}
      </span>

      {/* Frequency indicator (subtle background) */}
      <div className="absolute inset-0 opacity-10 rounded-xl bg-gradient-to-br from-blue-200 to-teal-200" />

      {/* Dwell progress ring */}
      {isHovered && dwellProgress > 0 && (
        <>
          {/* Outer glowing ring */}
          <div
            className="absolute inset-0 border-4 border-blue-400 rounded-xl animate-pulse"
            style={{
              opacity: 0.5 + (dwellProgress / 100) * 0.5,
            }}
          />
          
          {/* Progress ring */}
          <div className="absolute inset-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="38"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                className="text-blue-500"
                strokeDasharray={`${2 * Math.PI * 38}`}
                strokeDashoffset={`${2 * Math.PI * 38 * (1 - dwellProgress / 100)}`}
              />
            </svg>
          </div>

          {/* Progress percentage (for debugging) */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-mono text-blue-600">
            {Math.round(dwellProgress)}%
          </div>
        </>
      )}

      {/* Quick selection indicator */}
      {!isHovered && dwellProgress === 0 && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  )
}