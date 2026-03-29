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
    <section className="surface-card-strong p-5 sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: 'rgb(var(--text-muted))' }}>
            Current Message
          </p>
          <div className="mt-3 rounded-xl border px-4 py-3" style={{ borderColor: 'var(--card-border)', background: 'var(--card-bg)' }}>
            <p
              className={cn(
                'min-h-[2.4rem] text-lg font-semibold leading-snug sm:text-2xl',
                message ? '' : 'italic'
              )}
              style={{ color: message ? 'rgb(var(--text-primary))' : 'rgb(var(--text-muted))' }}
            >
              {message || 'Awaiting gaze input...'}
            </p>
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
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
    primary: {
      borderColor: 'color-mix(in oklab, rgb(var(--accent-blue)) 36%, var(--card-border))',
      background: 'color-mix(in oklab, rgb(var(--accent-blue)) 15%, var(--card-bg))',
      color: 'rgb(var(--text-primary))',
      icon: 'rgb(var(--accent-blue))',
    },
    danger: {
      borderColor: 'color-mix(in oklab, rgb(var(--accent-rose)) 36%, var(--card-border))',
      background: 'color-mix(in oklab, rgb(var(--accent-rose)) 12%, var(--card-bg))',
      color: 'rgb(var(--text-primary))',
      icon: 'rgb(var(--accent-rose))',
    },
    neutral: {
      borderColor: 'var(--card-border)',
      background: 'var(--card-bg)',
      color: 'rgb(var(--text-secondary))',
      icon: 'rgb(var(--text-muted))',
    },
  }

  const palette = styles[variant]

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition sm:text-sm',
        disabled && 'cursor-not-allowed opacity-45'
      )}
      style={disabled
        ? {
            borderColor: 'var(--card-border)',
            background: 'var(--card-bg)',
            color: 'rgb(var(--text-muted))',
          }
        : {
            borderColor: palette.borderColor,
            background: palette.background,
            color: palette.color,
          }}
    >
      <span className="relative inline-flex">
        <Icon className="h-4 w-4" style={{ color: disabled ? 'rgb(var(--text-muted))' : palette.icon }} />
        {active && <span className="absolute -inset-1 animate-ping rounded-full border" style={{ borderColor: 'rgb(var(--accent-blue))' }} />}
      </span>
      {label}
    </button>
  )
}
