'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Play, Volume2, Pause, Eye, Smartphone, Tablet, Laptop, Shield, Globe, Zap, AlertTriangle, Cpu, Heart, Users, Star, Lock, Crown } from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import FloatingPitchController from '@/components/FloatingPitchController'
import PitchDeckHeader from '@/components/PitchDeckHeader'
import ProblemSection from '@/components/pitch/ProblemSection'
import SolutionSection from '@/components/pitch/SolutionSection'
import LiveProofSection from '@/components/pitch/LiveProofSection'
import ImpactSection from '@/components/pitch/ImpactSection'
import WhyNowSection from '@/components/pitch/WhyNowSection'
import DecisionSection from '@/components/pitch/DecisionSection'
import { SCRIPT } from '@/components/pitch/pitch-data'

export default function PitchPage() {
    const [currentScriptIndex, setCurrentScriptIndex] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [segmentProgress, setSegmentProgress] = useState<number>(0)
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
    const [showScript, setShowScript] = useState<boolean>(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const progressRef = useRef<NodeJS.Timeout | null>(null)
    const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

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
            speakText(SCRIPT[index].content)

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
            const segmentDuration = SCRIPT[index].duration * 1000
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
    }, [isPlaying, currentScriptIndex])

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
            <FloatingPitchController
                isPlaying={isPlaying}
                isSpeaking={isSpeaking}
                currentScriptIndex={currentScriptIndex}
                segmentProgress={segmentProgress}
                SCRIPT={SCRIPT}
                onPlayPause={startScript}
            />

            {/* Pitch Deck Header */}
            <PitchDeckHeader />


            {/* Pitch Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-12 pb-16">
                <div className="space-y-12 md:space-y-16">
                    <ProblemSection />
                    <SolutionSection />
                    <LiveProofSection />
                    <ImpactSection />
                    <WhyNowSection />
                    <DecisionSection />
                </div>
                </div>
        </main>
    )
}
