'use client'

import {
  AlertTriangle,
  Bell,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Wind,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Phrase {
  text: string
  icon: React.ComponentType<{ className?: string }>
  keyId: string
  color?: string
}

interface PhraseButtonProps {
  phrase: Phrase
  hoveredKey: string | null
  setHoveredKey: (k: string | null) => void
  isDwelling: boolean
  dwellProgress: number
  onSelect: (t: string) => void
  critical?: boolean
}

interface QuickPhrasesProps {
  onSelect: (t: string) => void
  hoveredKey: string | null
  setHoveredKey: (k: string | null) => void
  isDwelling: boolean
  dwellProgress: number
}

const CRITICAL_PHRASES = [
  { text: 'I AM IN PAIN', icon: AlertTriangle, keyId: 'PAIN', color: 'border-red-500 text-red-700' },
  { text: "I CAN'T BREATHE", icon: Wind, keyId: 'BREATHE', color: 'border-red-500 text-red-700' },
  { text: 'CALL NURSE', icon: Bell, keyId: 'NURSE', color: 'border-amber-500 text-amber-700' },
  { text: 'PLEASE HELP', icon: AlertTriangle, keyId: 'HELP', color: 'border-amber-500 text-amber-700' },
]

const COMMON_PHRASES = [
  { text: 'YES', icon: ThumbsUp, keyId: 'YES' },
  { text: 'NO', icon: ThumbsDown, keyId: 'NO' },
  { text: 'I NEED WATER', icon: Heart, keyId: 'WATER' },
  { text: 'THANK YOU', icon: Heart, keyId: 'THANKYOU' },
]

export default function QuickPhrases({
  onSelect,
  hoveredKey,
  setHoveredKey,
  isDwelling,
  dwellProgress,
}: QuickPhrasesProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200">
      <div className="max-w-8xl mx-auto px-4 py-3">

        {/* Header */}
        <div className="text-xs text-slate-500 text-center mb-3">
          Quick phrases • emergency communication
        </div>

        {/* CRITICAL */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          {CRITICAL_PHRASES.map(item => (
            <PhraseButton
              key={item.keyId}
              phrase={item}
              hoveredKey={hoveredKey}
              setHoveredKey={setHoveredKey}
              isDwelling={isDwelling}
              dwellProgress={dwellProgress}
              onSelect={onSelect}
              critical
            />
          ))}
        </div>

        {/* COMMON */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {COMMON_PHRASES.map(item => (
            <PhraseButton
              key={item.keyId}
              phrase={item}
              hoveredKey={hoveredKey}
              setHoveredKey={setHoveredKey}
              isDwelling={isDwelling}
              dwellProgress={dwellProgress}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- SUBCOMPONENT ---------- */

function PhraseButton({
  phrase,
  hoveredKey,
  setHoveredKey,
  isDwelling,
  dwellProgress,
  onSelect,
  critical = false,
}: PhraseButtonProps) {
  const Icon = phrase.icon
  const active = hoveredKey === phrase.keyId

  return (
    <div className="relative">
      <button
        onClick={() => onSelect(phrase.text)}
        onMouseEnter={() => setHoveredKey(phrase.keyId)}
        onMouseLeave={() => setHoveredKey(null)}
        className={cn(
          'w-full h-12 sm:h-14 rounded-lg border text-xs sm:text-sm font-medium transition',
          active
            ? `${phrase.color} bg-slate-50`
            : 'border-slate-300 text-slate-700 bg-white',
          critical && 'font-semibold'
        )}
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <Icon className="w-4 h-4" />
          <span className="text-center leading-tight px-1">
            {phrase.text}
          </span>
        </div>
      </button>

      {/* Dwell indicator */}
      {active && isDwelling && (
        <div className="absolute inset-x-2 -bottom-1 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-slate-900 transition-all"
            style={{ width: `${dwellProgress}%` }}
          />
        </div>
      )}
    </div>
  )
}
