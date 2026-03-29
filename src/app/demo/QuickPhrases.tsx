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
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
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
    <section className="surface-card p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: 'rgb(var(--text-secondary))' }}>
          Quick Phrases
        </h2>
        <span
          className="rounded-full border px-2.5 py-1 text-[11px]"
          style={{
            borderColor: 'var(--card-border)',
            background: 'var(--card-bg-strong)',
            color: 'rgb(var(--text-muted))',
          }}
        >
          High-priority communication
        </span>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'rgb(var(--accent-rose))' }}>Critical</p>
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
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'rgb(var(--accent-blue))' }}>Common</p>
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

  const toneStyle = phrase.tone === 'critical'
    ? {
        borderColor: 'color-mix(in oklab, rgb(var(--accent-rose)) 35%, var(--card-border))',
        background: 'color-mix(in oklab, rgb(var(--accent-rose)) 12%, var(--card-bg))',
        color: 'rgb(var(--text-primary))',
        iconColor: 'rgb(var(--accent-rose))',
      }
    : {
        borderColor: 'color-mix(in oklab, rgb(var(--accent-blue)) 34%, var(--card-border))',
        background: 'color-mix(in oklab, rgb(var(--accent-blue)) 12%, var(--card-bg))',
        color: 'rgb(var(--text-primary))',
        iconColor: 'rgb(var(--accent-blue))',
      }

  return (
    <div className="relative">
      <button
        onClick={() => onSelect(phrase.text)}
        onMouseEnter={() => setHoveredKey(phrase.keyId)}
        onMouseLeave={() => setHoveredKey(null)}
        data-gaze-key={phrase.keyId}
        className={cn('w-full rounded-xl border px-3 py-3 text-left transition')}
        style={active
          ? {
              ...toneStyle,
              boxShadow: '0 0 0 2px color-mix(in oklab, rgb(var(--accent-cyan)) 32%, transparent)',
            }
          : toneStyle}
      >
        <div className="flex items-start gap-3">
          <span
            className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg border"
            style={{
              borderColor: 'color-mix(in oklab, currentColor 24%, transparent)',
              background: 'color-mix(in oklab, currentColor 8%, transparent)',
            }}
          >
            <Icon className="h-4 w-4" style={{ color: toneStyle.iconColor }} />
          </span>
          <span className="text-sm font-semibold">{phrase.text}</span>
        </div>
      </button>

      {active && isDwelling && (
        <div className="absolute inset-x-3 -bottom-1 h-1 overflow-hidden rounded-full" style={{ background: 'var(--card-bg-strong)' }}>
          <div
            className="h-full transition-all"
            style={{
              width: `${dwellProgress}%`,
              background: 'linear-gradient(90deg, rgb(var(--accent-blue)) 0%, rgb(var(--accent-cyan)) 60%, rgb(var(--accent-emerald)) 100%)',
            }}
          />
        </div>
      )}
    </div>
  )
}
