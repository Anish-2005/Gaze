'use client'

import Link from 'next/link'
import { Home, Maximize2, Minimize2, Presentation } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useJudgeMode } from '@/lib/useJudgeMode'
import { cn } from '@/lib/utils'
import './demo.module.css'

export default function DemoLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const { judgeMode, enterJudgeMode } = useJudgeMode()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('judge') === 'true') {
      enterJudgeMode()
    }
    setMounted(true)
  }, [enterJudgeMode])

  useEffect(() => {
    const checkFullscreen = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener('fullscreenchange', checkFullscreen)
    checkFullscreen()

    return () => document.removeEventListener('fullscreenchange', checkFullscreen)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F11' || (e.key === 'f' && e.ctrlKey)) {
        e.preventDefault()
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(console.log)
        } else {
          document.exitFullscreen().catch(console.log)
        }
      }

      if (e.key === ' ' && (!(e.target instanceof HTMLElement) || e.target.tagName !== 'INPUT')) {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent('speak'))
      }

      if (e.key === 'Escape') {
        window.dispatchEvent(new CustomEvent('clear'))
      }

      if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent('reset'))
      }

      if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent('calibrate'))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (judgeMode) {
      document.documentElement.classList.add('judge-mode')
    } else {
      document.documentElement.classList.remove('judge-mode')
    }

    return () => {
      document.documentElement.classList.remove('judge-mode')
    }
  }, [judgeMode])

  const toggleFullscreen = () => {
    if (!mounted) return

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.log)
      return
    }

    document.exitFullscreen().catch(console.log)
  }

  return (
    <div className={cn('relative min-h-screen', judgeMode ? 'pt-0' : 'pt-20')}>
      {judgeMode && (
        <div className="fixed inset-x-0 top-0 z-[70] border-b border-cyan-400/20 bg-slate-950/90 backdrop-blur-xl">
          <div className="mx-auto flex h-10 w-full max-w-[1400px] items-center justify-between px-4 text-xs text-slate-300 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Judge Mode Active
              </span>
              <span className="hidden text-slate-400 sm:inline">Space: Speak</span>
              <span className="hidden text-slate-400 sm:inline">Esc: Clear</span>
            </div>
            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-2.5 py-1 text-[11px] text-slate-300 transition hover:border-slate-500 hover:text-white"
              title="Toggle fullscreen"
            >
              {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              {isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            </button>
          </div>
        </div>
      )}

      {!judgeMode && (
        <div className="pointer-events-none fixed right-4 top-24 z-[65] flex flex-col gap-2 sm:right-6">
          <Link
            href="/"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-xl border border-slate-700/70 bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-200 backdrop-blur-xl transition hover:border-slate-500 hover:text-white"
          >
            <Home className="h-3.5 w-3.5" />
            Overview
          </Link>
          <Link
            href="/pitch"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-xl border border-slate-700/70 bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-200 backdrop-blur-xl transition hover:border-slate-500 hover:text-white"
          >
            <Presentation className="h-3.5 w-3.5" />
            Pitch Mode
          </Link>
          <button
            onClick={toggleFullscreen}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-xl border border-cyan-400/35 bg-cyan-400/10 px-3 py-2 text-xs font-medium text-cyan-200 backdrop-blur-xl transition hover:border-cyan-300 hover:text-cyan-100"
            title="Enter fullscreen mode"
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      )}

      <div className={cn('min-h-screen', judgeMode && 'pt-10')}>
        {children}
      </div>

      {isFullscreen && (
        <div className="fixed right-4 top-4 z-[80] sm:right-6">
          <div className="rounded-full border border-slate-700 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur">
            Fullscreen active
          </div>
        </div>
      )}
    </div>
  )
}
