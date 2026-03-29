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
  gazeKey,
}: {
  label: string
  helper: string
  onClick: () => void
  active: boolean
  color: 'emerald' | 'red' | 'amber' | 'blue'
  gazeKey: 'SPEAK' | 'CLEAR' | 'RESET' | 'CALIBRATE'
}) {
  const activeStyles = {
    emerald: {
      borderColor: 'color-mix(in oklab, rgb(var(--accent-emerald)) 36%, var(--card-border))',
      background: 'color-mix(in oklab, rgb(var(--accent-emerald)) 14%, var(--card-bg))',
      color: 'rgb(var(--text-primary))',
    },
    red: {
      borderColor: 'color-mix(in oklab, rgb(var(--accent-rose)) 36%, var(--card-border))',
      background: 'color-mix(in oklab, rgb(var(--accent-rose)) 14%, var(--card-bg))',
      color: 'rgb(var(--text-primary))',
    },
    amber: {
      borderColor: 'rgba(245, 158, 11, 0.45)',
      background: 'rgba(245, 158, 11, 0.16)',
      color: 'rgb(var(--text-primary))',
    },
    blue: {
      borderColor: 'color-mix(in oklab, rgb(var(--accent-blue)) 36%, var(--card-border))',
      background: 'color-mix(in oklab, rgb(var(--accent-blue)) 14%, var(--card-bg))',
      color: 'rgb(var(--text-primary))',
    },
  }

  return (
    <button
      onClick={onClick}
      data-gaze-key={gazeKey}
      className={cn('rounded-xl border px-4 py-3 text-left transition-all duration-200 hover:-translate-y-[1px]')}
      style={active
        ? activeStyles[color]
        : {
            borderColor: 'var(--card-border)',
            background: 'var(--card-bg)',
            color: 'rgb(var(--text-secondary))',
          }}
    >
      <p className="text-sm font-semibold">{label}</p>
      <p className="mt-1 text-[11px]" style={{ color: 'rgb(var(--text-muted))' }}>{helper}</p>
    </button>
  )
}

function ModeStat({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-xl border px-3 py-3"
      style={{
        borderColor: 'var(--card-border)',
        background: 'var(--card-bg)',
      }}
    >
      <p className="text-[11px] uppercase tracking-[0.12em]" style={{ color: 'rgb(var(--text-muted))' }}>{label}</p>
      <p className="mt-1 text-sm font-semibold" style={{ color: 'rgb(var(--text-primary))' }}>{value}</p>
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
    <div className="relative min-h-screen overflow-hidden pb-14">
      <main className="relative mx-auto w-full max-w-[1400px] px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <header className="surface-card-strong p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]"
                style={{
                  color: 'rgb(var(--accent-blue))',
                  background: 'color-mix(in oklab, rgb(var(--accent-blue)) 14%, transparent)',
                  border: '1px solid color-mix(in oklab, rgb(var(--accent-blue)) 34%, transparent)',
                }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Adaptive Communication Demo
              </div>
              <h1 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl" style={{ color: 'rgb(var(--text-primary))' }}>
                A clinical-grade gaze interface built for bedside and home communication
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: 'rgb(var(--text-secondary))' }}>
                Precision dwell input, high-priority phrase shortcuts, and tracking-mode controls are unified in one theme-aware workspace.
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

            <div className="surface-card p-4 sm:p-6">
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
            <div className="surface-card p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: 'rgb(var(--text-secondary))' }}>
                <Activity className="h-4 w-4" style={{ color: 'rgb(var(--accent-cyan))' }} />
                Operator Controls
              </h2>

              <div className="mt-4 grid gap-3">
                <ActionButton
                  label={state.isSpeaking ? 'Speaking...' : 'Speak Message'}
                  helper="Ctrl+Space alternative"
                  active={hoveredKey === 'SPEAK'}
                  onClick={speak}
                  color="emerald"
                  gazeKey="SPEAK"
                />
                <ActionButton
                  label="Clear Message"
                  helper="Reset active sentence"
                  active={hoveredKey === 'CLEAR'}
                  onClick={clearMessage}
                  color="red"
                  gazeKey="CLEAR"
                />
                <ActionButton
                  label="Reset Session"
                  helper="Clear and reinitialize"
                  active={hoveredKey === 'RESET'}
                  onClick={resetDemo}
                  color="amber"
                  gazeKey="RESET"
                />
                <ActionButton
                  label="Run Calibration"
                  helper="Ctrl+C shortcut"
                  active={hoveredKey === 'CALIBRATE'}
                  onClick={openCalibration}
                  color="blue"
                  gazeKey="CALIBRATE"
                />
              </div>
            </div>

            <div className="surface-card p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: 'rgb(var(--text-secondary))' }}>
                <Gauge className="h-4 w-4" style={{ color: 'rgb(var(--accent-blue))' }} />
                Dwell Selection
              </h2>
              <p className="mt-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                Selection triggers after sustained focus. Word suggestions use shorter dwell to speed up sentence completion.
              </p>

              <div className="mt-4 rounded-xl border p-4" style={{ borderColor: 'var(--card-border)', background: 'var(--card-bg-strong)' }}>
                <div className="flex items-center justify-between text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                  <span>Progress</span>
                  <span>{Math.round(dwellProgress)}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ background: 'color-mix(in oklab, var(--card-border) 70%, transparent)' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${dwellProgress}%`,
                      background: 'linear-gradient(90deg, rgb(var(--accent-blue)) 0%, rgb(var(--accent-cyan)) 50%, rgb(var(--accent-emerald)) 100%)',
                    }}
                  />
                </div>
                <p className="mt-2 text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                  {isDwelling ? 'Focus maintained. Selection pending.' : 'No active dwell target.'}
                </p>
              </div>
            </div>

            <div
              className="rounded-2xl border p-5"
              style={{
                borderColor: 'color-mix(in oklab, rgb(var(--accent-rose)) 34%, var(--card-border))',
                background: 'color-mix(in oklab, rgb(var(--accent-rose)) 11%, var(--card-bg))',
              }}
            >
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: 'rgb(var(--text-primary))' }}>
                <AlertTriangle className="h-4 w-4" style={{ color: 'rgb(var(--accent-rose))' }} />
                Clinical Notes
              </h2>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
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
        <div
          className="fixed bottom-6 left-1/2 z-[80] w-[calc(100%-2rem)] -translate-x-1/2 rounded-xl border px-4 py-3 text-sm shadow-lg sm:w-auto"
          style={{
            borderColor: 'color-mix(in oklab, rgb(var(--accent-rose)) 40%, var(--card-border))',
            background: 'color-mix(in oklab, rgb(var(--accent-rose)) 18%, var(--card-bg-strong))',
            color: 'rgb(var(--text-primary))',
          }}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            {eyeTracking.error}
          </div>
        </div>
      )}

      <div
        className="pointer-events-none fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full border px-3 py-1.5 text-xs backdrop-blur sm:flex"
        style={{
          borderColor: 'var(--card-border)',
          background: 'var(--card-bg-strong)',
          color: 'rgb(var(--text-secondary))',
        }}
      >
        <Eye className="h-3.5 w-3.5" style={{ color: 'rgb(var(--accent-blue))' }} />
        {trackingMode === 'real' ? 'Real camera mode' : 'Simulation mode'}
      </div>
    </div>
  )
}
