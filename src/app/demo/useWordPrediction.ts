'use client'

import { useState, useEffect, useCallback } from 'react'

// Common English words for prediction
const COMMON_WORDS = [
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'has', 'let', 'put', 'say', 'she', 'too', 'use',
  'that', 'with', 'have', 'this', 'will', 'your', 'from', 'they', 'know', 'want', 'been', 'good', 'much', 'some', 'time', 'very', 'when', 'come', 'here', 'just', 'like', 'long', 'make', 'many', 'over', 'such', 'take', 'than', 'them', 'well', 'were',
  'about', 'could', 'other', 'after', 'first', 'never', 'think', 'found', 'great', 'house', 'large', 'might', 'place', 'right', 'small', 'sound', 'still', 'their', 'there', 'these', 'thing', 'three', 'water', 'where', 'which', 'world', 'would', 'write', 'years', 'young',
  'before', 'called', 'coming', 'enough', 'little', 'looked', 'number', 'people', 'really', 'should', 'through', 'turned', 'almost', 'another', 'because', 'between', 'country', 'different', 'doesnt', 'during', 'however', 'nothing', 'question', 'something', 'together', 'without',
  'american', 'anything', 'around', 'beautiful', 'believe', 'building', 'business', 'children', 'company', 'continue', 'control', 'decided', 'develop', 'education', 'everyone', 'example', 'experience', 'family', 'feeling', 'finally', 'following', 'friends', 'government', 'happened', 'himself', 'history', 'important', 'including', 'information', 'interest', 'language', 'learned', 'machine', 'material', 'medical', 'meeting', 'million', 'morning', 'movement', 'natural', 'nothing', 'outside', 'perhaps', 'personal', 'physical', 'picture', 'possible', 'present', 'private', 'problem', 'program', 'project', 'provide', 'quickly', 'reading', 'receive', 'remember', 'require', 'science', 'several', 'special', 'started', 'student', 'support', 'surface', 'system', 'teacher', 'technology', 'themselves', 'thought', 'through', 'together', 'tonight', 'training', 'understand', 'usually', 'various', 'waiting', 'walking', 'whether', 'without', 'working', 'writing'
]

export function useWordPrediction() {
  const [hoveredSequence, setHoveredSequence] = useState<string[]>([])
  const [predictions, setPredictions] = useState<string[]>([])
  const [showPredictions, setShowPredictions] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const addHoveredKey = useCallback((key: string) => {
    setHoveredSequence(prev => {
      // Add new key to sequence
      const newSequence = [...prev, key.toLowerCase()]
      // Keep only last 10 letters for prediction
      return newSequence.slice(-10)
    })
    // Reset predictions when new key is added
    setShowPredictions(false)
    setPredictions([])
  }, [])

  const clearSequence = useCallback(() => {
    setHoveredSequence([])
    setPredictions([])
    setShowPredictions(false)
    setIsGenerating(false)
  }, [])

  // Function to check if a word can be formed from letters
  const canFormWord = useCallback((word: string, letters: string[]): boolean => {
    const letterCount: Record<string, number> = {}
    
    // Count available letters
    letters.forEach(letter => {
      letterCount[letter] = (letterCount[letter] || 0) + 1
    })
    
    // Check if word can be formed
    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      if (typeof char !== 'string' || !letterCount[char] || letterCount[char] <= 0) {
        return false
      }
      letterCount[char]--
    }
    
    return true
  }, [])

  // Generate predictions from collected letters
  useEffect(() => {
    if (hoveredSequence.length === 0) {
      setPredictions([])
      setShowPredictions(false)
      setIsGenerating(false)
      return
    }

    // Only start generating after at least 2 letters and 2 seconds of inactivity
    if (hoveredSequence.length < 2) {
      return
    }

    setIsGenerating(true)

    const timeout = setTimeout(() => {
      // Find words that can be formed from the collected letters
      const possibleWords = COMMON_WORDS
        .filter(word => {
          // Only consider words of reasonable length
          return word.length >= 2 && word.length <= hoveredSequence.length
        })
        .filter(word => canFormWord(word, hoveredSequence))
        .sort((a, b) => {
          // Sort by word length (longer words first) then alphabetically
          if (b.length !== a.length) {
            return b.length - a.length
          }
          return a.localeCompare(b)
        })
        .slice(0, 5) // Limit to 5 suggestions

      setPredictions(possibleWords)
      setShowPredictions(possibleWords.length > 0)
      setIsGenerating(false)
    }, 2000) // 2 second delay

    return () => {
      clearTimeout(timeout)
      setIsGenerating(false)
    }
  }, [hoveredSequence, canFormWord])

  return {
    hoveredSequence,
    predictions: showPredictions ? predictions : [],
    isGenerating,
    addHoveredKey,
    clearSequence,
    selectWord: clearSequence // Clear sequence when word is selected
  }
}