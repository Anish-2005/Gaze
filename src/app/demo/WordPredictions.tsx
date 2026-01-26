'use client'

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
  console.log('WordPredictions rendered with:', { predictions, isGenerating })

  // Always show for debugging
  return (
    <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
      <div className="text-xs font-medium text-red-600 mb-2">
        DEBUG: {isGenerating ? 'Generating...' : 'Ready'} | Predictions: {predictions.length} | Hovered: {hoveredKey}
      </div>
      <div className="text-xs text-red-500 mb-2">
        Predictions: {predictions.join(', ')}
      </div>
      {predictions.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {predictions.map((word, index) => (
            <button
              key={word}
              onClick={() => onSelectWord(word)}
              onMouseEnter={() => setHoveredKey(`WORD_${index}`)}
              onMouseLeave={() => setHoveredKey(null)}
              className="px-3 py-1 text-sm rounded-md border transition-all duration-150 hover:bg-red-200 hover:border-red-400 bg-white"
              data-gaze-key={`WORD_${index}`}
            >
              {word}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-xs text-red-500">No predictions</div>
      )}
    </div>
  )
}