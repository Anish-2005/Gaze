'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useGaze } from '@/context/GazeContext';

const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ['SPACE', 'BACKSPACE']
];

const Keyboard: React.FC = () => {
  const { gazeX, gazeY, appendText, backspace, isTracking, setGazePosition } = useGaze();
  // Reduce dwell time for faster selection
  const dwellTime = 400; // ms
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [dwellProgress, setDwellProgress] = useState(0);
  const dwellTimerRef = useRef<NodeJS.Timeout | null>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);

  // Only update hoveredKey and dwell timer when gaze position changes
  useEffect(() => {
    if (!keyboardRef.current) return;

    const rect = keyboardRef.current.getBoundingClientRect();
    const isOverKeyboard = gazeX >= rect.left && gazeX <= rect.right &&
      gazeY >= rect.top && gazeY <= rect.bottom;

    let foundKey: string | null = null;
    if (isOverKeyboard) {
      const keyElements = keyboardRef.current.querySelectorAll('[data-key]');
      for (const element of keyElements) {
        const keyRect = element.getBoundingClientRect();
        const isOverKey = gazeX >= keyRect.left && gazeX <= keyRect.right &&
          gazeY >= keyRect.top && gazeY <= keyRect.bottom;
        if (isOverKey) {
          foundKey = element.getAttribute('data-key');
          break;
        }
      }
    }

    if (foundKey !== hoveredKey) {
      setHoveredKey(foundKey);
      setDwellProgress(0);
    }
    // If not over keyboard, clear dwell timer
    if (!isOverKeyboard && hoveredKey !== null) {
      setHoveredKey(null);
      setDwellProgress(0);
    }
  }, [gazeX, gazeY]);

  // Dwell timer effect: only runs when hoveredKey changes
  useEffect(() => {
    if (!hoveredKey) {
      setDwellProgress(0);
      if (dwellTimerRef.current) {
        clearInterval(dwellTimerRef.current);
        dwellTimerRef.current = null;
      }
      return;
    }
    let progress = 0;
    setDwellProgress(0);
    if (dwellTimerRef.current) {
      clearInterval(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }
    dwellTimerRef.current = setInterval(() => {
      progress += 100;
      setDwellProgress(progress);
      if (progress >= dwellTime) {
        if (hoveredKey === 'SPACE') {
          appendText(' ');
        } else if (hoveredKey === 'BACKSPACE') {
          backspace();
        } else if (hoveredKey) {
          appendText(hoveredKey);
        }
        setHoveredKey(null);
        setDwellProgress(0);
        if (dwellTimerRef.current) {
          clearInterval(dwellTimerRef.current);
          dwellTimerRef.current = null;
        }
      }
    }, 100);
    return () => {
      if (dwellTimerRef.current) {
        clearInterval(dwellTimerRef.current);
        dwellTimerRef.current = null;
      }
    };
  }, [hoveredKey, dwellTime, appendText, backspace]);

  // Test gaze position with mouse (temporary for debugging)
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Temporary: Use mouse position to test keyboard interaction
      setGazePosition(event.clientX, event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setGazePosition]);

  return (
    <div>
      {/* Gaze position indicator */}
      <div
        className="fixed pointer-events-none z-50 w-4 h-4 border-2 border-red-500 rounded-full bg-red-500/20"
        style={{
          left: gazeX - 8,
          top: gazeY - 8,
          transition: 'all 0.1s ease-out'
        }}
      />

      <div ref={keyboardRef} className="w-full max-w-4xl mx-auto">
        {/* Debug Status */}
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-xs font-mono">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Tracking:</span>
              <span className={`ml-2 px-2 py-1 rounded ${isTracking ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {isTracking ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Gaze:</span>
              <span className="ml-2 text-blue-600 dark:text-blue-400">
                {Math.round(gazeX)}, {Math.round(gazeY)}
              </span>
            </div>
          </div>
          {hoveredKey && (
            <div className="mt-2">
              <span className="text-gray-600 dark:text-gray-400">Hovering:</span>
              <span className="ml-2 text-purple-600 dark:text-purple-400 font-bold">
                {hoveredKey} ({dwellProgress}%)
              </span>
            </div>
          )}
        </div>
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
    </div>
  );
};

export default Keyboard;