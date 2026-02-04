'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'

interface WordPredictionsProps {
  predictions: string[]
  onSelectWord: (word: string) => void
  hoveredKey: string | null
  setHoveredKey: (key: string | null) => void
  isGenerating?: boolean
}

export default function WordPredictions({
  predictions,
  onSelectWord,
  hoveredKey,
  setHoveredKey,
  isGenerating = false
}: WordPredictionsProps) {
  // Don't show anything if no predictions and not generating
  if (predictions.length === 0 && !isGenerating) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 glass-card p-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-blue-400" />
        <span className="text-xs font-medium text-slate-400">
          {isGenerating ? 'Generating suggestions...' : 'Word suggestions'}
        </span>
      </div>

      {isGenerating ? (
        <div className="flex items-center gap-3 py-2">
          {/* Skeleton loading */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="skeleton h-8 w-16 rounded-lg"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      ) : predictions.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {predictions.map((word, index) => (
            <motion.button
              key={word}
              onClick={() => onSelectWord(word)}
              onMouseEnter={() => setHoveredKey(`WORD_${index}`)}
              onMouseLeave={() => setHoveredKey(null)}
              data-gaze-key={`WORD_${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'px-4 py-2 text-sm rounded-xl border transition-all duration-200',
                'bg-slate-800/50 border-slate-700',
                'hover:bg-slate-700 hover:border-slate-600',
                hoveredKey === `WORD_${index}` && 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50 text-white shadow-lg shadow-blue-500/10'
              )}
            >
              <span className={cn(
                'text-slate-300',
                hoveredKey === `WORD_${index}` && 'text-white'
              )}>
                {word}
              </span>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="text-sm text-slate-500 italic py-2 flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          No words found from collected letters
        </div>
      )}
    </motion.div>
  )
}