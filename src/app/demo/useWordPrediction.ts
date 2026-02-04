'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

// Common English words for local fallback prediction
const COMMON_WORDS = [
  // Essential communication words for assistive use
  'yes', 'no', 'help', 'pain', 'water', 'nurse', 'doctor', 'cold', 'hot', 'tired',
  'hungry', 'thirsty', 'bathroom', 'medicine', 'family', 'please', 'thank', 'sorry',
  'love', 'need', 'want', 'feel', 'good', 'bad', 'okay', 'stop', 'wait', 'more',
  'less', 'now', 'later', 'here', 'there', 'bed', 'chair', 'light', 'dark', 'quiet',
  'loud', 'sleep', 'awake', 'comfortable', 'uncomfortable', 'hurts', 'better', 'worse',
  // Common words
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was',
  'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new',
  'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'let', 'put', 'say', 'she',
  'too', 'use', 'that', 'with', 'have', 'this', 'will', 'your', 'from', 'they', 'know',
  'want', 'been', 'good', 'much', 'some', 'time', 'very', 'when', 'come', 'here', 'just',
  'like', 'long', 'make', 'many', 'over', 'such', 'take', 'than', 'them', 'well', 'were',
  'about', 'could', 'other', 'after', 'first', 'never', 'think', 'found', 'great', 'house',
  'large', 'might', 'place', 'right', 'small', 'sound', 'still', 'their', 'there', 'these',
  'thing', 'three', 'where', 'which', 'world', 'would', 'write', 'years', 'young',
  'before', 'called', 'coming', 'enough', 'little', 'looked', 'number', 'people', 'really',
  'should', 'through', 'turned', 'almost', 'another', 'because', 'between'
]

export function useWordPrediction() {
  const [hoveredSequence, setHoveredSequence] = useState<string[]>([])
  const [predictions, setPredictions] = useState<string[]>([])
  const [showPredictions, setShowPredictions] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')
  const abortControllerRef = useRef<AbortController | null>(null)

  const addHoveredKey = useCallback((key: string) => {
    setHoveredSequence(prev => {
      const newSequence = [...prev, key.toLowerCase()]
      return newSequence.slice(-10) // Keep last 10 letters
    })
    setShowPredictions(false)
    setPredictions([])
  }, [])

  const clearSequence = useCallback(() => {
    setHoveredSequence([])
    setPredictions([])
    setShowPredictions(false)
    setIsGenerating(false)
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }, [])

  const updateCurrentMessage = useCallback((message: string) => {
    setCurrentMessage(message)
  }, [])

  // Local fallback prediction
  const getLocalPredictions = useCallback((letters: string[]): string[] => {
    const letterCount: Record<string, number> = {}
    letters.forEach(letter => {
      letterCount[letter] = (letterCount[letter] || 0) + 1
    })

    const canFormWord = (word: string): boolean => {
      const tempCount = { ...letterCount }
      for (const char of word) {
        if (!tempCount[char] || tempCount[char] <= 0) return false
        tempCount[char]--
      }
      return true
    }

    return COMMON_WORDS
      .filter(word => word.length >= 2 && word.length <= letters.length)
      .filter(canFormWord)
      .sort((a, b) => b.length - a.length || a.localeCompare(b))
      .slice(0, 5)
  }, [])

  // Fetch AI predictions
  const fetchAIPredictions = useCallback(async (letters: string[]): Promise<string[]> => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          letters,
          currentMessage: currentMessage || undefined
        }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) throw new Error('API error')

      const data = await response.json()
      return data.predictions || []
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return [] // Request was cancelled
      }
      console.log('AI prediction failed, using local fallback')
      return [] // Return empty to trigger fallback
    }
  }, [currentMessage])

  // Generate predictions from collected letters
  useEffect(() => {
    if (hoveredSequence.length === 0) {
      setPredictions([])
      setShowPredictions(false)
      setIsGenerating(false)
      return
    }

    if (hoveredSequence.length < 2) {
      return
    }

    setIsGenerating(true)

    // Debounce: wait 1.5 seconds before fetching
    const timeout = setTimeout(async () => {
      try {
        // Try AI predictions first
        const aiPredictions = await fetchAIPredictions(hoveredSequence)

        if (aiPredictions.length > 0) {
          setPredictions(aiPredictions)
          setShowPredictions(true)
        } else {
          // Fallback to local predictions
          const localPreds = getLocalPredictions(hoveredSequence)
          setPredictions(localPreds)
          setShowPredictions(localPreds.length > 0)
        }
      } catch {
        // Use local predictions on any error
        const localPreds = getLocalPredictions(hoveredSequence)
        setPredictions(localPreds)
        setShowPredictions(localPreds.length > 0)
      } finally {
        setIsGenerating(false)
      }
    }, 1500)

    return () => {
      clearTimeout(timeout)
      setIsGenerating(false)
    }
  }, [hoveredSequence, fetchAIPredictions, getLocalPredictions])

  return {
    hoveredSequence,
    predictions: showPredictions ? predictions : [],
    isGenerating,
    addHoveredKey,
    clearSequence,
    updateCurrentMessage,
    selectWord: clearSequence
  }
}