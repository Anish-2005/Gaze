'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Keyboard as KeyboardIcon } from 'lucide-react'
import Key from './Key'
import WordPredictions from './WordPredictions'

interface GazeKeyboardProps {
  onSelect: (key: string) => void
  onSelectWord: (word: string) => void
  predictions: string[]
  addHoveredKey: (key: string) => void
  hoveredKey: string | null
  dwellProgress: number
  setHoveredKey: (key: string | null) => void
  isGenerating?: boolean
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
  onSelectWord,
  predictions,
  addHoveredKey,
  hoveredKey,
  dwellProgress,
  setHoveredKey,
  isGenerating = false,
}: GazeKeyboardProps) {
  useEffect(() => {
    const handleGazeHover = (event: CustomEvent) => {
      const key = event.detail.key
      setHoveredKey(key)
      if (key && key.length === 1 && /[A-Z]/.test(key)) {
        addHoveredKey(key)
      }
    }

    window.addEventListener('gazehover', handleGazeHover as EventListener)
    return () => {
      window.removeEventListener('gazehover', handleGazeHover as EventListener)
    }
  }, [setHoveredKey, addHoveredKey])

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
    <div className="w-full max-w-3xl">
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/70 p-4 shadow-[0_16px_40px_rgba(2,6,23,0.35)] sm:p-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-5 flex items-center justify-between border-b border-slate-700/70 pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-200">
              <KeyboardIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-100">Gaze Keyboard</p>
              <p className="text-xs text-slate-500">Dwell to select, tap for manual fallback</p>
            </div>
          </div>
          <span className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-[11px] text-slate-400">
            25-key optimized layout
          </span>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {KEYBOARD_LAYOUT.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="flex justify-center gap-2 sm:gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rowIndex * 0.04 }}
            >
              {row.map((letter) => (
                <Key
                  key={letter}
                  letter={letter}
                  isHovered={hoveredKey === letter}
                  dwellProgress={hoveredKey === letter ? dwellProgress : 0}
                  onMouseEnter={() => {
                    setHoveredKey(letter)
                    addHoveredKey(letter)
                  }}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() => onSelect(letter)}
                />
              ))}
            </motion.div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-slate-700/80 bg-slate-950/80 px-4 py-2 text-center text-xs text-slate-400">
          Keep gaze stable for approximately 1.5s to trigger a key selection. Suggestions use faster dwell.
        </div>
      </motion.div>

      <WordPredictions
        predictions={predictions}
        onSelectWord={onSelectWord}
        hoveredKey={hoveredKey}
        setHoveredKey={setHoveredKey}
        isGenerating={isGenerating}
      />
    </div>
  )
}
