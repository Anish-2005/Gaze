'use client'

import { useEffect, useState } from 'react'

interface GazeCursorProps {
  x: number
  y: number
  visible: boolean
}

export default function GazeCursor({ x, y, visible }: GazeCursorProps) {
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([])

  // Update trail
  useEffect(() => {
    if (!visible) return

    const newPoint = { x, y }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTrail(prev => {
      const newTrail = [newPoint, ...prev.slice(0, 10)]
      return newTrail
    })
  }, [x, y, visible])

  if (!visible) return null

  return (
    <>
      {/* Trail dots */}
      {trail.map((point, index) => (
        <div
          key={index}
          className="fixed w-1 h-1 rounded-full bg-blue-400/30 pointer-events-none z-[9998]"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: 1 - index / trail.length,
            scale: 1 - index / trail.length,
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        className="fixed w-6 h-6 rounded-full border-4 border-blue-500 bg-white/20 backdrop-blur-sm pointer-events-none z-[9999]"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
        }}
      >
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
        </div>
      </div>
    </>
  )
}