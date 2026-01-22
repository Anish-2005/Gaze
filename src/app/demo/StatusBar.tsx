'use client'

import {
  Activity,
  Eye,
  Camera,
  CheckCircle,
  XCircle,
  Settings,
} from 'lucide-react'

interface StatusBarProps {
  cameraActive: boolean
  trackingLocked: boolean
  calibrationComplete: boolean
  onToggleCalibration?: () => void
  onToggleTracking?: () => void
}

export default function StatusBar({
  cameraActive,
  trackingLocked,
  calibrationComplete,
  onToggleCalibration,
  onToggleTracking,
}: StatusBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#0B1220] text-slate-100 border-b border-slate-800">
      <div className="max-w-8xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-12">

          {/* LEFT — SYSTEM STATUS */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">

            {/* Camera */}
            <StatusItem
              icon={Camera}
              label="Camera"
              state={cameraActive ? 'ACTIVE' : 'OFFLINE'}
              stateColor={cameraActive ? 'text-emerald-400' : 'text-red-400'}
              pulse={cameraActive}
            />

            {/* Tracking */}
            <StatusItem
              icon={Eye}
              label="Tracking"
              state={trackingLocked ? 'LOCKED' : 'SEARCHING'}
              stateColor={trackingLocked ? 'text-emerald-400' : 'text-amber-400'}
            />

            {/* Calibration — hide label on very small screens */}
            <div className="hidden sm:flex">
              <StatusItem
                icon={calibrationComplete ? CheckCircle : XCircle}
                label="Calibration"
                state={calibrationComplete ? 'COMPLETE' : 'REQUIRED'}
                stateColor={calibrationComplete ? 'text-emerald-400' : 'text-amber-400'}
              />
            </div>
          </div>

          {/* RIGHT — CONTROLS */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Calibration button */}
            {onToggleCalibration && (
              <ControlButton
                icon={Settings}
                label="Calibrate"
                onClick={onToggleCalibration}
              />
            )}

            {/* Tracking button */}
            {onToggleTracking && (
              <ControlButton
                icon={Activity}
                label="Tracking"
                onClick={onToggleTracking}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- SUBCOMPONENTS ---------- */

function StatusItem({
  icon: Icon,
  label,
  state,
  stateColor,
  pulse = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  state: string
  stateColor: string
  pulse?: boolean
}) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <div className="relative">
        <Icon className={`w-4 h-4 ${stateColor}`} />
        {pulse && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        )}
      </div>
      <span className="hidden sm:inline font-medium text-slate-300">
        {label}
      </span>
      <span className={`font-mono text-xs sm:text-sm ${stateColor}`}>
        {state}
      </span>
    </div>
  )
}

function ControlButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 transition text-xs sm:text-sm"
      title={label}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}
