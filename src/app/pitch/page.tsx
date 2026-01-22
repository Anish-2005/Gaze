'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Play, Volume2, Pause, Eye } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useJudgeMode } from '@/lib/useJudgeMode'

const SCRIPT = [
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

export default function PitchPage() {
  const [currentScriptIndex, setCurrentScriptIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showScript, setShowScript] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { judgeMode } = useJudgeMode()

  const startScript = () => {
    if (isPlaying) {
      // Stop if already playing
      if (timerRef.current) clearTimeout(timerRef.current)
      setIsPlaying(false)
      return
    }

    setIsPlaying(true)
    setCurrentScriptIndex(0)
    setShowScript(true)

    const playNextSegment = (index: number) => {
      if (index >= SCRIPT.length) {
        setIsPlaying(false)
        return
      }

      setCurrentScriptIndex(index)
      
      timerRef.current = setTimeout(() => {
        playNextSegment(index + 1)
      }, SCRIPT[index].duration * 1000)
    }

    playNextSegment(0)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Script Player (Floating) */}
      {judgeMode && (
        <div className="fixed top-20 right-4 z-50 w-80">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-5 h-5" />
                  <h3 className="font-semibold">2-Minute Pitch Script</h3>
                </div>
                <button
                  onClick={() => setShowScript(!showScript)}
                  className="text-white/80 hover:text-white"
                >
                  {showScript ? '▲' : '▼'}
                </button>
              </div>
              
              <div className="mt-2 flex items-center justify-between">
                <button
                  onClick={startScript}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium ${
                    isPlaying 
                      ? 'bg-white/20 hover:bg-white/30' 
                      : 'bg-white text-blue-600 hover:bg-white/90'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Play Script</span>
                    </>
                  )}
                </button>
                
                <div className="text-xs text-white/80">
                  Total: 2:00
                </div>
              </div>
            </div>

            <AnimatePresence>
              {showScript && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 max-h-96 overflow-y-auto">
                    <div className="space-y-4">
                      {SCRIPT.map((segment, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${
                            index === currentScriptIndex
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900">
                              {segment.title}
                            </span>
                            <span className="text-xs text-gray-500">
                              {segment.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {segment.content}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-2">
                        <span className="font-medium">Timing:</span> ~1:55 total
                      </div>
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Pacing:</span> Speak calmly. Pause deliberately.
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Pitch Content */}
      <div className={`max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-24 ${judgeMode ? 'pt-32' : 'pt-24'}`}>
        <div className="max-w-5xl mx-auto space-y-24">
          {/* Section 1: Problem */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-24"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 text-red-700 text-sm font-medium mb-6">
              Problem Statement
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
              Millions cannot communicate.
            </h1>

            <div className="max-w-3xl">
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                People with paralysis, ALS, stroke, or critical illness often lose
                the ability to speak or type. Existing assistive solutions rely on
                proprietary eye-tracking hardware costing over $10,000, making
                access unrealistic for most families, hospitals, and public systems.
              </p>
              
              <div className="mt-8 p-6 bg-red-50 rounded-xl border border-red-200">
                <div className="flex items-start">
                  <div className="text-red-600 mr-3 mt-1">💡</div>
                  <div>
                    <p className="text-red-800 font-medium mb-2">The Hard Reality:</p>
                    <p className="text-red-700">
                      Communication becomes a luxury when technology exists but isn&apos;t accessible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 2: Solution */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-24"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-6">
              Core Solution
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
              GAZE replaces hardware with software.
            </h2>

            <div className="max-w-3xl">
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                GAZE is a software-based assistive communication system that uses
                standard cameras already present on phones, tablets, and laptops
                to enable gaze-based typing and speech — without proprietary
                devices or infrastructure changes.
              </p>

              {/* Solution Architecture */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <div className="text-green-600 text-2xl mb-3">📱</div>
                  <h4 className="font-bold mb-2">Uses Existing Devices</h4>
                  <p className="text-gray-600 text-sm">
                    Works on any smartphone, tablet, or laptop with a camera
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="text-blue-600 text-2xl mb-3">⚡</div>
                  <h4 className="font-bold mb-2">On-Device Processing</h4>
                  <p className="text-gray-600 text-sm">
                    All processing happens locally, no data leaves the device
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 3: Live Proof */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-24"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              Live Demonstration
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
              This is not a concept.
            </h2>

            <div className="max-w-3xl">
              <p className="text-xl text-gray-600 leading-relaxed mb-10">
                The system is operational and available for immediate use.
                Everything runs in the browser, with on-device processing and
                no biometric data storage.
              </p>

              <div className="space-y-6">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center px-10 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-lg"
                >
                  <Eye className="w-6 h-6 mr-3" />
                  Launch Live Demo
                </Link>
                
                <div className="text-sm text-gray-500">
                  Opens in fullscreen clinical interface • No installation required
                </div>
              </div>

              {/* Demo Features */}
              <div className="mt-12 grid sm:grid-cols-3 gap-4">
                {[
                  'Browser-based - no installation',
                  'On-device processing - no data leaves',
                  'Medical-grade interface - distraction-free',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Section 4: Impact & Scale */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-24"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 text-purple-700 text-sm font-medium mb-6">
              Impact at Scale
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12">
              Accessibility as infrastructure.
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  value: '≥90%',
                  label: 'Cost reduction',
                  description: 'Compared to hardware-based assistive systems',
                  color: 'from-green-500 to-green-600',
                },
                {
                  value: '$0',
                  label: 'Additional hardware',
                  description: 'Required for deployment - uses existing devices',
                  color: 'from-blue-500 to-blue-600',
                },
                {
                  value: 'Global',
                  label: 'Deployment scale',
                  description: 'Web-based architecture works across all regions',
                  color: 'from-purple-500 to-purple-600',
                },
              ].map((metric, index) => (
                <div key={index} className="text-center">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br ${metric.color} text-white text-3xl font-bold mb-4`}>
                    {metric.value}
                  </div>
                  <div className="text-xl font-bold mb-2">{metric.label}</div>
                  <p className="text-gray-600">{metric.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 max-w-3xl">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <p className="text-gray-700">
                  &ldquo;That allows accessibility to scale like infrastructure, not like medical equipment.&rdquo;
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 5: Why Now */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-24"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-sm font-medium mb-6">
              Timing & Opportunity
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
              Why now?
            </h2>

            <div className="max-w-3xl">
              <ul className="space-y-6">
                {[
                  {
                    icon: '📱',
                    text: 'Cameras are ubiquitous across consumer devices',
                    detail: 'Over 6 billion smartphones worldwide',
                  },
                  {
                    icon: '🤖',
                    text: 'Computer vision models can run efficiently on-device',
                    detail: 'ONNX runtime enables local AI processing',
                  },
                  {
                    icon: '🏥',
                    text: 'Healthcare systems are actively seeking low-cost assistive solutions',
                    detail: 'Cost pressure drives innovation in accessible care',
                  },
                  {
                    icon: '🌍',
                    text: 'Accessibility is increasingly treated as public infrastructure',
                    detail: 'Global shift toward inclusive design principles',
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-2xl mr-4 mt-1">{item.icon}</span>
                    <div>
                      <p className="text-lg font-medium text-gray-900 mb-1">{item.text}</p>
                      <p className="text-gray-600">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Section 6: Decision Frame */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-24"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium mb-6">
              The Decision
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
              Restoring communication without compromise.
            </h2>

            <div className="max-w-3xl">
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                GAZE restores a fundamental human capability — communication —
                using software that can scale globally. It replaces expensive,
                exclusionary hardware with accessible infrastructure, without
                compromising privacy, dignity, or safety.
              </p>

              {/* Ethical Principles */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[
                  {
                    principle: 'Dignity',
                    description: 'User agency and autonomy preserved',
                  },
                  {
                    principle: 'Privacy',
                    description: 'On-device processing, no biometric storage',
                  },
                  {
                    principle: 'Access',
                    description: 'Free for individuals, scalable for institutions',
                  },
                ].map((item, index) => (
                  <div key={index} className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-2xl mb-3">✨</div>
                    <div className="font-bold text-gray-900 mb-2">{item.principle}</div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                  </div>
                ))}
              </div>

              {/* Final CTA */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/demo"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Experience the Demo
                  </Link>
                  
                  <Link
                    href="/institutions"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-gray-900 text-gray-900 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Institutional Deployment →
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  )
}