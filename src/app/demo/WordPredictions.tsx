'use client'

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
  isGenerating = false
}: WordPredictionsProps) {
  // Don't show anything if no predictions and not generating
  if (predictions.length === 0 && !isGenerating) return null

  return (
    <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
      <div className="text-xs font-medium text-slate-600 mb-2">
        {isGenerating ? 'Generating suggestions...' : 'Word suggestions:'}
      </div>
      {isGenerating ? (
        <div className="flex items-center justify-center py-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-600"></div>
        </div>
      ) : predictions.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {predictions.map((word, index) => (
            <button
              key={word}
              onClick={() => onSelectWord(word)}
              onMouseEnter={() => setHoveredKey(`WORD_${index}`)}
              onMouseLeave={() => setHoveredKey(null)}
              className={cn(
                'px-3 py-1 text-sm rounded-md border transition-all duration-150',
                'hover:bg-slate-100 hover:border-slate-300',
                hoveredKey === `WORD_${index}` && 'bg-slate-200 border-slate-400'
              )}
              data-gaze-key={`WORD_${index}`}
            >
              {word}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-sm text-slate-500 italic py-2">
          No words found from collected letters
        </div>
      )}
    </div>
  )
}