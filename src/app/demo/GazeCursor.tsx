'use client'

import { useEffect, useState } from 'react'

interface GazeCursorProps {
  x: number
  y: number
  visible: boolean
}

export default function GazeCursor({ x, y, visible }: GazeCursorProps) {
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([])

  useEffect(() => {
    if (!visible) return

    const point = { x, y }
    setTrail((prev) => [point, ...prev.slice(0, 5)])
  }, [x, y, visible])

  if (!visible) return null

  return (
    <>
      {trail.map((point, index) => (
        <div
          key={`${point.x}-${point.y}-${index}`}
          className="pointer-events-none fixed z-[85] rounded-full"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            transform: 'translate(-50%, -50%)',
            width: `${7 - index * 1}px`,
            height: `${7 - index * 1}px`,
            background: `color-mix(in oklab, rgb(var(--accent-cyan)) ${Math.max(10, 48 - index * 9)}%, transparent)`,
          }}
        />
      ))}

      <div
        className="pointer-events-none fixed z-[86] h-14 w-14 rounded-full"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, color-mix(in oklab, rgb(var(--accent-cyan)) 32%, transparent) 0%, transparent 72%)',
        }}
      />

      <div
        className="pointer-events-none fixed z-[87] h-6 w-6 rounded-full border"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
          borderColor: 'color-mix(in oklab, rgb(var(--accent-blue)) 58%, transparent)',
          background: 'color-mix(in oklab, rgb(var(--accent-cyan)) 14%, transparent)',
          boxShadow: '0 0 20px color-mix(in oklab, rgb(var(--accent-blue)) 30%, transparent)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: 'rgb(var(--accent-blue))' }}
          />
        </div>
      </div>
    </>
  )
}
