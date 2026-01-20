"use client";
import CameraFeed from '@/components/CameraFeed';
import GazeTracker from '@/components/GazeTracker';
import Keyboard from '@/components/Keyboard';
import TextOutput from '@/components/TextOutput';
import DarkModeToggle from '@/components/DarkModeToggle';
import SettingsPanel from '@/components/SettingsPanel';
import { GazeProvider } from '@/context/GazeContext';
import { useGaze } from '@/context/GazeContext';
import { useState } from 'react';

function MainContent() {
  const [showSettings, setShowSettings] = useState(false);
  const { dwellTime } = useGaze();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-4">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GazeType
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Eye-gaze powered communication assistant
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700"
            >
              ⚙️ Settings
            </button>
            <DarkModeToggle />
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-6">
            <SettingsPanel onClose={() => setShowSettings(false)} />
          </div>
        )}

        {/* Main Content - Optimized Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Camera & Gaze Tracking */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-lg">📹</span>
                Camera Feed
              </h2>
              <CameraFeed />
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Center your face in the frame
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Ensure good lighting
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Keep head steady for best results
                </p>
              </div>
            </div>

            <GazeTracker />
          </div>

          {/* Right Side - Text Output & Keyboard */}
          <div className="space-y-6">
            {/* Text Output */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 min-h-[300px]">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-lg">📝</span>
                Typed Text
              </h2>
              <TextOutput />
            </div>

            {/* Virtual Keyboard */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-lg">⌨️</span>
                Virtual Keyboard
              </h2>
              <Keyboard />
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <p className="font-medium mb-1">How to use:</p>
                <p>Look at a key and hold your gaze for {dwellTime/1000} second{dwellTime > 1000 ? 's' : ''} to select it</p>
                <div className="mt-2 flex justify-center gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Gazing
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Selecting
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Built with Next.js, TypeScript, Tailwind CSS, and ONNX Runtime</p>
          <p className="mt-1">Face detection powered by OpenCV YuNet</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <GazeProvider>
      <MainContent />
    </GazeProvider>
  );
}
