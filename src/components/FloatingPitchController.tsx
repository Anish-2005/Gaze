'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { Play, Pause, Volume2, X, GripVertical } from 'lucide-react'

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
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  // Set window size after mount
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    updateWindowSize()
    window.addEventListener('resize', updateWindowSize)

    return () => window.removeEventListener('resize', updateWindowSize)
  }, [setWindowSize])

  // Load saved position from localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem('floatingControllerPosition')
    if (savedPosition) {
      try {
        setPosition(JSON.parse(savedPosition))
      } catch {
        // Use default position if parsing fails
        if (typeof window !== 'undefined') {
          setPosition({ x: 20, y: window.innerHeight - 80 })
        } else {
          setPosition({ x: 20, y: 600 }) // Default fallback height
        }
      }
    } else {
      // Default to bottom left corner
      if (typeof window !== 'undefined') {
        setPosition({ x: 20, y: window.innerHeight - 80 })
      } else {
        setPosition({ x: 20, y: 600 }) // Default fallback height
      }
    }
  }, [])

  // Save position to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('floatingControllerPosition', JSON.stringify(position))
  }, [position])

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setPosition(prev => ({
      x: prev.x + info.offset.x,
      y: prev.y + info.offset.y
    }))
    setIsDragging(false)
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  // Don't render until window size is available (prevents SSR issues)
  if (windowSize.width === 0) {
    return null
  }

  // Minimal floating button when collapsed
  if (isCollapsed) {
    return (
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={windowSize.width > 0 ? { left: -windowSize.width + 60, right: windowSize.width - 60, top: -windowSize.height + 60, bottom: windowSize.height - 60 } : {}}
        dragElastic={0}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        initial={position}
        animate={position}
        className="fixed z-50 cursor-move"
        style={{ touchAction: 'none' }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          {/* Main floating button */}
          <button
            onClick={onPlayPause}
            className={`w-12 h-12 rounded-full shadow-2xl border-2 transition-all duration-200 flex items-center justify-center ${
              isPlaying
                ? 'bg-red-500 hover:bg-red-600 border-red-400 text-white shadow-red-500/25'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white shadow-slate-900/25'
            }`}
            aria-label={isPlaying ? "Pause narration" : "Play narration"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>

          {/* Expand button */}
          <button
            onClick={() => setIsCollapsed(false)}
            className="absolute -top-1 -right-1 w-6 h-6 bg-slate-700 hover:bg-slate-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
            aria-label="Expand controls"
          >
            <GripVertical className="w-3 h-3" />
          </button>

          {/* Speaking indicator */}
          <AnimatePresence>
            {isSpeaking && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    )
  }

  // Expanded controller
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={windowSize.width > 0 ? { left: -windowSize.width + 320, right: windowSize.width - 320, top: -windowSize.height + 200, bottom: windowSize.height - 200 } : {}}
      dragElastic={0}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial={position}
      animate={position}
      className={`fixed z-50 w-full max-w-xs md:max-w-sm ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ touchAction: 'none' }}
    >
      <motion.div
        layout
        className="bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden"
      >
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
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setShowScript(!showScript)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label={showScript ? "Hide script" : "Show script"}
              >
                {showScript ? '▲' : '▼'}
              </button>
              <button
                onClick={() => setIsCollapsed(true)}
                className="text-white/80 hover:text-white transition-colors ml-1"
                aria-label="Collapse to button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
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
                    <span className="font-semibold">🎤 Narration:</span> Click &quot;Play &amp; Narrate&quot; to hear the script spoken aloud
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
