'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Key from './Key'
import WordPredictions from './WordPredictions'
import { Keyboard as KeyboardIcon } from 'lucide-react'

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
  isGenerating = false
}: GazeKeyboardProps) {

  /* ---------- GAZE EVENTS ---------- */
  useEffect(() => {
    const handleGazeHover = (event: CustomEvent) => {
      const key = event.detail.key
      setHoveredKey(key)
      // Track hovered keys for word prediction (only letters)
      if (key && key.length === 1 && /[A-Z]/.test(key)) {
        addHoveredKey(key)
      }
    }

    window.addEventListener('gazehover', handleGazeHover as EventListener)
    return () =>
      window.removeEventListener('gazehover', handleGazeHover as EventListener)
  }, [setHoveredKey, addHoveredKey])

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
      <motion.div
        className="glass-card p-4 sm:p-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4 pb-4 border-b border-slate-700/50">
          <motion.div
            className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <KeyboardIcon className="w-4 h-4 text-blue-400" />
          </motion.div>
          <span className="text-sm font-medium text-slate-400">Eye-Controlled Keyboard</span>
        </div>

        {/* Ambient background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Rows */}
        <div className="space-y-3 sm:space-y-4 relative z-10">
          {KEYBOARD_LAYOUT.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="flex justify-center gap-2 sm:gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rowIndex * 0.05 }}
            >
              {row.map(letter => (
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

        {/* Mobile hint */}
        <motion.div
          className="mt-4 sm:hidden text-center text-xs text-slate-500 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          Focus on a letter to select • Tap to test
        </motion.div>
      </motion.div>

      {/* Word Predictions */}
      <WordPredictions
        predictions={predictions}
        onSelectWord={onSelectWord}
        hoveredKey={hoveredKey}
        setHoveredKey={setHoveredKey}
        isGenerating={isGenerating}
      />

      {/* Desktop hint */}
      <motion.div
        className="hidden sm:flex mt-4 text-center text-sm text-slate-500 items-center justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
        Focus on a letter for a moment to type
        <span className="mx-2 text-slate-600">•</span>
        Press <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono text-xs">Space</kbd> to speak
      </motion.div>
    </div>
  )
}
