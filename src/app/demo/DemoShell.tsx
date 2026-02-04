'use client'

import { useState, useEffect, useCallback } from 'react'
import { useDemoState } from './useDemoState'
import { useDwellDetection } from './useDwellDetection'
import { useGazeSimulation } from './useGazeSimulation'
import { useEyeTracking } from './useEyeTracking'
import StatusBar from './StatusBar'
import MessageBar from './MessageBar'
import GazeKeyboard from './GazeKeyboard'
import QuickPhrases from './QuickPhrases'
import CalibrationOverlay from './CalibrationOverlay'
import GazeCursor from './GazeCursor'
import { useWordPrediction } from './useWordPrediction'

function ActionButton({
  label,
  onClick,
  active,
  color,
}: {
  label: string
  onClick: () => void
  active: boolean
  color: 'emerald' | 'red' | 'amber' | 'blue'
}) {
  const colors = {
    emerald: 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10',
    red: 'border-red-500/50 text-red-400 bg-red-500/10',
    amber: 'border-amber-500/50 text-amber-400 bg-amber-500/10',
    blue: 'border-blue-500/50 text-blue-400 bg-blue-500/10',
  }

  return (
    <button
      onClick={onClick}
      className={`
        h-12 rounded-xl border text-sm font-medium transition-all duration-200
        ${active ? colors[color] : 'border-slate-700 text-slate-400 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-600'}
      `}
    >
      {label}
    </button>
  )
}

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
  const { predictions, isGenerating, addHoveredKey, clearSequence, updateCurrentMessage } = useWordPrediction()

  // Keep word prediction in sync with current message for context-aware suggestions
  useEffect(() => {
    updateCurrentMessage(state.message)
  }, [state.message, updateCurrentMessage])

  // Unified selection handler for both keyboard and shortcuts
  const handleSelection = useCallback((key: string) => {
    // Handle keyboard letters
    if (key.length === 1 && key.match(/[A-Z]/)) {
      addChar(key)
    }
    // Handle shortcut actions
    else if (['SPEAK', 'CLEAR', 'RESET', 'CALIBRATE'].includes(key)) {
      switch (key) {
        case 'SPEAK':
          speak()
          break
        case 'CLEAR':
          clearMessage()
          break
        case 'RESET':
          resetDemo()
          break
        case 'CALIBRATE':
          toggleCalibration()
          break
      }
    }
    // Handle quick phrases
    else {
      const phraseMap: Record<string, string> = {
        'PAIN': "I AM IN PAIN",
        'NURSE': "CALL NURSE",
        'YES': "YES",
        'NO': "NO",
        'THANKYOU': "THANK YOU",
        'WATER': "I NEED WATER",
        'HELP': "PLEASE HELP",
        'BREATHE': "I CAN'T BREATHE"
      }
      const phrase = phraseMap[key]
      if (phrase) {
        addPhrase(phrase)
      }
    }
  }, [addChar, speak, clearMessage, resetDemo, toggleCalibration, addPhrase])

  // Handle word selection from predictions
  const handleWordSelection = useCallback((word: string) => {
    addPhrase(word.toUpperCase())
    // Clear the word prediction sequence after selection
    clearSequence()
  }, [addPhrase, clearSequence])

  // Handle word selection by index (for gaze/dwell detection)
  const handleWordSelectByIndex = useCallback((index: number) => {
    if (predictions[index]) {
      handleWordSelection(predictions[index])
    }
  }, [predictions, handleWordSelection])


  // Dwell detection
  const getDwellTime = useCallback((key: string) => {
    // Word predictions: 100ms dwell time
    if (key.startsWith('WORD_')) {
      return 100
    }
    // Letters and other keys: 1500ms dwell time
    return 1500
  }, [])

  const {
    hoveredKey,
    dwellProgress,
    isDwelling,
    setHoveredKey,
  } = useDwellDetection(handleSelection, undefined, getDwellTime, handleWordSelectByIndex)

  // Eye tracking and simulation
  const eyeTracking = useEyeTracking()
  const gazeSimulation = useGazeSimulation()

  // Track which mode is active: 'real' or 'simulation'
  const [trackingMode, setTrackingMode] = useState<'real' | 'simulation'>('simulation')

  // Use the appropriate gaze source based on mode
  const gazePoint = trackingMode === 'real' ? eyeTracking.gazePoint : gazeSimulation.gazePoint
  const isGazeActive = trackingMode === 'real' ? eyeTracking.isTracking : gazeSimulation.isSimulating

  // Toggle between modes
  const handleModeSwitch = useCallback(async () => {
    if (trackingMode === 'simulation') {
      // Switch to real eye tracking
      await eyeTracking.startTracking()
      setTrackingMode('real')
    } else {
      // Switch back to simulation
      eyeTracking.stopTracking()
      setTrackingMode('simulation')
    }
  }, [trackingMode, eyeTracking])

  // Toggle gaze within current mode
  const toggleGaze = useCallback(() => {
    if (trackingMode === 'real') {
      eyeTracking.toggleTracking()
    } else {
      gazeSimulation.toggleSimulation()
    }
  }, [trackingMode, eyeTracking, gazeSimulation])

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

      // T for toggle gaze
      if (e.key === 't' && e.ctrlKey) {
        e.preventDefault()
        toggleGaze()
      }

      // E for switch between real/simulation mode
      if (e.key === 'e' && e.ctrlKey) {
        e.preventDefault()
        handleModeSwitch()
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
  }, [toggleGaze, handleModeSwitch, resetDemo])


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
    <div className="min-h-screen bg-slate-900 flex flex-col">
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
      <main className="flex-1 flex flex-col items-center pt-24 pb-32">
        <div className="max-w-8xl w-full px-4 sm:px-6">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              GAZE Communication Interface
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto">
              Eye-controlled communication for patients with limited motor function
            </p>

            <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs">
                <span
                  className={`w-2 h-2 rounded-full ${isGazeActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                    }`}
                />
                {trackingMode === 'real'
                  ? (isGazeActive ? 'Eye tracking active' : 'Eye tracking paused')
                  : (isGazeActive ? 'Gaze simulation active' : 'Pointer mode')
                }
              </div>
              <button
                onClick={handleModeSwitch}
                className="text-xs px-3 py-1.5 rounded-full border border-slate-700 hover:bg-slate-800 transition text-slate-400 hover:text-slate-200"
              >
                {trackingMode === 'real' ? 'Switch to Simulation' : 'Use Real Eye Tracking'}
              </button>
              {eyeTracking.error && (
                <span className="text-xs text-red-400">{eyeTracking.error}</span>
              )}
            </div>
          </div>

          {/* Keyboard */}
          <div className="flex justify-center mb-10">
            <GazeKeyboard
              onSelect={addChar}
              onSelectWord={handleWordSelection}
              predictions={predictions}
              addHoveredKey={addHoveredKey}
              hoveredKey={hoveredKey}
              dwellProgress={dwellProgress}
              setHoveredKey={setHoveredKey}
              isGenerating={isGenerating}
            />
          </div>

          {/* Action Dock */}
          <div className="w-full mb-20 max-w-xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 glass-card p-4">

              <ActionButton
                label="Speak"
                active={hoveredKey === 'SPEAK'}
                onClick={speak}
                color="emerald"
              />

              <ActionButton
                label="Clear"
                active={hoveredKey === 'CLEAR'}
                onClick={clearMessage}
                color="red"
              />

              <ActionButton
                label="Reset"
                active={hoveredKey === 'RESET'}
                onClick={resetDemo}
                color="amber"
              />

              <ActionButton
                label="Calibrate"
                active={hoveredKey === 'CALIBRATE'}
                onClick={toggleCalibration}
                color="blue"
              />
            </div>
          </div>

          {/* Dwell Feedback (single source of truth) */}
          {isDwelling && (
            <div className="fixed bottom-6 right-1/2 translate-x-1/2 sm:right-6 sm:translate-x-0 z-40">
              <div className="glass-card px-5 py-4 shadow-xl shadow-blue-500/10">
                <div className="text-xs text-slate-400 text-center mb-1">
                  Dwell selection
                </div>
                <div className="text-2xl font-bold text-white text-center">
                  {Math.round(dwellProgress)}%
                </div>
                <div className="mt-2 w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                    style={{ width: `${dwellProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>


      {/* Quick Phrases */}
      <QuickPhrases
        onSelect={addPhrase}
        hoveredKey={hoveredKey}
        setHoveredKey={setHoveredKey}
        isDwelling={isDwelling}
        dwellProgress={dwellProgress}
      />

      {/* Gaze Cursor (visible when tracking is active) */}
      <GazeCursor
        x={gazePoint.x}
        y={gazePoint.y}
        visible={isGazeActive}
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
          onClick={toggleGaze}
          className="px-3 py-2 text-xs bg-gray-800 text-white rounded-lg opacity-20 hover:opacity-100 transition-opacity"
          title="Toggle gaze (Ctrl+T)"
        >
          {isGazeActive ? 'Stop Gaze' : 'Start Gaze'}
        </button>
        <button
          onClick={handleModeSwitch}
          className="px-3 py-2 text-xs bg-gray-800 text-white rounded-lg opacity-20 hover:opacity-100 transition-opacity"
          title="Switch tracking mode (Ctrl+E)"
        >
          {trackingMode === 'real' ? 'Simulation' : 'Real Eye'}
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