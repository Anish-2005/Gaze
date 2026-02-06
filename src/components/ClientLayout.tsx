'use client'
// Client layout for GAZE application
import JudgeModeIndicator from '@/components/JudgeModeIndicator'
import KeyboardShortcuts from '@/components/KeyboardShortcuts'
import Navigation from '@/components/Navigation'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { useJudgeMode } from '@/lib/useJudgeMode'
import { usePerformanceMonitoring } from '@/lib/performance'
import { useWebVitals, usePerformanceObserver, useMemoryMonitor } from '@/lib/webVitals'
import { useEffect } from 'react'


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const judgeMode = useJudgeMode()

  // Performance monitoring
  usePerformanceMonitoring()
  useWebVitals()
  usePerformanceObserver()
  useMemoryMonitor()

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration)
        })
        .catch((error) => {
          console.log('SW registration failed:', error)
        })
    }
  }, [])

  // Handle global keyboard shortcuts with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleKeyDown = (e: KeyboardEvent) => {
      // Debounce keyboard events
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        if (e.ctrlKey) {
          switch (e.key.toLowerCase()) {
            case '1':
              e.preventDefault()
              window.location.href = '/'
              break
            case '2':
              e.preventDefault()
              window.location.href = '/pitch'
              break
            case '3':
              e.preventDefault()
              window.location.href = '/demo'
              break
            case '4':
              e.preventDefault()
              window.location.href = '/institutions'
              break
            case '5':
              e.preventDefault()
              window.location.href = '/governance'
              break
          }
        }

        // Print mode (Ctrl+P)
        if (e.ctrlKey && e.key === 'p') {
          e.preventDefault()
          window.print()
        }

        // Quick judge mode entry (J)
        if (e.key === 'J' && e.ctrlKey && e.shiftKey) {
          // Handled by useJudgeMode hook
        }
      }, 0) // Execute immediately
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Apply judge mode classes to html
  useEffect(() => {
    if (typeof document === 'undefined') return

    if (judgeMode.judgeMode) {
      document.documentElement.classList.add('judge-mode')
    } else {
      document.documentElement.classList.remove('judge-mode')
    }
  }, [judgeMode.judgeMode])

  // Apply print styles
  useEffect(() => {
    if (typeof document === 'undefined') return

    const style = document.createElement('style')
    style.innerHTML = `
      @media print {
        .no-print {
          display: none !important;
        }

        body {
          font-size: 12pt;
          line-height: 1.4;
        }

        .print-break {
          page-break-before: always;
        }

        .print-avoid-break {
          page-break-inside: avoid;
        }

        /* Hide navigation and interactive elements */
        nav, button, .no-print-on-page {
          display: none !important;
        }

        /* Ensure content is readable */
        .content {
          color: black !important;
          background: white !important;
        }

        /* Adjust spacing for print */
        .print-spacing {
          margin: 20pt 0;
        }
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <>
      <ErrorBoundary>
        <Navigation />
        <JudgeModeIndicator />
        <KeyboardShortcuts />
        {children}
      </ErrorBoundary>
    </>
  )
}