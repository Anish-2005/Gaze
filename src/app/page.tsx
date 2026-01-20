"use client";
import CameraFeed from '@/components/CameraFeed';
import GazeTracker from '@/components/GazeTracker';
import Keyboard from '@/components/Keyboard';
import TextOutput from '@/components/TextOutput';
import DarkModeToggle from '@/components/DarkModeToggle';
import SettingsPanel from '@/components/SettingsPanel';
import { GazeProvider } from '@/context/GazeContext';
import { useState } from 'react';

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <GazeProvider>
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

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Camera & Controls */}
            <div className="xl:col-span-1 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  📹 Camera Feed
                </h2>
                <CameraFeed />
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <p>• Center your face in the frame</p>
                  <p>• Ensure good lighting</p>
                  <p>• Keep head steady for best results</p>
                </div>
              </div>

              <GazeTracker />

              {/* Status Indicators */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  System Status
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Camera</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Face Detection</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Ready
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Gaze Tracking</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      Calibrated
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Output */}
            <div className="xl:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  📝 Typed Text
                </h2>
                <TextOutput />
              </div>
            </div>

            {/* Keyboard */}
            <div className="xl:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  ⌨️ Virtual Keyboard
                </h2>
                <Keyboard />
                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                  Look at keys and hold gaze for 1 second to select
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
    </GazeProvider>
  );
}
