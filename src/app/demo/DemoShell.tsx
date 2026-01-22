'use client'

import { useState, useEffect } from 'react'
import { useDemoState } from './useDemoState'
import { useDwellDetection } from './useDwellDetection'
import { useGazeSimulation } from './useGazeSimulation'
import StatusBar from './StatusBar'
import MessageBar from './MessageBar'
import GazeKeyboard from './GazeKeyboard'
import QuickPhrases from './QuickPhrases'
import CalibrationOverlay from './CalibrationOverlay'
import GazeCursor from './GazeCursor'

export default function DemoShell() {
  // State management
  const {
    state,
    addChar,
    addPhrase,
    clearMessage,
    speak,
    toggleCalibration,
    toggleTracking,
    resetDemo,
  } = useDemoState()

  // Dwell detection
  const {
    hoveredKey,
    dwellProgress,
    isDwelling,
    setHoveredKey,
  } = useDwellDetection(addChar)

  // Gaze simulation (for demo purposes)
  const { gazePoint, isSimulating, toggleSimulation } = useGazeSimulation()

  // Calibration
  const [showCalibration, setShowCalibration] = useState(false)

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // C for calibration
      if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault()
        setShowCalibration(true)
      }
      
      // T for toggle gaze simulation
      if (e.key === 't' && e.ctrlKey) {
        e.preventDefault()
        toggleSimulation()
      }
      
      // R for reset
      if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault()
        resetDemo()
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown)
    }
  }, [toggleSimulation, resetDemo])

  // Handle speak/clear events
  useEffect(() => {
    const handleSpeak = () => speak()
    const handleClear = () => clearMessage()

    window.addEventListener('speak', handleSpeak)
    window.addEventListener('clear', handleClear)
    
    return () => {
      window.removeEventListener('speak', handleSpeak)
      window.removeEventListener('clear', handleClear)
    }
  }, [speak, clearMessage])

  const handleCalibrationComplete = () => {
    setShowCalibration(false)
    toggleCalibration()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Status Bar */}
      <StatusBar
        cameraActive={state.cameraActive}
        trackingLocked={state.trackingLocked}
        calibrationComplete={state.calibrationComplete}
        onToggleCalibration={() => setShowCalibration(true)}
        onToggleTracking={toggleTracking}
      />

      {/* Message Bar */}
      <MessageBar
        message={state.message}
        isSpeaking={state.isSpeaking}
        onSpeak={speak}
        onClear={clearMessage}
        onReset={resetDemo}
      />

      {/* Main Content */}
      <main className="pt-24 flex-1 flex flex-col items-center justify-center pt-32 pb-40">
        <div className="container mx-auto px-4">
          {/* Demo title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              GAZE Communication Interface
            </h1>
            <p className="text-gray-600">
              Medical-grade eye-tracking communication for patients with paralysis
            </p>
            
            {/* Demo mode indicator */}
            <div className="mt-4 inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
              <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-sm font-medium">
                {isSimulating ? 'Gaze simulation active' : 'Mouse mode'}
              </span>
            </div>
          </div>

          {/* Gaze Keyboard and Shortcuts */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            <div className="flex justify-center">
              <GazeKeyboard
                onSelect={addChar}
                hoveredKey={hoveredKey}
                dwellProgress={dwellProgress}
                setHoveredKey={setHoveredKey}
              />
            </div>

            {/* Keyboard Shortcuts Help */}
            <div className="hidden md:block lg:w-64">
              <div className="text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-lg border border-gray-200">
                <div className="font-medium mb-2">Demo Shortcuts:</div>
                <div className="grid grid-cols-1 gap-y-2">
                  <div className="flex items-center">
                    <kbd className="mr-3 px-2 py-1 bg-gray-100 rounded text-xs">Space</kbd>
                    <span>Speak</span>
                  </div>
                  <div className="flex items-center">
                    <kbd className="mr-3 px-2 py-1 bg-gray-100 rounded text-xs">Esc</kbd>
                    <span>Clear</span>
                  </div>
                  <div className="flex items-center">
                    <kbd className="mr-3 px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+R</kbd>
                    <span>Reset</span>
                  </div>
                  <div className="flex items-center">
                    <kbd className="mr-3 px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+C</kbd>
                    <span>Calibrate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dwell status */}
          {isDwelling && (
            <div className="fixed top-1/2 right-8 transform -translate-y-1/2">
              <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    Dwell Selection
                  </div>
                  <div className="text-3xl font-bold text-blue-600">
                    {Math.round(dwellProgress)}%
                  </div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-100"
                      style={{ width: `${dwellProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Quick Phrases */}
      <QuickPhrases
        selectedPhrase={state.selectedQuickPhrase}
        onSelect={addPhrase}
      />

      {/* Gaze Cursor (visible only in simulation mode) */}
      <GazeCursor
        x={gazePoint.x}
        y={gazePoint.y}
        visible={isSimulating}
      />

      {/* Calibration Overlay */}
      <CalibrationOverlay
        isVisible={showCalibration}
        onComplete={handleCalibrationComplete}
      />

      {/* Hidden controls for judges */}
      <div className="fixed bottom-4 right-4 flex space-x-2">
        <button
          onClick={() => setShowCalibration(true)}
          className="px-3 py-2 text-xs bg-gray-800 text-white rounded-lg opacity-20 hover:opacity-100 transition-opacity"
          title="Show calibration (Ctrl+C)"
        >
          Calibrate
        </button>
        <button
          onClick={toggleSimulation}
          className="px-3 py-2 text-xs bg-gray-800 text-white rounded-lg opacity-20 hover:opacity-100 transition-opacity"
          title="Toggle gaze simulation (Ctrl+T)"
        >
          {isSimulating ? 'Stop Gaze' : 'Start Gaze'}
        </button>
        <button
          onClick={resetDemo}
          className="px-3 py-2 text-xs bg-gray-800 text-white rounded-lg opacity-20 hover:opacity-100 transition-opacity"
          title="Reset demo (Ctrl+R)"
        >
          Reset
        </button>
      </div>
    </div>
  )
}