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
    <div ref={keyboardRef} className="w-full max-w-4xl mx-auto">
      <div className="grid gap-3">
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-3">
            {row.map((key) => (
              <button
                key={key}
                data-key={key}
                className={`relative px-4 py-6 text-xl font-bold rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  hoveredKey === key
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-600 scale-110 shadow-lg shadow-blue-500/50'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg'
                }`}
                style={{
                  minWidth: key === 'SPACE' ? '200px' : key === 'BACKSPACE' ? '120px' : '60px',
                  minHeight: '60px',
                }}
              >
                <span className="relative z-10">
                  {key === 'SPACE' ? '␣' : key === 'BACKSPACE' ? '⌫' : key}
                </span>
                {hoveredKey === key && (
                  <div
                    className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-b-xl transition-all duration-100 ease-out"
                    style={{ width: `${dwellProgress}%` }}
                  />
                )}
                {hoveredKey === key && dwellProgress > 0 && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg">
                    {Math.round(dwellProgress)}%
                  </div>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Keyboard hints */}
      <div className="mt-6 flex justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Gazing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Selecting</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <span>Available</span>
        </div>
      </div>
    </div>
  );
};

export default Keyboard;