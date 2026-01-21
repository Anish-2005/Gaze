'use client'

import { useState, useEffect, useCallback } from 'react'

interface GazePoint {
  x: number
  y: number
  timestamp: number
}

export function useGazeSimulation() {
  const [gazePoint, setGazePoint] = useState<GazePoint>({ x: 50, y: 50, timestamp: Date.now() })
  const [isSimulating, setIsSimulating] = useState(true)
  const [simulationSpeed] = useState(2)

  // Get element at gaze point
  const getElementAtGaze = useCallback((x: number, y: number): HTMLElement | null => {
    return document.elementFromPoint(x, y) as HTMLElement
  }, [])

  // Simulate gaze movement
  useEffect(() => {
    if (!isSimulating) return

    let animationFrame: number
    let lastUpdate = Date.now()
    let targetX = Math.random() * 100
    let targetY = Math.random() * 100

    const updateGaze = () => {
      const now = Date.now()
      const delta = now - lastUpdate

      if (delta > 16) { // ~60fps
        // Move toward target
        const dx = targetX - gazePoint.x
        const dy = targetY - gazePoint.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 5) {
          // Pick new target
          targetX = Math.random() * 100
          targetY = Math.random() * 100
        } else {
          // Move toward target
          const moveX = (dx / distance) * simulationSpeed
          const moveY = (dy / distance) * simulationSpeed

          setGazePoint({
            x: gazePoint.x + moveX,
            y: gazePoint.y + moveY,
            timestamp: now,
          })

          lastUpdate = now
        }
      }

      animationFrame = requestAnimationFrame(updateGaze)
    }

    animationFrame = requestAnimationFrame(updateGaze)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [isSimulating, gazePoint.x, gazePoint.y, simulationSpeed])

  // Update hover states based on gaze
  useEffect(() => {
    if (!isSimulating) return

    const updateHover = () => {
      const element = getElementAtGaze(
        (gazePoint.x / 100) * window.innerWidth,
        (gazePoint.y / 100) * window.innerHeight
      )

      if (element && element.dataset.gazeKey) {
        // Dispatch custom event for key hover
        const event = new CustomEvent('gazehover', {
          detail: { key: element.dataset.gazeKey },
          bubbles: true,
        })
        element.dispatchEvent(event)
      }
    }

    const interval = setInterval(updateHover, 100)
    return () => clearInterval(interval)
  }, [isSimulating, gazePoint, getElementAtGaze])

  const toggleSimulation = useCallback(() => {
    setIsSimulating(!isSimulating)
  }, [isSimulating])

  return {
    gazePoint,
    isSimulating,
    toggleSimulation,
    setGazePoint: (x: number, y: number) => {
      setGazePoint({ x, y, timestamp: Date.now() })
    },
  }
}