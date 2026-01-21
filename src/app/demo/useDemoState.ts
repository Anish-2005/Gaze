'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

interface DemoState {
  message: string
  isSpeaking: boolean
  isListening: boolean
  calibrationComplete: boolean
  trackingLocked: boolean
  cameraActive: boolean
  selectedQuickPhrase: string | null
}

export function useDemoState() {
  const [state, setState] = useState<DemoState>({
    message: '',
    isSpeaking: false,
    isListening: false,
    calibrationComplete: false,
    trackingLocked: true,
    cameraActive: true,
    selectedQuickPhrase: null,
  })

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Add character to message
  const addChar = useCallback((char: string) => {
    setState(prev => ({
      ...prev,
      message: prev.message + char,
    }))
  }, [])

  // Clear message
  const clearMessage = useCallback(() => {
    setState(prev => ({ ...prev, message: '' }))
  }, [])

  // Add quick phrase
  const addPhrase = useCallback((phrase: string) => {
    setState(prev => ({
      ...prev,
      message: prev.message ? `${prev.message} ${phrase}` : phrase,
      selectedQuickPhrase: phrase,
    }))
  }, [])

  // Speak message
  const speak = useCallback(() => {
    if (!state.message) return

    setState(prev => ({ ...prev, isSpeaking: true }))
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(state.message)
    utterance.rate = 0.9 // Slightly slower for clarity
    utterance.pitch = 1
    utterance.volume = 1
    
    utterance.onend = () => {
      setState(prev => ({ ...prev, isSpeaking: false }))
    }
    
    utterance.onerror = () => {
      setState(prev => ({ ...prev, isSpeaking: false }))
    }
    
    speechRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [state.message])

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel()
    setState(prev => ({ ...prev, isSpeaking: false }))
  }, [])

  // Toggle calibration
  const toggleCalibration = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      calibrationComplete: !prev.calibrationComplete 
    }))
  }, [])

  // Toggle tracking
  const toggleTracking = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      trackingLocked: !prev.trackingLocked 
    }))
  }, [])

  // Reset demo
  const resetDemo = useCallback(() => {
    window.speechSynthesis.cancel()
    setState({
      message: '',
      isSpeaking: false,
      isListening: false,
      calibrationComplete: false,
      trackingLocked: true,
      cameraActive: true,
      selectedQuickPhrase: null,
    })
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  return {
    state,
    addChar,
    addPhrase,
    clearMessage,
    speak,
    stopSpeaking,
    toggleCalibration,
    toggleTracking,
    resetDemo,
  }
}