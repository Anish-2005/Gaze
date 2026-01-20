'use client';

import React, { useState } from 'react';
import { useGaze } from '@/context/GazeContext';

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const { typedText, setTypedText, dwellTime, setDwellTime, voice, setVoice, keyboardLayout, setKeyboardLayout } = useGaze();

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(typedText);
      if (voice !== 'default') {
        const voices = speechSynthesis.getVoices();
        const selectedVoice = voices.find(v => v.name === voice);
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  const clearText = () => {
    setTypedText('');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(typedText);
      alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadText = () => {
    const blob = new Blob([typedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gazetype-text-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings & Tools</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dwell Time Settings */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Timing</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dwell Time: {dwellTime}ms
            </label>
            <input
              type="range"
              min="500"
              max="3000"
              step="100"
              value={dwellTime}
              onChange={(e) => setDwellTime(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Fast (500ms)</span>
              <span>Slow (3000ms)</span>
            </div>
          </div>
        </div>

        {/* Voice Settings */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Speech</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Voice
            </label>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="default">Default Voice</option>
              {typeof window !== 'undefined' && speechSynthesis.getVoices().map((v, index) => (
                <option key={index} value={v.name}>{v.name} ({v.lang})</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSpeak}
            disabled={!typedText}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            🔊 Test Speech
          </button>
        </div>

        {/* Keyboard Layout */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Keyboard</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Layout
            </label>
            <select
              value={keyboardLayout}
              onChange={(e) => setKeyboardLayout(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="qwerty">QWERTY</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="frequency">Frequency-based</option>
            </select>
          </div>
        </div>

        {/* Text Actions */}
        <div className="space-y-3 md:col-span-2 lg:col-span-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Text Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={copyToClipboard}
              disabled={!typedText}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              📋 Copy to Clipboard
            </button>
            <button
              onClick={downloadText}
              disabled={!typedText}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              💾 Download as File
            </button>
            <button
              onClick={clearText}
              disabled={!typedText}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              🗑️ Clear Text
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-3 md:col-span-2 lg:col-span-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">{typedText.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{typedText.split(' ').length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-purple-600">{Math.round(typedText.length / 5) || 0}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">WPM (est.)</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-orange-600">{new Date().toLocaleTimeString()}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Session Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;