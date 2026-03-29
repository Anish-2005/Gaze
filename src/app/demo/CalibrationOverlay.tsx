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
    <div className="fixed inset-0 z-[90] bg-slate-950/92 backdrop-blur-md">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_55%)]" />

      <div className="relative flex h-full flex-col items-center justify-center px-4">
        <div className="absolute top-8 text-center sm:top-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">Calibration In Progress</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Follow the target with your eyes</h2>
          <p className="mt-2 text-sm text-slate-300">Maintain focus until each target completes.</p>
        </div>

        {CALIBRATION_POINTS.map((point, index) => (
          <span
            key={index}
            className={cn(
              'absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border',
              index === currentPoint ? 'border-cyan-300 bg-cyan-300/80' : 'border-slate-500 bg-slate-700/70'
            )}
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
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
            <div className="absolute inset-0 rounded-full border border-cyan-300/40 bg-cyan-400/10" />
            <div className="absolute inset-4 rounded-full border border-cyan-200/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Target className="h-10 w-10 text-cyan-200" />
            </div>

            <svg className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="44"
                stroke="rgba(148,163,184,0.25)"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="44"
                stroke="rgb(103,232,249)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
              />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-12 w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900/85 p-5 text-center sm:bottom-14">
          <p className="text-sm text-slate-300">
            Point {currentPoint + 1} of {CALIBRATION_POINTS.length}
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300 transition-all"
              style={{ width: `${((currentPoint + calibrationProgress / 100) / CALIBRATION_POINTS.length) * 100}%` }}
            />
          </div>
        </div>

        {currentPoint === CALIBRATION_POINTS.length - 1 && calibrationProgress >= 100 && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/88">
            <div className="rounded-2xl border border-emerald-400/35 bg-emerald-400/10 p-8 text-center">
              <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-300" />
              <p className="mt-4 text-2xl font-semibold text-white">Calibration complete</p>
              <p className="mt-2 text-sm text-emerald-100">Tracking profile has been updated for this session.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
