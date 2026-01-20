'use client';

import React, { useState, useEffect } from 'react';
import { useGaze } from '@/context/GazeContext';

const TextOutput: React.FC = () => {
  const { typedText } = useGaze();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
        if (availableVoices.length > 0 && !selectedVoice) {
          setSelectedVoice(availableVoices[0]);
        }
      };

      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [selectedVoice]);

  const handleSpeak = () => {
    if ('speechSynthesis' in window && typedText) {
      if (isSpeaking) {
        speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(typedText);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      speechSynthesis.speak(utterance);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(typedText);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const wordCount = typedText.trim() ? typedText.trim().split(/\s+/).length : 0;
  const charCount = typedText.length;

  return (
    <div className="flex flex-col h-full">
      {/* Text Display */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4 min-h-64">
        <div className="h-full">
          {typedText ? (
            <pre className="whitespace-pre-wrap text-gray-900 dark:text-white text-lg leading-relaxed font-mono h-full overflow-y-auto">
              {typedText}
            </pre>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <div className="text-6xl mb-4">👁️</div>
                <p className="text-xl">Start typing with your gaze</p>
                <p className="text-sm mt-2">Look at keyboard keys to begin</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{charCount}</div>
          <div className="text-sm text-blue-600 dark:text-blue-400">Characters</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{wordCount}</div>
          <div className="text-sm text-green-600 dark:text-green-400">Words</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {wordCount > 0 ? Math.round((charCount / 5) / (wordCount / 200)) : 0}
          </div>
          <div className="text-sm text-purple-600 dark:text-purple-400">WPM</div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Voice Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Voice
          </label>
          <select
            value={selectedVoice?.name || ''}
            onChange={(e) => {
              const voice = voices.find(v => v.name === e.target.value);
              setSelectedVoice(voice || null);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {voices.map((voice, index) => (
              <option key={index} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSpeak}
            disabled={!typedText}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              isSpeaking
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } disabled:bg-gray-400 disabled:cursor-not-allowed`}
          >
            {isSpeaking ? '⏹️ Stop Speaking' : '🔊 Speak Text'}
          </button>
          <button
            onClick={copyToClipboard}
            disabled={!typedText}
            className="px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            📋 Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextOutput;