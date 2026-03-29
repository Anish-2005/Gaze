'use client'

import { RotateCcw, Trash2, Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MessageBarProps {
  message: string
  isSpeaking: boolean
  onSpeak: () => void
  onClear: () => void
  onReset?: () => void
}

export default function MessageBar({
  message,
  isSpeaking,
  onSpeak,
  onClear,
  onReset,
}: MessageBarProps) {
  const wordCount = message.trim().length > 0 ? message.trim().split(/\s+/).length : 0

  return (
    <section className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-5 shadow-[0_16px_40px_rgba(2,6,23,0.35)] sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Current Message</p>
          <div className="mt-3 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3">
            <p
              className={cn(
                'min-h-[2.4rem] text-lg font-semibold leading-snug sm:text-2xl',
                message ? 'text-white' : 'italic text-slate-500'
              )}
            >
              {message || 'Awaiting gaze input...'}
            </p>
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
            <span>{message.length} characters</span>
            <span>{wordCount} words</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-1">
          {onReset && (
            <ControlButton
              onClick={onReset}
              label="Reset"
              icon={RotateCcw}
              variant="neutral"
            />
          )}
          <ControlButton
            onClick={onClear}
            label="Clear"
            icon={Trash2}
            disabled={!message}
            variant="danger"
          />
          <ControlButton
            onClick={onSpeak}
            label={isSpeaking ? 'Speaking...' : 'Speak'}
            icon={Volume2}
            disabled={!message || isSpeaking}
            variant="primary"
            active={isSpeaking}
          />
        </div>
      </div>
    </section>
  )
}

function ControlButton({
  icon: Icon,
  label,
  onClick,
  disabled,
  variant,
  active = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick: () => void
  disabled?: boolean
  variant: 'primary' | 'danger' | 'neutral'
  active?: boolean
}) {
  const styles = {
    primary: 'border-cyan-400/35 bg-cyan-400/15 text-cyan-100 hover:border-cyan-300 hover:bg-cyan-400/20',
    danger: 'border-rose-400/35 bg-rose-400/10 text-rose-100 hover:border-rose-300 hover:bg-rose-400/15',
    neutral: 'border-slate-600 bg-slate-900 text-slate-200 hover:border-slate-500 hover:bg-slate-800',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition sm:text-sm',
        disabled ? 'cursor-not-allowed border-slate-800 bg-slate-900/50 text-slate-600' : styles[variant]
      )}
    >
      <span className="relative inline-flex">
        <Icon className="h-4 w-4" />
        {active && <span className="absolute -inset-1 animate-ping rounded-full border border-cyan-300/70" />}
      </span>
      {label}
    </button>
  )
}
