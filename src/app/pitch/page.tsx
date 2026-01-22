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
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-12 pb-16">
        <div className="space-y-12 md:space-y-16">
          {/* Section 1: Problem */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-24"
            id="problem"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-300 overflow-hidden">
              <div className="bg-slate-900 text-white px-6 py-4 md:px-8 md:py-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center text-sm font-bold">1</div>
                  <h2 className="text-xl md:text-2xl font-bold">The Problem</h2>
                </div>
              </div>

              <div className="p-6 md:p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 md:mb-8 leading-tight text-center">
                    Communication should not be a luxury.
                  </h3>

                  <div className="max-w-3xl mx-auto mb-8 md:mb-12">
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-center">
                      Millions lose their voice due to paralysis, ALS, stroke, or critical illness. 
                      Existing eye-tracking solutions require specialized hardware costing over $10,000—making 
                      basic communication inaccessible for most families and healthcare systems.
                    </p>
                  </div>

                  <div className="bg-red-50 border border-red-100 rounded-xl p-6 md:p-8">
                    <div className="flex items-start">
                      <AlertTriangle className="w-6 h-6 text-red-600 mr-4 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-red-800 font-semibold mb-2 text-lg">Critical Gap in Care:</p>
                        <p className="text-red-700">
                          When communication technology exists but remains financially inaccessible, 
                          we create barriers to fundamental human connection and dignity.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 2: Solution */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-24"
            id="solution"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-300 overflow-hidden">
              <div className="bg-slate-900 text-white px-6 py-4 md:px-8 md:py-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center text-sm font-bold">2</div>
                  <h2 className="text-xl md:text-2xl font-bold">The Solution</h2>
                </div>
              </div>

              <div className="p-6 md:p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 md:mb-12 leading-tight text-center">
                    Software where hardware was required.
                  </h3>

                  <div className="max-w-3xl mx-auto mb-12">
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-center">
                      GAZE transforms standard device cameras into assistive communication tools through 
                      advanced computer vision—enabling gaze-based typing and speech without proprietary 
                      hardware or complex installations.
                    </p>
                  </div>

                  {/* Solution Architecture */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {SOLUTION_FEATURES.map((feature, index) => (
                      <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-300 hover:border-slate-400 transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center mb-4">
                          <feature.icon className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold mb-2 text-slate-900">{feature.title}</h4>
                        <p className="text-slate-600 text-sm md:text-base">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 3: Live Proof */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-24"
            id="live-proof"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-300 overflow-hidden">
              <div className="bg-slate-900 text-white px-6 py-4 md:px-8 md:py-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center text-sm font-bold">3</div>
                  <h2 className="text-xl md:text-2xl font-bold">Live Proof</h2>
                </div>
              </div>

              <div className="p-6 md:p-8 lg:p-12">
                <div className="max-w-4xl mx-auto text-center">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                    Not a concept—working technology.
                  </h3>

                  <div className="max-w-3xl mx-auto mb-8 md:mb-12">
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                      The system is fully operational and available for immediate deployment. 
                      Everything runs securely in the browser with on-device processing—no biometric data ever leaves the device.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <Link
                      href="/demo"
                      className="inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-6 rounded-xl bg-slate-900 text-white text-lg md:text-xl font-semibold hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] w-full max-w-md mx-auto"
                    >
                      <Eye className="w-6 h-6 md:w-7 md:h-7 mr-3 md:mr-4" />
                      Launch Live Demo
                    </Link>

                    <div className="text-slate-500 font-medium text-sm md:text-base">
                      Fullscreen clinical interface • No installation • Privacy-first
                    </div>
                  </div>

                  {/* Demo Features */}
                  <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      'Browser-based • No installation',
                      'On-device processing • No data leaves',
                      'Medical-grade interface • Distraction-free',
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-3 flex-shrink-0"></div>
                        <span className="text-slate-700 font-medium text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 4: Impact & Scale */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-24"
            id="impact"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-300 overflow-hidden">
              <div className="bg-slate-900 text-white px-6 py-4 md:px-8 md:py-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center text-sm font-bold">4</div>
                  <h2 className="text-xl md:text-2xl font-bold">Impact at Scale</h2>
                </div>
              </div>

              <div className="p-6 md:p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 md:mb-12 leading-tight text-center">
                    Accessibility as public infrastructure.
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                    {METRICS.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className={`inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl ${metric.color} text-white text-3xl md:text-4xl font-bold mb-4 md:mb-6 shadow-lg`}>
                          {metric.value}
                        </div>
                        <div className="text-xl md:text-2xl font-bold mb-2 text-slate-900">{metric.label}</div>
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base">{metric.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8">
                    <blockquote className="text-slate-700 text-lg md:text-xl italic leading-relaxed text-center">
                      &ldquo;This allows accessibility to scale like digital infrastructure, not like medical hardware—reaching everyone, everywhere.&rdquo;
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 5: Why Now */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-24"
            id="why-now"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-300 overflow-hidden">
              <div className="bg-slate-900 text-white px-6 py-4 md:px-8 md:py-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center text-sm font-bold">5</div>
                  <h2 className="text-xl md:text-2xl font-bold">Why Now</h2>
                </div>
              </div>

              <div className="p-6 md:p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 md:mb-12 text-center leading-tight">
                    The convergence is here.
                  </h3>

                  <div className="space-y-6">
                    {WHY_NOW_ITEMS.map((item, index) => (
                      <div key={index} className="flex flex-col sm:flex-row items-start bg-slate-50 rounded-xl p-6 border border-slate-300 hover:border-slate-400 transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center mr-0 sm:mr-6 mb-4 sm:mb-0 flex-shrink-0">
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xl font-semibold text-slate-900 mb-2">{item.title}</p>
                          <p className="text-slate-600 text-lg">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 6: Decision Frame */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-24"
            id="decision"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 text-white px-6 py-4 md:px-8 md:py-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center text-sm font-bold">6</div>
                  <h2 className="text-xl md:text-2xl font-bold">The Decision</h2>
                </div>
              </div>

              <div className="p-6 md:p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight text-center">
                    Restoring communication without compromise.
                  </h3>

                  <div className="max-w-3xl mx-auto mb-8 md:mb-12">
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-center">
                      GAZE restores a fundamental human capability through scalable software. 
                      It replaces expensive, exclusionary hardware with accessible infrastructure—without 
                      compromising privacy, dignity, or safety.
                    </p>
                  </div>

                  {/* Ethical Principles */}
                  <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
                    {ETHICAL_PRINCIPLES.map((item, index) => (
                      <div key={index} className="text-center bg-slate-50 rounded-xl p-6 border border-slate-300">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center mb-4 mx-auto">
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-slate-900 mb-3">{item.principle}</div>
                        <div className="text-slate-600 leading-relaxed text-sm md:text-base">{item.description}</div>
                      </div>
                    ))}
                  </div>

                  {/* Final CTA */}
                  <div className="border-t border-slate-300 pt-8 md:pt-12">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href="/demo"
                        className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 rounded-xl bg-slate-900 text-white text-base md:text-lg font-semibold hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                      >
                        <Eye className="w-5 h-5 md:w-6 md:h-6 mr-3" />
                        Experience the Demo
                      </Link>

                      <Link
                        href="/institutions"
                        className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 rounded-xl border-2 border-slate-900 text-slate-900 text-base md:text-lg font-semibold hover:bg-slate-50 transition-all duration-300"
                      >
                        Institutional Deployment →
                      </Link>
                    </div>

                    <div className="mt-6 md:mt-8 text-center">
                      <p className="text-slate-500 text-sm md:text-base">
                        Ready to transform assistive communication? Let&apos;s discuss your vision.
                      </p>
                    </div>
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