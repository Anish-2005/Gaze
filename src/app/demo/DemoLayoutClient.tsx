'use client'

import { useJudgeMode } from '@/lib/useJudgeMode'
import './demo.module.css'
import { useEffect, useState } from 'react'

export default function DemoLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const { judgeMode, enterJudgeMode } = useJudgeMode()
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Auto-enter judge mode if ?judge=true is in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('judge') === 'true') {
      enterJudgeMode()
    }
  }, [enterJudgeMode])

  // Track fullscreen status
  useEffect(() => {
    const checkFullscreen = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', checkFullscreen)
    // Also check on mount
    checkFullscreen()

    return () => document.removeEventListener('fullscreenchange', checkFullscreen)
  }, [])

  // Handle keyboard shortcuts for demo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Fullscreen toggle with F11 or F
      if (e.key === 'F11' || (e.key === 'f' && e.ctrlKey)) {
        e.preventDefault()
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(console.log)
        } else {
          document.exitFullscreen().catch(console.log)
        }
      }

      // Space to trigger speak event
      if (e.key === ' ' && !e.target || (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault()
        const speakEvent = new CustomEvent('speak')
        window.dispatchEvent(speakEvent)
      }

      // Escape to trigger clear event
      if (e.key === 'Escape') {
        const clearEvent = new CustomEvent('clear')
        window.dispatchEvent(clearEvent)
      }

      // R to reset demo
      if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault()
        const resetEvent = new CustomEvent('reset')
        window.dispatchEvent(resetEvent)
      }

      // C for calibration
      if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault()
        const calibrateEvent = new CustomEvent('calibrate')
        window.dispatchEvent(calibrateEvent)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Apply judge-mode class to document element
  useEffect(() => {
    if (judgeMode) {
      document.documentElement.classList.add('judge-mode')
    } else {
      document.documentElement.classList.remove('judge-mode')
    }

    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove('judge-mode')
    }
  }, [judgeMode])

  return (
    <div className={`h-full bg-gray-50 my-24 ${judgeMode ? 'pt-0' : ''}`}>
      {/* Demo Status Bar (Visible in Judge Mode) */}
      {judgeMode && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-gray-100 border-b border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-8 text-xs">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="font-mono">DEMO ACTIVE</span>
                </div>
                <span className="text-gray-400">|</span>
                <div className="hidden sm:flex items-center space-x-2">
                  <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">SPACE</kbd>
                  <span className="text-gray-400">to speak</span>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">ESC</kbd>
                  <span className="text-gray-400">to clear</span>
                </div>
                {/* Mobile shortcuts hint */}
                <div className="sm:hidden flex items-center space-x-2">
                  <span className="text-gray-400 text-xs">Use buttons below</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    if (!document.fullscreenElement) {
                      document.documentElement.requestFullscreen().catch(console.log)
                    } else {
                      document.exitFullscreen().catch(console.log)
                    }
                  }}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                  title="Toggle Fullscreen (F11 or Ctrl+F)"
                >
                  {document.fullscreenElement ? 'Exit Fullscreen' : 'Fullscreen'}
                </button>

                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-gray-400">Judge Mode</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Demo Content */}
      <div className={`h-full ${judgeMode ? 'pt-8' : ''}`}>
        {/* Elegant Navigation Header */}
        {!judgeMode && (
          <div className="absolute top-4 left-4 right-4 z-30">
            <div className="flex items-center justify-between">
              <a
                href="/pitch"
                className="inline-flex items-center space-x-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-lg transition-all"
              >
                <span>←</span>
                <span>Back to Pitch</span>
              </a>

              <button
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(console.log)
                  }
                }}
                className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-600/90 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-all shadow-lg"
                title="Enter fullscreen mode for optimal demo experience"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span>Fullscreen</span>
              </button>
            </div>
          </div>
        )}

        {children}
      </div>



      {/* Fullscreen Indicator */}
      {isFullscreen && (
        <div className="fixed top-4 right-4 z-30">
          <div className="px-3 py-1.5 bg-black/70 text-white text-xs rounded-full backdrop-blur-sm">
            Fullscreen Mode
          </div>
        </div>
      )}
    </div>
  )
}