'use client'

import { useJudgeMode } from '@/lib/useJudgeMode'
import './demo.module.css'
import { useEffect, useState } from 'react'

export default function DemoLayout({
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

  // Apply fullscreen class when in fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        document.documentElement.classList.add('fullscreen')
      } else {
        document.documentElement.classList.remove('fullscreen')
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  return (
    <html lang="en" className={`h-full ${judgeMode ? 'judge-mode' : ''}`}>
      <body className={`h-full bg-gray-50 ${judgeMode ? 'pt-0' : ''}`}>
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
                  <div className="hidden md:flex items-center space-x-2">
                    <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">SPACE</kbd>
                    <span className="text-gray-400">to speak</span>
                  </div>
                  <div className="hidden md:flex items-center space-x-2">
                    <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">ESC</kbd>
                    <span className="text-gray-400">to clear</span>
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
          {children}
        </div>

        {/* Demo Navigation (Only in non-Judge mode) */}
        {!judgeMode && (
          <div className="fixed bottom-4 right-4 z-40">
            <div className="flex items-center space-x-3">
              <a
                href="/pitch"
                className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-lg transition-all"
              >
                ← Back to Pitch
              </a>
              
              <button
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(console.log)
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                title="Enter fullscreen mode for optimal demo experience"
              >
                Fullscreen
              </button>
            </div>
          </div>
        )}

        {/* Keyboard Shortcuts Help */}
        <div className="fixed bottom-4 left-4 z-40">
          <div className="hidden md:block">
            <div className="text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200">
              <div className="font-medium mb-1">Demo Shortcuts:</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <div className="flex items-center">
                  <kbd className="mr-2 px-1.5 py-0.5 bg-gray-100 rounded text-xs">Space</kbd>
                  <span>Speak</span>
                </div>
                <div className="flex items-center">
                  <kbd className="mr-2 px-1.5 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd>
                  <span>Clear</span>
                </div>
                <div className="flex items-center">
                  <kbd className="mr-2 px-1.5 py-0.5 bg-gray-100 rounded text-xs">Ctrl+R</kbd>
                  <span>Reset</span>
                </div>
                <div className="flex items-center">
                  <kbd className="mr-2 px-1.5 py-0.5 bg-gray-100 rounded text-xs">Ctrl+C</kbd>
                  <span>Calibrate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fullscreen Indicator */}
        {isFullscreen && (
          <div className="fixed top-4 right-4 z-30">
            <div className="px-3 py-1.5 bg-black/70 text-white text-xs rounded-full backdrop-blur-sm">
              Fullscreen Mode
            </div>
          </div>
        )}
      </body>
    </html>
  )
}