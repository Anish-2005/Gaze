'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useGaze } from '@/context/GazeContext';

const DWELL_TIME = 1000; // 1 second dwell time

const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ['SPACE', 'BACKSPACE']
];

const Keyboard: React.FC = () => {
  const { gazeX, gazeY, appendText, backspace } = useGaze();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [dwellProgress, setDwellProgress] = useState(0);
  const dwellTimerRef = useRef<NodeJS.Timeout | null>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!keyboardRef.current) return;

    const rect = keyboardRef.current.getBoundingClientRect();
    const isOverKeyboard = gazeX >= rect.left && gazeX <= rect.right &&
                          gazeY >= rect.top && gazeY <= rect.bottom;

    if (!isOverKeyboard) {
      setHoveredKey(null);
      setDwellProgress(0);
      if (dwellTimerRef.current) {
        clearInterval(dwellTimerRef.current);
        dwellTimerRef.current = null;
      }
      return;
    }

    // Find which key is being gazed at
    const keyElements = keyboardRef.current.querySelectorAll('[data-key]');
    let foundKey = null;
    for (const element of keyElements) {
      const keyRect = element.getBoundingClientRect();
      if (gazeX >= keyRect.left && gazeX <= keyRect.right &&
          gazeY >= keyRect.top && gazeY <= keyRect.bottom) {
        foundKey = element.getAttribute('data-key');
        break;
      }
    }

    if (foundKey !== hoveredKey) {
      setHoveredKey(foundKey);
      setDwellProgress(0);
      if (dwellTimerRef.current) {
        clearInterval(dwellTimerRef.current);
        dwellTimerRef.current = null;
      }

      if (foundKey) {
        // Start dwell timer
        let progress = 0;
        dwellTimerRef.current = setInterval(() => {
          progress += 100; // Update every 100ms
          setDwellProgress(progress);
          if (progress >= DWELL_TIME) {
            // Dwell completed
            if (foundKey === 'SPACE') {
              appendText(' ');
            } else if (foundKey === 'BACKSPACE') {
              backspace();
            } else {
              appendText(foundKey!);
            }
            setHoveredKey(null);
            setDwellProgress(0);
            if (dwellTimerRef.current) {
              clearInterval(dwellTimerRef.current);
              dwellTimerRef.current = null;
            }
          }
        }, 100);
      }
    }
  }, [gazeX, gazeY, hoveredKey, appendText]);

  return (
    <div ref={keyboardRef} className="w-full max-w-4xl mx-auto p-4">
      <div className="grid gap-2">
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {row.map((key) => (
              <button
                key={key}
                data-key={key}
                className={`relative px-4 py-6 text-xl font-bold rounded-lg border-2 transition-all duration-200 ${
                  hoveredKey === key
                    ? 'bg-blue-500 text-white border-blue-600 scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                style={{
                  minWidth: key === 'SPACE' ? '200px' : key === 'BACKSPACE' ? '120px' : '60px',
                }}
              >
                {key === 'SPACE' ? '␣' : key === 'BACKSPACE' ? '⌫' : key}
                {hoveredKey === key && (
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-green-500 transition-all duration-100 rounded-b"
                    style={{ width: `${(dwellProgress / DWELL_TIME) * 100}%` }}
                  />
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
      <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
        Look at a key to start dwell selection
      </p>
    </div>
  );
};

export default Keyboard;