'use client'

import Link from 'next/link'
import { Home, Maximize2, Minimize2, Presentation } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useJudgeMode } from '@/lib/useJudgeMode'
import { cn } from '@/lib/utils'
import './demo.css'

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

      const targetTag = e.target instanceof HTMLElement ? e.target.tagName : ''
      const isInteractiveTarget = ['INPUT', 'TEXTAREA', 'BUTTON', 'SELECT'].includes(targetTag)

      if (e.key === ' ' && !isInteractiveTarget) {
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
    <div className={cn('demo-root', judgeMode ? 'pt-0' : 'pt-20')}>
      <div className="demo-grid-overlay" />

      {judgeMode && (
        <div className="demo-top-strip fixed inset-x-0 top-0 z-[70]">
          <div className="mx-auto flex h-10 w-full max-w-[1400px] items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
            <div className="flex items-center gap-3" style={{ color: 'rgb(var(--text-secondary))' }}>
              <span
                className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={{
                  color: 'rgb(var(--accent-emerald))',
                  background: 'color-mix(in oklab, rgb(var(--accent-emerald)) 16%, transparent)',
                  border: '1px solid color-mix(in oklab, rgb(var(--accent-emerald)) 36%, transparent)',
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(var(--accent-emerald))' }} />
                Judge Mode Active
              </span>
              <span className="hidden sm:inline">Space: Speak</span>
              <span className="hidden sm:inline">Esc: Clear</span>
            </div>

            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-[11px] transition"
              style={{
                borderColor: 'var(--card-border)',
                color: 'rgb(var(--text-secondary))',
                background: 'var(--card-bg)',
              }}
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
            className="demo-floating-link pointer-events-auto inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium backdrop-blur-xl transition"
          >
            <Home className="h-3.5 w-3.5" />
            Overview
          </Link>
          <Link
            href="/pitch"
            className="demo-floating-link pointer-events-auto inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium backdrop-blur-xl transition"
          >
            <Presentation className="h-3.5 w-3.5" />
            Pitch Mode
          </Link>
          <button
            onClick={toggleFullscreen}
            className="demo-floating-link-accent pointer-events-auto inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium backdrop-blur-xl transition"
            title="Toggle fullscreen mode"
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
          <div
            className="rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur"
            style={{
              borderColor: 'var(--card-border)',
              background: 'var(--card-bg-strong)',
              color: 'rgb(var(--text-primary))',
            }}
          >
            Fullscreen active
          </div>
        </div>
      )}
    </div>
  )
}
