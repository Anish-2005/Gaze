'use client'

import {
  Activity,
  Camera,
  CheckCircle2,
  Eye,
  Gauge,
  RefreshCw,
  ScanLine,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatusBarProps {
  cameraActive: boolean
  trackingActive: boolean
  calibrationComplete: boolean
  trackingMode: 'real' | 'simulation'
  confidence?: number | undefined
  onToggleCalibration?: () => void
  onToggleTracking?: () => void
  onSwitchMode?: () => void
}

export default function StatusBar({
  cameraActive,
  trackingActive,
  calibrationComplete,
  trackingMode,
  confidence,
  onToggleCalibration,
  onToggleTracking,
  onSwitchMode,
}: StatusBarProps) {
  return (
    <div className="surface-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatusItem
            icon={Camera}
            label="Camera"
            value={cameraActive ? 'Ready' : 'Offline'}
            tone={cameraActive ? 'ok' : 'warn'}
          />
          <StatusItem
            icon={Eye}
            label="Tracking"
            value={trackingActive ? 'Active' : 'Paused'}
            tone={trackingActive ? 'ok' : 'neutral'}
          />
          <StatusItem
            icon={ScanLine}
            label="Calibration"
            value={calibrationComplete ? 'Complete' : 'Required'}
            tone={calibrationComplete ? 'ok' : 'warn'}
          />
          <StatusItem
            icon={Gauge}
            label="Signal"
            value={trackingMode === 'real' ? `${Math.round((confidence || 0) * 100)}%` : 'Simulated'}
            tone={trackingMode === 'real' ? 'neutral' : 'ok'}
          />
        </div>

        <div className="grid gap-2 sm:grid-cols-3 lg:flex lg:items-center">
          {onToggleTracking && (
            <ControlButton icon={Activity} label={trackingActive ? 'Pause Tracking' : 'Start Tracking'} onClick={onToggleTracking} />
          )}
          {onSwitchMode && (
            <ControlButton
              icon={RefreshCw}
              label={trackingMode === 'real' ? 'Use Simulation' : 'Use Real Camera'}
              onClick={onSwitchMode}
            />
          )}
          {onToggleCalibration && (
            <ControlButton icon={CheckCircle2} label="Run Calibration" onClick={onToggleCalibration} emphasized />
          )}
        </div>
      </div>
    </div>
  )
}

function StatusItem({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  label: string
  value: string
  tone: 'ok' | 'warn' | 'neutral'
}) {
  const toneStyles = {
    ok: {
      borderColor: 'color-mix(in oklab, rgb(var(--accent-emerald)) 32%, var(--card-border))',
      background: 'color-mix(in oklab, rgb(var(--accent-emerald)) 12%, var(--card-bg))',
      color: 'rgb(var(--text-primary))',
      iconColor: 'rgb(var(--accent-emerald))',
    },
    warn: {
      borderColor: 'rgba(245, 158, 11, 0.45)',
      background: 'rgba(245, 158, 11, 0.14)',
      color: 'rgb(var(--text-primary))',
      iconColor: 'rgb(245 158 11)',
    },
    neutral: {
      borderColor: 'var(--card-border)',
      background: 'var(--card-bg-strong)',
      color: 'rgb(var(--text-primary))',
      iconColor: 'rgb(var(--accent-blue))',
    },
  }

  const palette = toneStyles[tone]

  return (
    <div className="rounded-xl border p-3" style={{ borderColor: palette.borderColor, background: palette.background, color: palette.color }}>
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em]" style={{ color: 'rgb(var(--text-muted))' }}>
        <Icon className="h-3.5 w-3.5" style={{ color: palette.iconColor }} />
        {label}
      </div>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  )
}

function ControlButton({
  icon: Icon,
  label,
  onClick,
  emphasized = false,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  label: string
  onClick: () => void
  emphasized?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition sm:text-sm',
        emphasized ? 'hover:-translate-y-[1px]' : 'hover:-translate-y-[1px]'
      )}
      style={emphasized
        ? {
            borderColor: 'color-mix(in oklab, rgb(var(--accent-blue)) 38%, var(--card-border))',
            background: 'color-mix(in oklab, rgb(var(--accent-blue)) 16%, var(--card-bg))',
            color: 'rgb(var(--text-primary))',
          }
        : {
            borderColor: 'var(--card-border)',
            background: 'var(--card-bg)',
            color: 'rgb(var(--text-secondary))',
          }}
    >
      <Icon className="h-3.5 w-3.5" style={{ color: emphasized ? 'rgb(var(--accent-blue))' : 'rgb(var(--text-muted))' }} />
      {label}
    </button>
  )
}
