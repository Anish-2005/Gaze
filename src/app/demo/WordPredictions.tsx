'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  isGenerating = false,
}: WordPredictionsProps) {
  if (predictions.length === 0 && !isGenerating) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 rounded-2xl border border-slate-700 bg-slate-950/70 p-4"
    >
      <div className="mb-3 flex items-center gap-2 text-slate-300">
        <Sparkles className="h-4 w-4 text-cyan-300" />
        <span className="text-xs font-semibold uppercase tracking-[0.12em]">
          {isGenerating ? 'Generating suggestions' : 'Predicted words'}
        </span>
      </div>

      {isGenerating ? (
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-9 w-24 rounded-xl" style={{ animationDelay: `${i * 0.15}s` }} />
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
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className={cn(
                'rounded-xl border px-4 py-2 text-sm font-medium transition',
                hoveredKey === `WORD_${index}`
                  ? 'border-cyan-300/50 bg-cyan-300/15 text-white'
                  : 'border-slate-600 bg-slate-900 text-slate-200 hover:border-slate-400 hover:bg-slate-800'
              )}
            >
              {word}
            </motion.button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">No suggestions available from the recent key sequence.</p>
      )}
    </motion.section>
  )
}
