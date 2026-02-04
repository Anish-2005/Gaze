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
      const newTrail = [newPoint, ...prev.slice(0, 8)]
      return newTrail
    })
  }, [x, y, visible])

  if (!visible) return null

  return (
    <>
      {/* Trail dots with gradient opacity */}
      {trail.map((point, index) => (
        <div
          key={index}
          className="fixed rounded-full pointer-events-none z-[9998]"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            transform: 'translate(-50%, -50%)',
            width: `${8 - index * 0.8}px`,
            height: `${8 - index * 0.8}px`,
            background: `linear-gradient(135deg, rgba(59, 130, 246, ${0.5 - index * 0.05}), rgba(139, 92, 246, ${0.5 - index * 0.05}))`,
            opacity: 1 - index / trail.length,
          }}
        />
      ))}

      {/* Outer glow ring */}
      <div
        className="fixed w-16 h-16 rounded-full pointer-events-none z-[9998] animate-pulse-glow"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
        }}
      />

      {/* Main cursor */}
      <div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[9999]"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)',
          border: '2px solid rgba(59, 130, 246, 0.6)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)',
            }}
          />
        </div>
      </div>
    </>
  )
}