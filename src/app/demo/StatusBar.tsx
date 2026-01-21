'use client'

import { Activity, Eye, Camera, CheckCircle, XCircle, Settings } from 'lucide-react'

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
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-gray-100 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-10">
          {/* Left: Status indicators */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Camera className={`w-4 h-4 ${cameraActive ? 'text-green-400' : 'text-red-400'}`} />
                {cameraActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                )}
              </div>
              <span className="font-medium">Camera</span>
              <span className={`font-mono ${cameraActive ? 'text-green-400' : 'text-red-400'}`}>
                {cameraActive ? 'ACTIVE' : 'OFFLINE'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Eye className={`w-4 h-4 ${trackingLocked ? 'text-green-400' : 'text-amber-400'}`} />
              <span className="font-medium">Tracking</span>
              <span className={`font-mono ${trackingLocked ? 'text-green-400' : 'text-amber-400'}`}>
                {trackingLocked ? 'LOCKED' : 'SEARCHING'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {calibrationComplete ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="font-medium">Calibration</span>
                  <span className="font-mono text-green-400">COMPLETE</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-amber-400" />
                  <span className="font-medium">Calibration</span>
                  <span className="font-mono text-amber-400">REQUIRED</span>
                </>
              )}
            </div>
          </div>

          {/* Right: Controls (only visible to judges/caregivers) */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleCalibration}
              className="flex items-center space-x-2 px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-xs transition-colors"
              title="Toggle calibration status"
            >
              <Settings className="w-3 h-3" />
              <span>Calibrate</span>
            </button>
            
            <button
              onClick={onToggleTracking}
              className="flex items-center space-x-2 px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-xs transition-colors"
              title="Toggle eye tracking"
            >
              <Activity className="w-3 h-3" />
              <span>Tracking</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}