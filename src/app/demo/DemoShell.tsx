'use client'

import { useState, useEffect, useCallback } from 'react'
import { Activity, AlertTriangle, Eye, Gauge, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
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
  helper,
  onClick,
  active,
  color,
}: {
  label: string
  helper: string
  onClick: () => void
  active: boolean
  color: 'emerald' | 'red' | 'amber' | 'blue'
}) {
  const colors = {
    emerald: 'border-emerald-400/35 bg-emerald-400/10 text-emerald-200',
    red: 'border-rose-400/35 bg-rose-400/10 text-rose-200',
    amber: 'border-amber-400/35 bg-amber-400/10 text-amber-200',
    blue: 'border-cyan-400/35 bg-cyan-400/10 text-cyan-200',
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-xl border px-4 py-3 text-left transition-all duration-200',
        active
          ? colors[color]
          : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:border-slate-500 hover:bg-slate-900'
      )}
    >
      <p className="text-sm font-semibold">{label}</p>
      <p className="mt-1 text-[11px] text-slate-400">{helper}</p>
    </button>
  )
}

function ModeStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
      <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-100">{value}</p>
    </div>
  )
}

export default function DemoShell() {
  const {
    state,
    addChar,
    addPhrase,
    clearMessage,
    speak,
    toggleCalibration,
    resetDemo,
  } = useDemoState()
  const { predictions, isGenerating, addHoveredKey, clearSequence, updateCurrentMessage } = useWordPrediction()

  const [showCalibration, setShowCalibration] = useState(false)
  const [trackingMode, setTrackingMode] = useState<'real' | 'simulation'>('simulation')

  const eyeTracking = useEyeTracking()
  const gazeSimulation = useGazeSimulation()

  const gazePoint = trackingMode === 'real' ? eyeTracking.gazePoint : gazeSimulation.gazePoint
  const isGazeActive = trackingMode === 'real' ? eyeTracking.isTracking : gazeSimulation.isSimulating

  useEffect(() => {
    updateCurrentMessage(state.message)
  }, [state.message, updateCurrentMessage])

  const openCalibration = useCallback(() => {
    setShowCalibration(true)
  }, [])

  const handleSelection = useCallback((key: string) => {
    if (key.length === 1 && key.match(/[A-Z]/)) {
      addChar(key)
      return
    }

    if (['SPEAK', 'CLEAR', 'RESET', 'CALIBRATE'].includes(key)) {
      switch (key) {
        case 'SPEAK':
          speak()
          return
        case 'CLEAR':
          clearMessage()
          return
        case 'RESET':
          resetDemo()
          return
        case 'CALIBRATE':
          openCalibration()
          return
      }
    }

    const phraseMap: Record<string, string> = {
      PAIN: 'I AM IN PAIN',
      NURSE: 'CALL NURSE',
      YES: 'YES',
      NO: 'NO',
      THANKYOU: 'THANK YOU',
      WATER: 'I NEED WATER',
      HELP: 'PLEASE HELP',
      BREATHE: "I CAN'T BREATHE",
    }

    const phrase = phraseMap[key]
    if (phrase) {
      addPhrase(phrase)
    }
  }, [addChar, speak, clearMessage, resetDemo, addPhrase, openCalibration])

  const handleWordSelection = useCallback((word: string) => {
    addPhrase(word.toUpperCase())
    clearSequence()
  }, [addPhrase, clearSequence])

  const handleWordSelectByIndex = useCallback((index: number) => {
    if (predictions[index]) {
      handleWordSelection(predictions[index])
    }
  }, [predictions, handleWordSelection])

  const getDwellTime = useCallback((key: string) => {
    if (key.startsWith('WORD_')) {
      return 100
    }
    return 1500
  }, [])

  const {
    hoveredKey,
    dwellProgress,
    isDwelling,
    setHoveredKey,
  } = useDwellDetection(handleSelection, undefined, getDwellTime, handleWordSelectByIndex)

  const handleModeSwitch = useCallback(async () => {
    if (trackingMode === 'simulation') {
      await eyeTracking.startTracking()
      setTrackingMode('real')
      return
    }

    eyeTracking.stopTracking()
    setTrackingMode('simulation')
  }, [trackingMode, eyeTracking])

  const toggleGaze = useCallback(() => {
    if (trackingMode === 'real') {
      eyeTracking.toggleTracking()
    } else {
      gazeSimulation.toggleSimulation()
    }
  }, [trackingMode, eyeTracking, gazeSimulation])

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault()
        openCalibration()
      }

      if (e.key === 't' && e.ctrlKey) {
        e.preventDefault()
        toggleGaze()
      }

      if (e.key === 'e' && e.ctrlKey) {
        e.preventDefault()
        handleModeSwitch()
      }

      if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault()
        resetDemo()
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown)
    }
  }, [toggleGaze, handleModeSwitch, resetDemo, openCalibration])

  useEffect(() => {
    const handleSpeak = () => speak()
    const handleClear = () => clearMessage()
    const handleReset = () => resetDemo()
    const handleCalibrate = () => openCalibration()

    window.addEventListener('speak', handleSpeak)
    window.addEventListener('clear', handleClear)
    window.addEventListener('reset', handleReset)
    window.addEventListener('calibrate', handleCalibrate)

    return () => {
      window.removeEventListener('speak', handleSpeak)
      window.removeEventListener('clear', handleClear)
      window.removeEventListener('reset', handleReset)
      window.removeEventListener('calibrate', handleCalibrate)
    }
  }, [speak, clearMessage, resetDemo, openCalibration])

  const handleCalibrationComplete = () => {
    setShowCalibration(false)
    if (!state.calibrationComplete) {
      toggleCalibration()
    }
  }

  const confidenceLabel =
    trackingMode === 'real'
      ? `${Math.round((eyeTracking.confidence || 0) * 100)}% confidence`
      : isGazeActive
        ? 'Simulation active'
        : 'Simulation paused'

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_10%,rgba(56,189,248,0.16),transparent_42%),radial-gradient(circle_at_85%_12%,rgba(14,116,144,0.18),transparent_35%),linear-gradient(180deg,#020617_0%,#0b1120_45%,#111827_100%)] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-25" />

      <main className="relative mx-auto w-full max-w-[1400px] px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <header className="rounded-2xl border border-slate-700/70 bg-slate-950/65 p-6 shadow-[0_18px_45px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
                <Sparkles className="h-3.5 w-3.5" />
                Clinical Demo Environment
              </div>
              <h1 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                Eye-tracking communication workstation for real care scenarios
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                This simulation is optimized for bedside communication workflows with controlled dwell selection,
                emergency phrase shortcuts, and operator-level control over calibration and tracking mode.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <ModeStat label="Tracking Mode" value={trackingMode === 'real' ? 'Real Camera' : 'Simulation'} />
              <ModeStat label="Input State" value={isGazeActive ? 'Active' : 'Paused'} />
              <ModeStat label="Precision" value={confidenceLabel} />
            </div>
          </div>
        </header>

        <div className="mt-6">
          <StatusBar
            cameraActive={trackingMode === 'real' ? eyeTracking.cameraReady : true}
            trackingActive={isGazeActive}
            calibrationComplete={state.calibrationComplete}
            trackingMode={trackingMode}
            confidence={trackingMode === 'real' ? eyeTracking.confidence : undefined}
            onToggleCalibration={openCalibration}
            onToggleTracking={toggleGaze}
            onSwitchMode={handleModeSwitch}
          />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-6">
            <MessageBar
              message={state.message}
              isSpeaking={state.isSpeaking}
              onSpeak={speak}
              onClear={clearMessage}
              onReset={resetDemo}
            />

            <div className="rounded-2xl border border-slate-700/70 bg-slate-950/55 p-4 shadow-[0_16px_40px_rgba(2,6,23,0.35)] sm:p-6">
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

            <QuickPhrases
              onSelect={addPhrase}
              hoveredKey={hoveredKey}
              setHoveredKey={setHoveredKey}
              isDwelling={isDwelling}
              dwellProgress={dwellProgress}
            />
          </section>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-5 shadow-[0_16px_38px_rgba(2,6,23,0.35)]">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-slate-300">
                <Activity className="h-4 w-4 text-cyan-300" />
                Operator Controls
              </h2>

              <div className="mt-4 grid gap-3">
                <ActionButton
                  label={state.isSpeaking ? 'Speaking...' : 'Speak Message'}
                  helper="Ctrl+Space alternative"
                  active={hoveredKey === 'SPEAK'}
                  onClick={speak}
                  color="emerald"
                />
                <ActionButton
                  label="Clear Message"
                  helper="Reset active sentence"
                  active={hoveredKey === 'CLEAR'}
                  onClick={clearMessage}
                  color="red"
                />
                <ActionButton
                  label="Reset Session"
                  helper="Clear and reinitialize"
                  active={hoveredKey === 'RESET'}
                  onClick={resetDemo}
                  color="amber"
                />
                <ActionButton
                  label="Run Calibration"
                  helper="Ctrl+C shortcut"
                  active={hoveredKey === 'CALIBRATE'}
                  onClick={openCalibration}
                  color="blue"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-5 shadow-[0_16px_38px_rgba(2,6,23,0.35)]">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-slate-300">
                <Gauge className="h-4 w-4 text-sky-300" />
                Dwell Selection
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Selection triggers after sustained focus. Word suggestions use shorter dwell to speed up sentence completion.
              </p>

              <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/70 p-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Progress</span>
                  <span>{Math.round(dwellProgress)}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 transition-all"
                    style={{ width: `${dwellProgress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {isDwelling ? 'Focus maintained. Selection pending.' : 'No active dwell target.'}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-400/25 bg-amber-400/10 p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-amber-100">
                <AlertTriangle className="h-4 w-4" />
                Clinical Notes
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-amber-50/90">
                <li>Confirm camera alignment before switching to real tracking mode.</li>
                <li>Use emergency phrases first in high-stress patient interactions.</li>
                <li>Re-run calibration when patient posture or lighting changes.</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <GazeCursor x={gazePoint.x} y={gazePoint.y} visible={isGazeActive} />

      <CalibrationOverlay
        isVisible={showCalibration}
        onComplete={handleCalibrationComplete}
      />

      {trackingMode === 'real' && eyeTracking.error && (
        <div className="fixed bottom-6 left-1/2 z-[80] w-[calc(100%-2rem)] -translate-x-1/2 rounded-xl border border-rose-400/35 bg-rose-500/15 px-4 py-3 text-sm text-rose-100 shadow-lg sm:w-auto">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            {eyeTracking.error}
          </div>
        </div>
      )}

      <div className="pointer-events-none fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full border border-cyan-400/30 bg-slate-950/70 px-3 py-1.5 text-xs text-cyan-100 backdrop-blur sm:flex">
        <Eye className="h-3.5 w-3.5" />
        {trackingMode === 'real' ? 'Real camera mode' : 'Simulation mode'}
      </div>
    </div>
  )
}
