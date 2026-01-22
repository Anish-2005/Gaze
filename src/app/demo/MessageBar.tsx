'use client'

import { Volume2, Trash2, RotateCcw } from 'lucide-react'
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
  return (
    <div className="fixed top-12 left-0 right-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-8xl mx-auto px-3 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">

          {/* MESSAGE DISPLAY */}
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
              Current message
            </div>

            <div
              className={cn(
                'leading-snug transition-colors',
                message
                  ? 'text-slate-900'
                  : 'text-slate-400 italic'
              )}
            >
              <span className="block text-xl sm:text-2xl md:text-3xl font-medium break-words">
                {message || 'Waiting for input…'}
              </span>
            </div>

            {message && (
              <div className="mt-1 text-xs text-slate-500">
                {message.length} characters
              </div>
            )}
          </div>

          {/* CONTROLS */}
          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">

            {/* Reset — optional */}
            {onReset && (
              <ControlButton
                onClick={onReset}
                label="Reset"
                icon={RotateCcw}
                variant="neutral"
              />
            )}

            {/* Clear */}
            <ControlButton
              onClick={onClear}
              label="Clear"
              icon={Trash2}
              disabled={!message}
              variant="danger"
            />

            {/* Speak */}
            <ControlButton
              onClick={onSpeak}
              label={isSpeaking ? 'Speaking…' : 'Speak'}
              icon={Volume2}
              disabled={!message || isSpeaking}
              variant="primary"
              active={isSpeaking}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

/* ---------- SUBCOMPONENT ---------- */

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
    primary:
      'bg-slate-900 text-white hover:bg-slate-800',
    danger:
      'bg-transparent text-red-600 hover:bg-red-50',
    neutral:
      'bg-transparent text-slate-600 hover:bg-slate-100',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex flex-col items-center justify-center rounded-lg px-4 py-2 transition',
        'min-w-[64px]',
        disabled
          ? 'opacity-40 cursor-not-allowed'
          : styles[variant]
      )}
    >
      <div className="relative">
        <Icon className="w-5 h-5" />
        {active && (
          <span className="absolute -inset-1 rounded-full border border-slate-400 animate-pulse" />
        )}
      </div>
      <span className="mt-1 text-[11px] sm:text-xs font-medium">
        {label}
      </span>
    </button>
  )
}
