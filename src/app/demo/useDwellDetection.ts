'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface DwellState {
  hoveredKey: string | null
  dwellProgress: number
  isDwelling: boolean
}

const DWELL_TIME = 1500 // 1.5 seconds for medical safety
const PROGRESS_UPDATE_INTERVAL = 50

export function useDwellDetection(
  onSelect: (key: string) => void,
  onProgress?: (progress: number) => void
) {
  const [state, setState] = useState<DwellState>({
    hoveredKey: null,
    dwellProgress: 0,
    isDwelling: false,
  })

  const dwellStartRef = useRef<number | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup intervals
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  const resetDwell = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }

    dwellStartRef.current = null
    setState({
      hoveredKey: null,
      dwellProgress: 0,
      isDwelling: false,
    })
  }, [])

  const startDwell = useCallback((key: string) => {
    setState({
      hoveredKey: key,
      dwellProgress: 0,
      isDwelling: true,
    })

    dwellStartRef.current = Date.now()

    // Start progress updates
    progressIntervalRef.current = setInterval(() => {
      if (!dwellStartRef.current) return

      const elapsed = Date.now() - dwellStartRef.current
      const progress = Math.min((elapsed / DWELL_TIME) * 100, 100)

      setState(prev => ({
        ...prev,
        dwellProgress: progress,
      }))

      if (onProgress) onProgress(progress)

      // Selection complete
      if (elapsed >= DWELL_TIME) {
        onSelect(key)
        resetDwell()
      }
    }, PROGRESS_UPDATE_INTERVAL)
  }, [onSelect, onProgress, resetDwell])

  const setHoveredKey = useCallback((key: string | null) => {
    if (key === state.hoveredKey) return

    if (key) {
      startDwell(key)
    } else {
      resetDwell()
    }
  }, [state.hoveredKey, startDwell, resetDwell])

  return {
    ...state,
    setHoveredKey,
    resetDwell,
    dwellTime: DWELL_TIME,
  }
}