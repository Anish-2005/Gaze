'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { lazy, Suspense } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { SCRIPT } from '@/components/pitch/pitch-data'

// Lazy load components for better performance
const FloatingPitchController = lazy(() => import('@/components/FloatingPitchController'))
const PitchDeckHeader = lazy(() => import('@/components/PitchDeckHeader'))
const ProblemSection = lazy(() => import('@/components/pitch/ProblemSection'))
const SolutionSection = lazy(() => import('@/components/pitch/SolutionSection'))
const LiveProofSection = lazy(() => import('@/components/pitch/LiveProofSection'))
const ImpactSection = lazy(() => import('@/components/pitch/ImpactSection'))
const WhyNowSection = lazy(() => import('@/components/pitch/WhyNowSection'))
const DecisionSection = lazy(() => import('@/components/pitch/DecisionSection'))

// Loading component
function ComponentLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )
}

// Error fallback component
function ComponentErrorFallback({ componentName }: { componentName: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Failed to load {componentName}
        </h2>
        <p className="text-gray-600 mb-4">
          Please refresh the page to try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Refresh Page
        </button>
      </div>
    </div>
  )
}

// Wrapped component with error boundary
function LazyComponent({
  Component,
  componentName,
  ...props
}: {
  Component: React.ComponentType<any> | React.LazyExoticComponent<React.ComponentType<any>>
  componentName: string
  [key: string]: unknown
}) {
  return (
    <ErrorBoundary fallback={<ComponentErrorFallback componentName={componentName} />}>
      <Suspense fallback={<ComponentLoader />}>
        <Component {...(props as any)} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default function PitchPage() {
    const [currentScriptIndex, setCurrentScriptIndex] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [segmentProgress, setSegmentProgress] = useState<number>(0)
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
    const [, setShowScript] = useState<boolean>(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const progressRef = useRef<NodeJS.Timeout | null>(null)
    const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

    const speakText = useCallback((text: string) => {
        if ('speechSynthesis' in window) {
            // Stop any current speech
            window.speechSynthesis.cancel()

            const utterance = new SpeechSynthesisUtterance(text)
            utterance.rate = 0.9 // Slightly slower for clarity
            utterance.pitch = 1
            utterance.volume = 0.8

            // Try to use a natural-sounding voice
            const voices = window.speechSynthesis.getVoices()
            const preferredVoice = voices.find(voice =>
                voice.name.includes('Google') ||
                voice.name.includes('Natural') ||
                voice.name.includes('Enhanced') ||
                voice.lang.startsWith('en-')
            )
            if (preferredVoice) {
                utterance.voice = preferredVoice
            }

            utterance.onstart = () => setIsSpeaking(true)
            utterance.onend = () => setIsSpeaking(false)
            utterance.onerror = () => setIsSpeaking(false)

            speechRef.current = utterance
            window.speechSynthesis.speak(utterance)
        } else {
            console.warn('Speech synthesis not supported in this browser')
        }
    }, [])

    const stopSpeaking = useCallback(() => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel()
            setIsSpeaking(false)
        }
    }, [])

    const startScript = useCallback(() => {
        if (isPlaying) {
            // Pause if already playing
            if (timerRef.current) {
                clearTimeout(timerRef.current)
                timerRef.current = null
            }
            if (progressRef.current) {
                clearInterval(progressRef.current)
                progressRef.current = null
            }
            stopSpeaking()
            setIsPlaying(false)
            return
        }

        setIsPlaying(true)
        setShowScript(true)

        const playNextSegment = (index: number) => {
            if (index >= SCRIPT.length) {
                setIsPlaying(false)
                setCurrentScriptIndex(0)
                setSegmentProgress(0)
                stopSpeaking()
                if (timerRef.current) {
                    clearTimeout(timerRef.current)
                    timerRef.current = null
                }
                if (progressRef.current) {
                    clearInterval(progressRef.current)
                    progressRef.current = null
                }
                return
            }

            setCurrentScriptIndex(index)
            setSegmentProgress(0)

            // Speak the current segment
            if (SCRIPT[index]) {
                speakText(SCRIPT[index].content)
            }

            // Auto-scroll to the corresponding section
            const sectionIds = ['problem', 'solution', 'live-proof', 'impact', 'why-now', 'decision']
            const sectionId = sectionIds[index]
            if (sectionId) {
                const element = document.getElementById(sectionId)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
            }

            // Start progress tracking
            const segmentDuration = SCRIPT[index]?.duration ? SCRIPT[index].duration * 1000 : 0
            const progressInterval = 100 // Update every 100ms
            let elapsed = 0

            progressRef.current = setInterval(() => {
                elapsed += progressInterval
                const progress = Math.min((elapsed / segmentDuration) * 100, 100)
                setSegmentProgress(progress)

                if (elapsed >= segmentDuration) {
                    if (progressRef.current) {
                        clearInterval(progressRef.current)
                        progressRef.current = null
                    }
                }
            }, progressInterval)

            timerRef.current = setTimeout(() => {
                playNextSegment(index + 1)
            }, segmentDuration)
        }

        playNextSegment(currentScriptIndex)
    }, [isPlaying, currentScriptIndex, speakText, stopSpeaking])

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
            if (progressRef.current) {
                clearInterval(progressRef.current)
            }
            stopSpeaking()
        }
    }, [stopSpeaking])

    return (
        <main className="min-h-screen bg-[#F7F9FC]">
            {/* Floating Pitch Controller */}
            <LazyComponent
                Component={FloatingPitchController}
                componentName="FloatingPitchController"
                isPlaying={isPlaying}
                isSpeaking={isSpeaking}
                currentScriptIndex={currentScriptIndex}
                segmentProgress={segmentProgress}
                SCRIPT={SCRIPT}
                onPlayPause={startScript}
            />

            {/* Pitch Deck Header */}
            <LazyComponent
                Component={PitchDeckHeader}
                componentName="PitchDeckHeader"
            />

            {/* Pitch Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-12 pb-16">
                <div className="space-y-12 md:space-y-16">
                    <LazyComponent
                        Component={ProblemSection}
                        componentName="ProblemSection"
                    />
                    <LazyComponent
                        Component={SolutionSection}
                        componentName="SolutionSection"
                    />
                    <LazyComponent
                        Component={LiveProofSection}
                        componentName="LiveProofSection"
                    />
                    <LazyComponent
                        Component={ImpactSection}
                        componentName="ImpactSection"
                    />
                    <LazyComponent
                        Component={WhyNowSection}
                        componentName="WhyNowSection"
                    />
                    <LazyComponent
                        Component={DecisionSection}
                        componentName="DecisionSection"
                    />
                </div>
            </div>
        </main>
    )
}
