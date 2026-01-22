import { useEffect, useState } from 'react';

interface KeyboardProps {
  gazeX: number;
  gazeY: number;
  onLetter: (letter: string) => void;
  dwellTime: number;
}

const keys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  [' ', '⌫'], // space and backspace
];

export default function Keyboard({ gazeX, gazeY, onLetter, dwellTime }: KeyboardProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [dwellStart, setDwellStart] = useState<number | null>(null);

  useEffect(() => {
    const screenX = gazeX * window.innerWidth;
    const screenY = gazeY * window.innerHeight;

    // Responsive keyboard dimensions
    const keyboardWidth = Math.min(600, window.innerWidth - 40); // Max 600px, min padding
    const keyboardHeight = Math.min(300, window.innerHeight * 0.4); // Max 300px or 40% of screen height
    const keyboardX = (window.innerWidth - keyboardWidth) / 2;
    const keyboardY = (window.innerHeight - keyboardHeight) / 2;

    if (screenX < keyboardX || screenX > keyboardX + keyboardWidth ||
        screenY < keyboardY || screenY > keyboardY + keyboardHeight) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHoveredKey(null);
      setDwellStart(null);
      return;
    }

    const localX = screenX - keyboardX;
    const localY = screenY - keyboardY;

    const rowHeight = keyboardHeight / keys.length;
    const rowIndex = Math.floor(localY / rowHeight);

    if (rowIndex < 0 || rowIndex >= keys.length) {
      setHoveredKey(null);
      setDwellStart(null);
      return;
    }

    const row = keys[rowIndex];
    const keyWidth = keyboardWidth / row.length;
    const keyIndex = Math.floor(localX / keyWidth);

    if (keyIndex < 0 || keyIndex >= row.length) {
      setHoveredKey(null);
      setDwellStart(null);
      return;
    }

    const key = row[keyIndex];
    if (hoveredKey !== key) {
      setHoveredKey(key);
      setDwellStart(Date.now());
    } else if (dwellStart && Date.now() - dwellStart > dwellTime) {
      onLetter(key === '⌫' ? 'backspace' : key);
      setDwellStart(null);
      // Reset to avoid repeated triggers
      setTimeout(() => setHoveredKey(null), 100);
    }
  }, [gazeX, gazeY, hoveredKey, dwellStart, dwellTime, onLetter]);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none p-4">
      <div className="w-full max-w-lg bg-white border rounded-lg shadow-lg p-4" style={{ aspectRatio: '2/1' }}>
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 mb-1 flex-1">
            {row.map((key) => (
              <button
                key={key}
                className={`flex-1 border rounded text-sm font-medium ${
                  hoveredKey === key ? 'bg-blue-200 border-blue-500' : 'bg-gray-100'
                }`}
                style={{ minHeight: '2.5rem' }}
              >
                {key === ' ' ? 'Space' : key === '⌫' ? '⌫' : key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}