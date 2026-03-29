'use client'

import {
  AlertTriangle,
  Bell,
  Heart,
  ThumbsDown,
  ThumbsUp,
  Wind,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Phrase {
  text: string
  icon: React.ComponentType<{ className?: string }>
  keyId: string
  tone: 'critical' | 'support'
}

interface PhraseButtonProps {
  phrase: Phrase
  hoveredKey: string | null
  setHoveredKey: (k: string | null) => void
  isDwelling: boolean
  dwellProgress: number
  onSelect: (t: string) => void
}

interface QuickPhrasesProps {
  onSelect: (t: string) => void
  hoveredKey: string | null
  setHoveredKey: (k: string | null) => void
  isDwelling: boolean
  dwellProgress: number
}

const CRITICAL_PHRASES: Phrase[] = [
  { text: 'I AM IN PAIN', icon: AlertTriangle, keyId: 'PAIN', tone: 'critical' },
  { text: "I CAN'T BREATHE", icon: Wind, keyId: 'BREATHE', tone: 'critical' },
  { text: 'CALL NURSE', icon: Bell, keyId: 'NURSE', tone: 'critical' },
  { text: 'PLEASE HELP', icon: AlertTriangle, keyId: 'HELP', tone: 'critical' },
]

const COMMON_PHRASES: Phrase[] = [
  { text: 'YES', icon: ThumbsUp, keyId: 'YES', tone: 'support' },
  { text: 'NO', icon: ThumbsDown, keyId: 'NO', tone: 'support' },
  { text: 'I NEED WATER', icon: Heart, keyId: 'WATER', tone: 'support' },
  { text: 'THANK YOU', icon: Heart, keyId: 'THANKYOU', tone: 'support' },
]

export default function QuickPhrases({
  onSelect,
  hoveredKey,
  setHoveredKey,
  isDwelling,
  dwellProgress,
}: QuickPhrasesProps) {
  return (
    <section className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-5 shadow-[0_16px_38px_rgba(2,6,23,0.35)] sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-300">Quick Phrases</h2>
        <span className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] text-slate-400">
          High-priority communication
        </span>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-rose-200">Critical</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {CRITICAL_PHRASES.map((item) => (
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

      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100">Common</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {COMMON_PHRASES.map((item) => (
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
    </section>
  )
}

function PhraseButton({
  phrase,
  hoveredKey,
  setHoveredKey,
  isDwelling,
  dwellProgress,
  onSelect,
}: PhraseButtonProps) {
  const Icon = phrase.icon
  const active = hoveredKey === phrase.keyId

  return (
    <div className="relative">
      <button
        onClick={() => onSelect(phrase.text)}
        onMouseEnter={() => setHoveredKey(phrase.keyId)}
        onMouseLeave={() => setHoveredKey(null)}
        data-gaze-key={phrase.keyId}
        className={cn(
          'w-full rounded-xl border px-3 py-3 text-left transition',
          phrase.tone === 'critical'
            ? 'border-rose-400/30 bg-rose-400/10 text-rose-100 hover:bg-rose-400/15'
            : 'border-cyan-400/30 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/15',
          active && 'ring-2 ring-cyan-300/60'
        )}
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10">
            <Icon className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold">{phrase.text}</span>
        </div>
      </button>

      {active && isDwelling && (
        <div className="absolute inset-x-3 -bottom-1 h-1 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full bg-gradient-to-r from-cyan-300 to-emerald-300 transition-all" style={{ width: `${dwellProgress}%` }} />
        </div>
      )}
    </div>
  )
}
