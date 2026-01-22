'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2 } from 'lucide-react'

interface FloatingPitchControllerProps {
  isPlaying: boolean
  isSpeaking: boolean
  currentScriptIndex: number
  segmentProgress: number
  SCRIPT: {
    title: string
    time: string
    content: string
  }[]
  onPlayPause: () => void
}

export default function FloatingPitchController({
  isPlaying,
  isSpeaking,
  currentScriptIndex,
  segmentProgress,
  SCRIPT,
  onPlayPause,
}: FloatingPitchControllerProps) {
  const [showScript, setShowScript] = useState(false)

  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-xs md:max-w-sm">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5" />
              <h3 className="font-semibold text-sm md:text-base">2-Minute Pitch Script</h3>
              {isSpeaking && (
                <div className="flex items-center space-x-1 ml-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">Speaking</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowScript(!showScript)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label={showScript ? "Hide script" : "Show script"}
            >
              {showScript ? '▲' : '▼'}
            </button>
          </div>

          {/* Controls */}
          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={onPlayPause}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isPlaying
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-white text-slate-900 hover:bg-slate-100'
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
                  <span>Play & Narrate</span>
                </>
              )}
            </button>

            <div className="text-xs text-white/80">
              {isPlaying ? (
                <span className="text-green-400 font-medium">
                  Playing {currentScriptIndex + 1}/{SCRIPT.length}
                </span>
              ) : (
                <span>Segment {currentScriptIndex + 1}/{SCRIPT.length}</span>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {isPlaying && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-white/80 mb-1">
                <span>{SCRIPT[currentScriptIndex]?.title}</span>
                <span>{SCRIPT[currentScriptIndex]?.time}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-green-400 h-2 rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${segmentProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Expandable Script Content */}
        <AnimatePresence>
          {showScript && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-4 max-h-[60vh] md:max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {SCRIPT.map((segment, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-all ${
                        index === currentScriptIndex
                          ? 'border-slate-400 bg-slate-50 shadow-sm'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                        <span className="text-sm font-semibold text-slate-900">
                          {segment.title}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {segment.time}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {segment.content}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-xs text-slate-600 mb-2">
                    <span className="font-semibold">Total Duration:</span> 2:00 minutes
                  </div>
                  <div className="text-xs text-slate-600 mb-2">
                    <span className="font-semibold">Delivery:</span> Calm, deliberate pacing with intentional pauses
                  </div>
                  <div className="text-xs text-slate-500">
                    <span className="font-semibold">🎤 Narration:</span> Click "Play & Narrate" to hear the script spoken aloud
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
