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
        className="relative overflow-hidden rounded-2xl border p-4 sm:p-6"
        style={{
          borderColor: 'var(--card-border)',
          background: 'var(--card-bg)',
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-5 flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--card-border)' }}>
          <div className="flex items-center gap-2">
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border"
              style={{
                borderColor: 'color-mix(in oklab, rgb(var(--accent-blue)) 34%, var(--card-border))',
                background: 'color-mix(in oklab, rgb(var(--accent-blue)) 14%, transparent)',
                color: 'rgb(var(--accent-blue))',
              }}
            >
              <KeyboardIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-primary))' }}>Gaze Keyboard</p>
              <p className="text-xs" style={{ color: 'rgb(var(--text-muted))' }}>Dwell to select, tap for manual fallback</p>
            </div>
          </div>
          <span
            className="rounded-full border px-2.5 py-1 text-[11px]"
            style={{
              borderColor: 'var(--card-border)',
              background: 'var(--card-bg-strong)',
              color: 'rgb(var(--text-muted))',
            }}
          >
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

        <div
          className="mt-5 rounded-xl border px-4 py-2 text-center text-xs"
          style={{
            borderColor: 'var(--card-border)',
            background: 'var(--card-bg-strong)',
            color: 'rgb(var(--text-muted))',
          }}
        >
          Keep gaze stable for around 1.5 seconds to trigger a key selection. Suggestions use faster dwell.
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
