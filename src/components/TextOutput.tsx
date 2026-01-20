'use client';

import React from 'react';
import { useGaze } from '@/context/GazeContext';

const TextOutput: React.FC = () => {
  const { typedText } = useGaze();

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(typedText);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech not supported in this browser');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-32">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Typed Text</h2>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {typedText || 'Start typing by gazing at keys...'}
        </p>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={handleSpeak}
          disabled={!typedText}
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          🔊 Speak Text
        </button>
      </div>
    </div>
  );
};

export default TextOutput;