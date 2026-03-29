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
  confidence?: number
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
    <div className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-4 shadow-[0_14px_32px_rgba(2,6,23,0.35)] sm:p-5">
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
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  tone: 'ok' | 'warn' | 'neutral'
}) {
  const toneStyles = {
    ok: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
    warn: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
    neutral: 'border-slate-600 bg-slate-900/80 text-slate-200',
  }

  return (
    <div className={cn('rounded-xl border p-3', toneStyles[tone])}>
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] opacity-80">
        <Icon className="h-3.5 w-3.5" />
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
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick: () => void
  emphasized?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition sm:text-sm',
        emphasized
          ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-100 hover:border-cyan-300 hover:bg-cyan-400/15'
          : 'border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500 hover:bg-slate-800'
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  )
}
