import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Dwell time calculation
export function calculateDwellTime(difficulty: 'easy' | 'medium' | 'hard'): number {
  const times = {
    easy: 2000,   // 2 seconds for beginners
    medium: 1500, // 1.5 seconds standard
    hard: 1000,   // 1 second for experts
  }
  return times[difficulty]
}

// Generate random calibration points
export function generateCalibrationPoints(count: number) {
  const points = []
  const margin = 20
  
  for (let i = 0; i < count; i++) {
    points.push({
      x: margin + Math.random() * (100 - 2 * margin),
      y: margin + Math.random() * (100 - 2 * margin),
    })
  }
  
  return points
}