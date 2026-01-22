'use client'

import { Target, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface CalibrationOverlayProps {
  isVisible: boolean
  onComplete: () => void
}

const CALIBRATION_POINTS = [
  { x: 20, y: 20 },
  { x: 80, y: 20 },
  { x: 50, y: 50 },
  { x: 20, y: 80 },
  { x: 80, y: 80 },
]

export default function CalibrationOverlay({
  isVisible,
  onComplete,
}: CalibrationOverlayProps) {
  const [currentPoint, setCurrentPoint] = useState(0)
  const [calibrationProgress, setCalibrationProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPoint(0)
      setCalibrationProgress(0)
      return
    }

    // Simulate calibration process
    const interval = setInterval(() => {
      setCalibrationProgress((prev) => {
        if (prev >= 100) {
          if (currentPoint < CALIBRATION_POINTS.length - 1) {
            setCurrentPoint(currentPoint + 1)
            return 0
          } else {
            clearInterval(interval)
            setTimeout(() => {
              onComplete()
            }, 500)
            return 100
          }
        }
        return prev + 10
      })
    }, 200)

    return () => clearInterval(interval)
  }, [isVisible, currentPoint, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center">
      {/* Progress indicator */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="text-white text-center">
          <div className="text-2xl font-bold mb-2">Eye Calibration</div>
          <div className="text-gray-300">
            Follow the dot with your eyes
          </div>
        </div>
      </div>

      {/* Calibration points */}
      {CALIBRATION_POINTS.map((point, index) => (
        <div
          key={index}
          className="absolute w-4 h-4 rounded-full bg-gray-400 opacity-50"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Active calibration point */}
      <div
        className="absolute transition-all duration-300 ease-out"
        style={{
          left: `${CALIBRATION_POINTS[currentPoint]?.x ?? 50}%`,
          top: `${CALIBRATION_POINTS[currentPoint]?.y ?? 50}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="relative">
          {/* Outer ring */}
          <div className={cn(
            "w-24 h-24 rounded-full border-4 animate-pulse",
            calibrationProgress >= 100 
              ? "border-green-500" 
              : "border-blue-500"
          )} />
          
          {/* Inner target */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Target className={cn(
              "w-12 h-12 transition-colors",
              calibrationProgress >= 100 
                ? "text-green-500" 
                : "text-blue-400"
            )} />
          </div>

          {/* Progress ring */}
          {calibrationProgress > 0 && (
            <div className="absolute -inset-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className="text-blue-500"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - calibrationProgress / 100)}`}
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-white">
        <div className="text-lg mb-2">
          {currentPoint + 1} of {CALIBRATION_POINTS.length}
        </div>
        <div className="text-gray-300">
          Keep your eyes on the target until it moves
        </div>
      </div>

      {/* Complete indicator */}
      {currentPoint === CALIBRATION_POINTS.length - 1 && calibrationProgress >= 100 && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-bounce" />
            <div className="text-3xl font-bold text-white mb-2">
              Calibration Complete!
            </div>
            <div className="text-gray-300">
              Eye tracking is now optimized for you
            </div>
          </div>
        </div>
      )}
    </div>
  )
}