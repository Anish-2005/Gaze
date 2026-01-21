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

    // Assume keyboard is centered, calculate key under gaze
    const keyboardWidth = 600;
    const keyboardHeight = 300;
    const keyboardX = (window.innerWidth - keyboardWidth) / 2;
    const keyboardY = (window.innerHeight - keyboardHeight) / 2;

    if (screenX < keyboardX || screenX > keyboardX + keyboardWidth ||
        screenY < keyboardY || screenY > keyboardY + keyboardHeight) {
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
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <div className="grid gap-2 p-4 bg-white border rounded-lg shadow-lg" style={{ width: '600px', height: '300px' }}>
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((key) => (
              <button
                key={key}
                className={`flex-1 h-12 border rounded ${
                  hoveredKey === key ? 'bg-blue-200 border-blue-500' : 'bg-gray-100'
                }`}
              >
                {key === ' ' ? 'Space' : key === '⌫' ? 'Back' : key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}