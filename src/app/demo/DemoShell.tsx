'use client'

import { useState, useEffect, useCallback } from 'react'
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

  // Dwell detection
  const {
    hoveredKey,
    dwellProgress,
    isDwelling,
    setHoveredKey,
  } = useDwellDetection(handleSelection)

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
      <main className="pt-36 flex-1 flex flex-col items-center justify-center pt-32 pb-40">
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

            {/* Keyboard Shortcuts */}
            <div className="hidden md:block lg:w-64">
              <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-gray-700/50">
                <div className="text-sm font-medium text-gray-300 mb-3 text-center">Quick Actions</div>
                <div className="space-y-2">
                  {/* Speak Button */}
                  <div className="relative">
                    <button
                      onClick={() => speak()}
                      onMouseEnter={() => setHoveredKey('SPEAK')}
                      onMouseLeave={() => setHoveredKey(null)}
                      className={`w-full h-12 rounded-lg border-2 transition-all duration-200 font-bold text-sm shadow-lg active:shadow-md active:scale-95 relative overflow-hidden ${
                        hoveredKey === 'SPEAK'
                          ? 'border-green-400 bg-gradient-to-b from-green-100 to-green-200 text-green-900 shadow-green-200/50 scale-105'
                          : 'border-gray-600 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800 hover:from-gray-200 hover:to-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2 relative z-10">
                        <span>SPEAK</span>
                        <kbd className="px-1.5 py-0.5 bg-gray-700 text-gray-200 rounded text-xs">SPACE</kbd>
                      </div>
                      {/* Key top surface gradient */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                      {/* Key bottom shadow */}
                      <div className="absolute -bottom-1 left-1 right-1 h-1 bg-black/20 rounded-b-lg blur-sm pointer-events-none" />
                    </button>

                    {/* Dwell progress ring */}
                    {hoveredKey === 'SPEAK' && isDwelling && (
                      <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="50%"
                            cy="50%"
                            r="45%"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            className="text-green-500"
                            strokeDasharray={`${2 * Math.PI * 45}`}
                            strokeDashoffset={`${2 * Math.PI * 45 * (1 - dwellProgress / 100)}`}
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Clear Button */}
                  <div className="relative">
                    <button
                      onClick={() => clearMessage()}
                      onMouseEnter={() => setHoveredKey('CLEAR')}
                      onMouseLeave={() => setHoveredKey(null)}
                      className={`w-full h-12 rounded-lg border-2 transition-all duration-200 font-bold text-sm shadow-lg active:shadow-md active:scale-95 relative overflow-hidden ${
                        hoveredKey === 'CLEAR'
                          ? 'border-red-400 bg-gradient-to-b from-red-100 to-red-200 text-red-900 shadow-red-200/50 scale-105'
                          : 'border-gray-600 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800 hover:from-gray-200 hover:to-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2 relative z-10">
                        <span>CLEAR</span>
                        <kbd className="px-1.5 py-0.5 bg-gray-700 text-gray-200 rounded text-xs">ESC</kbd>
                      </div>
                      {/* Key top surface gradient */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                      {/* Key bottom shadow */}
                      <div className="absolute -bottom-1 left-1 right-1 h-1 bg-black/20 rounded-b-lg blur-sm pointer-events-none" />
                    </button>

                    {/* Dwell progress ring */}
                    {hoveredKey === 'CLEAR' && isDwelling && (
                      <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="50%"
                            cy="50%"
                            r="45%"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            className="text-red-500"
                            strokeDasharray={`${2 * Math.PI * 45}`}
                            strokeDashoffset={`${2 * Math.PI * 45 * (1 - dwellProgress / 100)}`}
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Reset Button */}
                  <div className="relative">
                    <button
                      onClick={() => resetDemo()}
                      onMouseEnter={() => setHoveredKey('RESET')}
                      onMouseLeave={() => setHoveredKey(null)}
                      className={`w-full h-12 rounded-lg border-2 transition-all duration-200 font-bold text-sm shadow-lg active:shadow-md active:scale-95 relative overflow-hidden ${
                        hoveredKey === 'RESET'
                          ? 'border-orange-400 bg-gradient-to-b from-orange-100 to-orange-200 text-orange-900 shadow-orange-200/50 scale-105'
                          : 'border-gray-600 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800 hover:from-gray-200 hover:to-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2 relative z-10">
                        <span>RESET</span>
                        <kbd className="px-1.5 py-0.5 bg-gray-700 text-gray-200 rounded text-xs">Ctrl+R</kbd>
                      </div>
                      {/* Key top surface gradient */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                      {/* Key bottom shadow */}
                      <div className="absolute -bottom-1 left-1 right-1 h-1 bg-black/20 rounded-b-lg blur-sm pointer-events-none" />
                    </button>

                    {/* Dwell progress ring */}
                    {hoveredKey === 'RESET' && isDwelling && (
                      <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="50%"
                            cy="50%"
                            r="45%"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            className="text-orange-500"
                            strokeDasharray={`${2 * Math.PI * 45}`}
                            strokeDashoffset={`${2 * Math.PI * 45 * (1 - dwellProgress / 100)}`}
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Calibrate Button */}
                  <div className="relative">
                    <button
                      onClick={() => toggleCalibration()}
                      onMouseEnter={() => setHoveredKey('CALIBRATE')}
                      onMouseLeave={() => setHoveredKey(null)}
                      className={`w-full h-12 rounded-lg border-2 transition-all duration-200 font-bold text-sm shadow-lg active:shadow-md active:scale-95 relative overflow-hidden ${
                        hoveredKey === 'CALIBRATE'
                          ? 'border-blue-400 bg-gradient-to-b from-blue-100 to-blue-200 text-blue-900 shadow-blue-200/50 scale-105'
                          : 'border-gray-600 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800 hover:from-gray-200 hover:to-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2 relative z-10">
                        <span>CALIBRATE</span>
                        <kbd className="px-1.5 py-0.5 bg-gray-700 text-gray-200 rounded text-xs">Ctrl+C</kbd>
                      </div>
                      {/* Key top surface gradient */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                      {/* Key bottom shadow */}
                      <div className="absolute -bottom-1 left-1 right-1 h-1 bg-black/20 rounded-b-lg blur-sm pointer-events-none" />
                    </button>

                    {/* Dwell progress ring */}
                    {hoveredKey === 'CALIBRATE' && isDwelling && (
                      <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="50%"
                            cy="50%"
                            r="45%"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            className="text-blue-500"
                            strokeDasharray={`${2 * Math.PI * 45}`}
                            strokeDashoffset={`${2 * Math.PI * 45 * (1 - dwellProgress / 100)}`}
                          />
                        </svg>
                      </div>
                    )}
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
        hoveredKey={hoveredKey}
        setHoveredKey={setHoveredKey}
        isDwelling={isDwelling}
        dwellProgress={dwellProgress}
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