'use client'

import { useEffect } from 'react'
import Key from './Key'

interface GazeKeyboardProps {
  onSelect: (key: string) => void
  hoveredKey: string | null
  dwellProgress: number
  setHoveredKey: (key: string | null) => void
}

const KEYBOARD_LAYOUT = [
  ['E', 'T', 'A', 'O', 'I'],
  ['N', 'R', 'S', 'H', 'L'],
  ['D', 'C', 'U', 'M', 'F'],
  ['P', 'G', 'W', 'Y', 'B'],
  ['V', 'K', 'X', 'J', 'Q'],
]

export default function GazeKeyboard({
  onSelect,
  hoveredKey,
  dwellProgress,
  setHoveredKey,
}: GazeKeyboardProps) {

  /* ---------- GAZE EVENTS ---------- */
  useEffect(() => {
    const handleGazeHover = (event: CustomEvent) => {
      setHoveredKey(event.detail.key)
    }

    window.addEventListener('gazehover', handleGazeHover as EventListener)
    return () =>
      window.removeEventListener('gazehover', handleGazeHover as EventListener)
  }, [setHoveredKey])

  /* ---------- KEYBOARD (JUDGE MODE) ---------- */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase()
      if (key.length === 1 && /[A-Z]/.test(key)) {
        setHoveredKey(key)
        setTimeout(() => {
          onSelect(key)
          setHoveredKey(null)
        }, 120)
      }

      if (event.key === ' ') {
        event.preventDefault()
        window.dispatchEvent(new CustomEvent('speak'))
      }

      if (event.key === 'Escape') {
        window.dispatchEvent(new CustomEvent('clear'))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onSelect, setHoveredKey])

  return (
    <div className="w-full max-w-xl mx-auto">

      {/* Keyboard shell */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-md">

        {/* Rows */}
        <div className="space-y-2 sm:space-y-3">
          {KEYBOARD_LAYOUT.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center gap-2 sm:gap-3"
            >
              {row.map(letter => (
                <Key
                  key={letter}
                  letter={letter}
                  isHovered={hoveredKey === letter}
                  dwellProgress={hoveredKey === letter ? dwellProgress : 0}
                  onMouseEnter={() => setHoveredKey(letter)}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() => onSelect(letter)}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile hint */}
        <div className="mt-3 sm:hidden text-center text-xs text-slate-500">
          Focus on a letter to select • Tap to test
        </div>
      </div>

      {/* Desktop hint */}
      <div className="hidden sm:block mt-4 text-center text-sm text-slate-600">
        Focus on a letter for a moment to type • Press <span className="font-medium">Space</span> to speak
      </div>
    </div>
  )
}
