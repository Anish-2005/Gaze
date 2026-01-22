'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Play, Volume2, Pause, Eye, Smartphone, Tablet, Laptop, Shield, Globe, Zap, AlertTriangle, Cpu, Heart, Users, Star, Lock, Crown } from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import FloatingPitchController from '@/components/FloatingPitchController'
import PitchDeckHeader from '@/components/PitchDeckHeader'

interface ScriptSegment {
    time: string
    title: string
    content: string
    duration: number
}

const SCRIPT: ScriptSegment[] = [
    {
        time: "0:00-0:25",
        title: "Problem",
        content: "Millions of people lose the ability to communicate because of paralysis, stroke, ALS, or critical illness. Today, the primary solution is specialized eye-tracking hardware that costs over ten thousand dollars. That makes basic communication inaccessible to most families, hospitals, and public systems.",
        duration: 25,
    },
    {
        time: "0:25-0:45",
        title: "Solution",
        content: "GAZE replaces that hardware with software. It uses the camera already present on phones, tablets, and laptops to enable gaze-based typing and speech — without proprietary devices, installations, or infrastructure changes.",
        duration: 20,
    },
    {
        time: "0:45-1:10",
        title: "Live Proof",
        content: "This is not a concept. This is a working system. Everything you see here runs in the browser, with on-device processing and no biometric data storage.",
        duration: 25,
    },
    {
        time: "1:10-1:30",
        title: "Impact & Scale",
        content: "By removing hardware, GAZE reduces cost by over ninety percent. It requires zero additional devices and can be deployed globally through software. That allows accessibility to scale like infrastructure, not like medical equipment.",
        duration: 20,
    },
    {
        time: "1:30-1:50",
        title: "Why Now",
        content: "This is possible now because cameras are ubiquitous, computer vision runs efficiently on-device, and healthcare systems are actively seeking low-cost assistive solutions. Accessibility is no longer a niche — it's becoming public infrastructure.",
        duration: 20,
    },
    {
        time: "1:50-2:00",
        title: "Decision Frame",
        content: "GAZE restores a fundamental human capability — communication — using software that can scale globally, without compromising dignity, privacy, or safety.",
        duration: 10,
    },
]

const SOLUTION_FEATURES = [
    {
        icon: Smartphone,
        title: "Uses Existing Devices",
        description: "Works on any smartphone, tablet, or laptop with a camera"
    },
    {
        icon: Shield,
        title: "On-Device Processing",
        description: "All processing happens locally, no data leaves the device"
    },
    {
        icon: Globe,
        title: "Global Accessibility",
        description: "Browser-based deployment works across all regions"
    },
    {
        icon: Zap,
        title: "Instant Setup",
        description: "No installation required, works directly in browser"
    }
]

const METRICS = [
    {
        value: "≥90%",
        label: "Cost Reduction",
        description: "Compared to hardware-based assistive systems",
        color: "bg-slate-900"
    },
    {
        value: "$0",
        label: "Additional Hardware",
        description: "Required for deployment - uses existing devices",
        color: "bg-slate-900"
    },
    {
        value: "Global",
        label: "Deployment Scale",
        description: "Web-based architecture works across all regions",
        color: "bg-slate-900"
    }
]

const WHY_NOW_ITEMS = [
    {
        icon: Smartphone,
        title: "Cameras are ubiquitous across consumer devices",
        detail: "Over 6 billion smartphones worldwide with capable cameras"
    },
    {
        icon: Cpu,
        title: "Computer vision models run efficiently on-device",
        detail: "ONNX runtime enables local AI processing without cloud dependency"
    },
    {
        icon: Heart,
        title: "Healthcare systems seek low-cost assistive solutions",
        detail: "Cost pressure drives innovation in accessible care delivery"
    },
    {
        icon: Users,
        title: "Accessibility treated as public infrastructure",
        detail: "Global shift toward inclusive design and universal access"
    }
]

const ETHICAL_PRINCIPLES = [
    {
        principle: "Dignity",
        description: "Preserves user agency and autonomy in communication",
        icon: Star
    },
    {
        principle: "Privacy",
        description: "On-device processing, no biometric data storage",
        icon: Lock
    },
    {
        principle: "Access",
        description: "Free for individuals, scalable for institutions",
        icon: Crown
    }
]

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
                    {/* Section 1: Problem */}
                    {/* Section 1: Problem */}
                    <motion.section
                        id="problem"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="scroll-mt-28"
                    >
                        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">

                            {/* Header */}
                            <div className="bg-slate-900 text-white px-6 py-3 md:px-8 md:py-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center text-sm font-bold">
                                        1
                                    </div>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                                        The Problem
                                    </h2>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-6 py-6 md:px-8 md:py-10">
                                <div className="max-w-4xl mx-auto">

                                    {/* Headline */}
                                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight text-center mb-4">
                                        Communication access is fundamentally broken.
                                    </h3>

                                    {/* Core Explanation */}
                                    <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed text-center mb-6">
                                        Millions of people lose the ability to speak due to paralysis, ALS, stroke, or
                                        critical illness. While eye-tracking technology exists, it depends on
                                        proprietary hardware costing over <span className="font-semibold text-slate-800">$10,000</span>,
                                        placing basic communication out of reach for most families, hospitals, and public systems.
                                    </p>

                                    {/* Divider */}
                                    <div className="my-6 border-t border-slate-200" />

                                    {/* Insight Box */}
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-6">
                                        <div className="flex items-start gap-4">
                                            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-slate-900 font-semibold text-base md:text-lg mb-2">
                                                    The real failure is not technological.
                                                </p>
                                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                                    When communication tools exist but are financially or operationally inaccessible,
                                                    we unintentionally turn a basic human function into a privilege.
                                                    This gap affects patient dignity, clinical outcomes, and caregiver efficiency
                                                    at global scale.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </motion.section>


                    {/* Section 2: Solution */}
                    {/* Section 2: Solution */}
                    <motion.section
                        id="solution"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ duration: 0.6 }}
                        className="scroll-mt-28"
                    >
                        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">

                            {/* Header */}
                            <div className="bg-slate-900 text-white px-6 py-5 md:px-8 md:py-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center text-sm font-bold">
                                        2
                                    </div>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                                        The Solution
                                    </h2>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-6 py-6 md:px-8 md:py-10">
                                <div className="max-w-4xl mx-auto">

                                    {/* Headline */}
                                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight text-center mb-4">
                                        We removed the hardware entirely.
                                    </h3>

                                    {/* Core Explanation */}
                                    <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed text-center mb-6">
                                        GAZE converts standard webcams and smartphone cameras into
                                        high-precision assistive communication systems using
                                        real-time computer vision and adaptive AI.
                                        No proprietary devices. No installations. No infrastructure changes.
                                    </p>

                                    {/* Divider */}
                                    <div className="my-6 border-t border-slate-200" />

                                    {/* Architecture / Capabilities */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                                        {SOLUTION_FEATURES.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-slate-400 transition-colors"
                                            >
                                                <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center mb-4">
                                                    <feature.icon className="w-6 h-6" />
                                                </div>

                                                <h4 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                                                    {feature.title}
                                                </h4>

                                                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Closing Insight */}
                                    <div className="mt-8 max-w-3xl mx-auto text-center">
                                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                                            By shifting assistive communication from specialized hardware
                                            to software infrastructure, GAZE becomes instantly deployable
                                            across homes, hospitals, and public systems worldwide.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 3: Live Proof */}
                    {/* Section 3: Live Proof */}
<motion.section
  id="live-proof"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-120px" }}
  transition={{ duration: 0.6 }}
  className="scroll-mt-28"
>
  <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">

    <div className="bg-slate-900 text-white px-6 py-5 md:px-8 md:py-6">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center text-sm font-bold">3</div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
          Live Proof
        </h2>
      </div>
    </div>

    <div className="px-6 py-6 md:px-8 md:py-10">
      <div className="max-w-4xl mx-auto text-center">

        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          This is not a concept.
        </h3>

        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
          GAZE is fully functional today. The system runs entirely in the browser,
          performs eye-tracking on-device, and does not transmit or store biometric data.
        </p>

        <Link
          href="/demo"
          className="inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-6 rounded-xl bg-slate-900 text-white text-base md:text-lg font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          <Eye className="w-5 h-5 md:w-6 md:h-6 mr-3" />
          Launch Live Demo
        </Link>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm sm:text-base text-slate-600">
          <div>Browser-based deployment</div>
          <div>On-device processing</div>
          <div>Clinical-grade interface</div>
        </div>

      </div>
    </div>
  </div>
</motion.section>


                    {/* Section 4: Impact & Scale */}
                  {/* Section 4: Impact & Scale */}
<motion.section
  id="impact"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-120px" }}
  transition={{ duration: 0.6 }}
  className="scroll-mt-28"
>
  <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">

    <div className="bg-slate-900 text-white px-6 py-5 md:px-8 md:py-6">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center text-sm font-bold">4</div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
          Impact at Scale
        </h2>
      </div>
    </div>

    <div className="px-6 py-6 md:px-8 md:py-10">
      <div className="max-w-4xl mx-auto text-center">

        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
          Accessibility as infrastructure.
        </h3>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {METRICS.map((metric, index) => (
            <div key={index}>
              <div className={`mx-auto w-24 h-24 rounded-2xl ${metric.color} text-white text-3xl font-bold flex items-center justify-center mb-4`}>
                {metric.value}
              </div>
              <div className="text-xl font-semibold text-slate-900 mb-2">
                {metric.label}
              </div>
              <p className="text-slate-600 text-sm sm:text-base">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        <blockquote className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-700 text-lg italic">
          “GAZE allows assistive communication to scale like software —
          not like medical hardware.”
        </blockquote>

      </div>
    </div>
  </div>
</motion.section>


                    {/* Section 5: Why Now */}
                   {/* Section 5: Why Now */}
<motion.section
  id="why-now"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-120px" }}
  transition={{ duration: 0.6 }}
  className="scroll-mt-28"
>
  <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">

    <div className="bg-slate-900 text-white px-6 py-5 md:px-8 md:py-6">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center text-sm font-bold">5</div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
          Why Now
        </h2>
      </div>
    </div>

    <div className="px-6 py-6 md:px-8 md:py-10">
      <div className="max-w-4xl mx-auto">

        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 text-center">
          The conditions finally align.
        </h3>

        <div className="space-y-6">
          {WHY_NOW_ITEMS.map((item, index) => (
            <div
              key={index}
              className="flex gap-6 bg-slate-50 border border-slate-200 rounded-xl p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900 mb-1">
                  {item.title}
                </p>
                <p className="text-slate-600 text-base">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </div>
</motion.section>

                    {/* Section 6: Decision Frame */}
                   {/* Section 6: Decision */}
<motion.section
  id="decision"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-120px" }}
  transition={{ duration: 0.6 }}
  className="scroll-mt-28"
>
  <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">

    <div className="bg-slate-900 text-white px-6 py-5 md:px-8 md:py-6">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center text-sm font-bold">6</div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
          The Decision
        </h2>
      </div>
    </div>

    <div className="px-6 py-6 md:px-8 md:py-10">
      <div className="max-w-4xl mx-auto text-center">

        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
          Communication without compromise.
        </h3>

        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 mb-8">
          GAZE restores a fundamental human capability using scalable software —
          without sacrificing privacy, dignity, or safety.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {ETHICAL_PRINCIPLES.map((item, index) => (
            <div key={index} className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center">
                <item.icon className="w-6 h-6" />
              </div>
              <div className="font-semibold text-slate-900 mb-2">
                {item.principle}
              </div>
              <p className="text-slate-600 text-sm sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/demo"
            className="px-8 py-4 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
          >
            Experience the Demo
          </Link>

          <Link
            href="/institutions"
            className="px-8 py-4 rounded-xl border-2 border-slate-900 text-slate-900 font-semibold hover:bg-slate-50 transition"
          >
            Institutional Deployment →
          </Link>
        </div>

      </div>
    </div>
  </div>
</motion.section>

                </div>
            </div>
        </main>
    )
}