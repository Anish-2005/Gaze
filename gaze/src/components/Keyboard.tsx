import { useEffect, useState } from 'react';

interface KeyboardProps {
  gazeX: number;
  gazeY: number;
  onLetter: (letter: string) => void;
  dwellTime: number;
}

const keys = [
  ['E', 'T', 'A', 'O', 'I'],
  ['N', 'R', 'S', 'H', 'L'],
  ['D', 'C', 'U', 'M', 'F'],
  ['P', 'G', 'W', 'Y', 'B'],
  ['V', 'K', 'X', 'J', 'Q'],
  [' ', '⌫'],
];

export default function Keyboard({ gazeX, gazeY, onLetter, dwellTime }: KeyboardProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [dwellStart, setDwellStart] = useState<number | null>(null);

  useEffect(() => {
    const screenX = gazeX * window.innerWidth;
    const screenY = gazeY * window.innerHeight;

    // Keyboard is center 70%
    const keyboardTop = window.innerHeight * 0.15;
    const keyboardHeight = window.innerHeight * 0.7;
    const keyboardBottom = keyboardTop + keyboardHeight;
    const keyboardLeft = 0;
    const keyboardWidth = window.innerWidth;

    if (screenY < keyboardTop || screenY > keyboardBottom) {
      setHoveredKey(null);
      setDwellStart(null);
      return;
    }

    const rowHeight = keyboardHeight / keys.length;
    const rowIndex = Math.floor((screenY - keyboardTop) / rowHeight);

    if (rowIndex < 0 || rowIndex >= keys.length) {
      setHoveredKey(null);
      setDwellStart(null);
      return;
    }

    const row = keys[rowIndex];
    const keyWidth = keyboardWidth / row.length;
    const keyIndex = Math.floor((screenX - keyboardLeft) / keyWidth);

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
      setTimeout(() => setHoveredKey(null), 100);
    }
  }, [gazeX, gazeY, hoveredKey, dwellStart, dwellTime, onLetter]);

  const getProgress = (key: string) => {
    if (hoveredKey !== key || !dwellStart) return 0;
    return Math.min((Date.now() - dwellStart) / dwellTime, 1);
  };

  return (
    <div className="fixed top-[15vh] left-0 right-0 bottom-[15vh] bg-black flex flex-col">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-1">
          {row.map((key) => {
            const progress = getProgress(key);
            const radius = 30;
            const circumference = 2 * Math.PI * radius;
            const strokeDasharray = circumference;
            const strokeDashoffset = circumference - progress * circumference;
            return (
              <div key={key} className="flex-1 relative flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full">
                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    fill="none"
                    stroke="green"
                    strokeWidth="4"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-100"
                  />
                </svg>
                <button
                  className={`w-full h-full text-2xl text-white ${
                    hoveredKey === key ? 'bg-blue-500' : 'bg-gray-700'
                  }`}
                >
                  {key === ' ' ? 'Space' : key === '⌫' ? 'Back' : key}
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}