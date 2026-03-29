'use client'

import { CheckCircle2, Target } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface CalibrationOverlayProps {
  isVisible: boolean
  onComplete: () => void
}

const CALIBRATION_POINTS = [
  { x: 16, y: 20 },
  { x: 84, y: 20 },
  { x: 50, y: 50 },
  { x: 16, y: 80 },
  { x: 84, y: 80 },
]

export default function CalibrationOverlay({
  isVisible,
  onComplete,
}: CalibrationOverlayProps) {
  const [currentPoint, setCurrentPoint] = useState(0)
  const [calibrationProgress, setCalibrationProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      setCurrentPoint(0)
      setCalibrationProgress(0)
      return
    }

    const interval = setInterval(() => {
      setCalibrationProgress((prev) => {
        if (prev >= 100) {
          if (currentPoint < CALIBRATION_POINTS.length - 1) {
            setCurrentPoint(currentPoint + 1)
            return 0
          }

          clearInterval(interval)
          setTimeout(() => {
            onComplete()
          }, 500)
          return 100
        }

        return prev + 8
      })
    }, 140)

    return () => clearInterval(interval)
  }, [isVisible, currentPoint, onComplete])

  if (!isVisible) return null

  const circumference = 2 * Math.PI * 44
  const progressOffset = circumference * (1 - calibrationProgress / 100)

  return (
    <div className="fixed inset-0 z-[90]" style={{ background: 'color-mix(in oklab, rgb(var(--bg-primary)) 82%, black 18%)' }}>
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, color-mix(in oklab, rgb(var(--accent-blue)) 22%, transparent) 0%, transparent 55%)',
          backdropFilter: 'blur(8px)',
        }}
      />

      <div className="relative flex h-full flex-col items-center justify-center px-4">
        <div className="absolute top-8 text-center sm:top-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: 'rgb(var(--accent-blue))' }}>
            Calibration In Progress
          </p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl" style={{ color: 'rgb(var(--text-primary))' }}>
            Follow the target with your eyes
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Maintain focus until each target completes.
          </p>
        </div>

        {CALIBRATION_POINTS.map((point, index) => (
          <span
            key={index}
            className={cn('absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border')}
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              borderColor: index === currentPoint
                ? 'color-mix(in oklab, rgb(var(--accent-blue)) 60%, transparent)'
                : 'color-mix(in oklab, rgb(var(--text-muted)) 42%, transparent)',
              background: index === currentPoint
                ? 'color-mix(in oklab, rgb(var(--accent-blue)) 45%, transparent)'
                : 'color-mix(in oklab, rgb(var(--text-muted)) 20%, transparent)',
            }}
          />
        ))}

        <div
          className="absolute transition-all duration-300 ease-out"
          style={{
            left: `${CALIBRATION_POINTS[currentPoint]?.x ?? 50}%`,
            top: `${CALIBRATION_POINTS[currentPoint]?.y ?? 50}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative h-28 w-28">
            <div
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: 'color-mix(in oklab, rgb(var(--accent-blue)) 45%, transparent)',
                background: 'color-mix(in oklab, rgb(var(--accent-blue)) 12%, transparent)',
              }}
            />
            <div
              className="absolute inset-4 rounded-full border"
              style={{ borderColor: 'color-mix(in oklab, rgb(var(--accent-cyan)) 58%, transparent)' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Target className="h-10 w-10" style={{ color: 'rgb(var(--accent-blue))' }} />
            </div>

            <svg className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="44"
                stroke="color-mix(in oklab, rgb(var(--text-muted)) 28%, transparent)"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="44"
                stroke="rgb(var(--accent-cyan))"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
              />
            </svg>
          </div>
        </div>

        <div
          className="absolute bottom-12 w-full max-w-lg rounded-2xl border p-5 text-center sm:bottom-14"
          style={{
            borderColor: 'var(--card-border)',
            background: 'var(--card-bg-strong)',
          }}
        >
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Point {currentPoint + 1} of {CALIBRATION_POINTS.length}
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full" style={{ background: 'color-mix(in oklab, var(--card-border) 70%, transparent)' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${((currentPoint + calibrationProgress / 100) / CALIBRATION_POINTS.length) * 100}%`,
                background: 'linear-gradient(90deg, rgb(var(--accent-blue)) 0%, rgb(var(--accent-cyan)) 55%, rgb(var(--accent-emerald)) 100%)',
              }}
            />
          </div>
        </div>

        {currentPoint === CALIBRATION_POINTS.length - 1 && calibrationProgress >= 100 && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'color-mix(in oklab, rgb(var(--bg-primary)) 88%, black 12%)' }}>
            <div
              className="rounded-2xl border p-8 text-center"
              style={{
                borderColor: 'color-mix(in oklab, rgb(var(--accent-emerald)) 40%, var(--card-border))',
                background: 'color-mix(in oklab, rgb(var(--accent-emerald)) 14%, var(--card-bg))',
              }}
            >
              <CheckCircle2 className="mx-auto h-16 w-16" style={{ color: 'rgb(var(--accent-emerald))' }} />
              <p className="mt-4 text-2xl font-semibold" style={{ color: 'rgb(var(--text-primary))' }}>Calibration complete</p>
              <p className="mt-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                Tracking profile has been updated for this session.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
