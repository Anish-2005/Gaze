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

// Frequency weights for visual feedback
const LETTER_FREQUENCY: Record<string, number> = {
  'E': 12.7, 'T': 9.1, 'A': 8.2, 'O': 7.5, 'I': 7.0,
  'N': 6.7, 'R': 6.0, 'S': 6.3, 'H': 6.1, 'L': 4.0,
  'D': 4.3, 'C': 2.8, 'U': 2.8, 'M': 2.4, 'F': 2.2,
  'P': 1.9, 'G': 2.0, 'W': 2.4, 'Y': 2.0, 'B': 1.5,
  'V': 1.0, 'K': 0.8, 'X': 0.2, 'J': 0.2, 'Q': 0.1,
}

export default function GazeKeyboard({
  onSelect,
  hoveredKey,
  dwellProgress,
  setHoveredKey,
}: GazeKeyboardProps) {
  // Handle gaze hover events
  useEffect(() => {
    const handleGazeHover = (event: CustomEvent) => {
      setHoveredKey(event.detail.key)
    }

    window.addEventListener('gazehover', handleGazeHover as EventListener)
    
    return () => {
      window.removeEventListener('gazehover', handleGazeHover as EventListener)
    }
  }, [setHoveredKey])

  // Handle keyboard navigation (for judges)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase()
      if (LETTER_FREQUENCY[key]) {
        setHoveredKey(key)
        setTimeout(() => {
          onSelect(key)
          setHoveredKey(null)
        }, 100)
      }
      
      // Space to speak
      if (event.key === ' ') {
        event.preventDefault()
        const speakEvent = new CustomEvent('speak')
        window.dispatchEvent(speakEvent)
      }
      
      // Escape to clear
      if (event.key === 'Escape') {
        const clearEvent = new CustomEvent('clear')
        window.dispatchEvent(clearEvent)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onSelect, setHoveredKey])

  return (
    <div className="relative">
      {/* Keyboard Container */}
      <div className="grid grid-rows-5 gap-4 p-6 bg-gray-50/50 rounded-2xl backdrop-blur-sm border border-gray-200 shadow-lg">
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="grid grid-cols-5 gap-4"
          >
            {row.map(letter => {
              const frequency = LETTER_FREQUENCY[letter]
              const isHovered = hoveredKey === letter
              
              return (
                <div key={letter} className="flex flex-col items-center">
                  <Key
                    letter={letter}
                    isHovered={isHovered}
                    dwellProgress={isHovered ? dwellProgress : 0}
                    onMouseEnter={() => setHoveredKey(letter)}
                    onMouseLeave={() => setHoveredKey(null)}
                    onClick={() => onSelect(letter)}
                  />
                  
                  {/* Frequency indicator (subtle) */}
                  <div className="mt-2">
                    <div className="text-xs text-gray-500 font-mono">
                      {frequency.toFixed(1)}%
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Instructional overlay */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
          <span className="font-medium">Focus on a letter for 1.5 seconds to select</span>
          <span className="mx-2">•</span>
          <span className="text-blue-600">Press SPACE to speak</span>
        </div>
      </div>
    </div>
  )
}