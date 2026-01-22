'use client'

import { useEffect, useState, useCallback } from 'react'

export function useJudgeMode() {
  const [judgeMode, setJudgeMode] = useState(false)
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    // Check URL parameter
    const params = new URLSearchParams(window.location.search)
    if (params.get('judge') === 'true') {
      setJudgeMode(true)
      setShowIndicator(true)
      
      // Store in session for other pages
      sessionStorage.setItem('judgeMode', 'true')
    }

    // Check session storage
    if (sessionStorage.getItem('judgeMode') === 'true') {
      setJudgeMode(true)
      setShowIndicator(true)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + J to toggle
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault()
        const newMode = !judgeMode
        setJudgeMode(newMode)
        setShowIndicator(true)
        
        if (newMode) {
          sessionStorage.setItem('judgeMode', 'true')
          // Update URL without refresh
          const url = new URL(window.location.href)
          url.searchParams.set('judge', 'true')
          window.history.replaceState({}, '', url.toString())
        } else {
          sessionStorage.removeItem('judgeMode')
          const url = new URL(window.location.href)
          url.searchParams.delete('judge')
          window.history.replaceState({}, '', url.toString())
        }

        // Hide indicator after 3 seconds
        setTimeout(() => {
          setShowIndicator(false)
        }, 3000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [judgeMode])

  const enterJudgeMode = useCallback(() => {
    setJudgeMode(true)
    setShowIndicator(true)
    sessionStorage.setItem('judgeMode', 'true')
    
    const url = new URL(window.location.href)
    url.searchParams.set('judge', 'true')
    window.history.replaceState({}, '', url.toString())
    
    setTimeout(() => {
      setShowIndicator(false)
    }, 3000)
  }, [])

  const exitJudgeMode = useCallback(() => {
    setJudgeMode(false)
    sessionStorage.removeItem('judgeMode')
    
    const url = new URL(window.location.href)
    url.searchParams.delete('judge')
    window.history.replaceState({}, '', url.toString())
  }, [])

  return {
    judgeMode,
    showIndicator,
    enterJudgeMode,
    exitJudgeMode,
    setShowIndicator,
  }
}