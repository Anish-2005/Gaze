import CameraFeed from '@/components/CameraFeed';
import GazeTracker from '@/components/GazeTracker';
import Keyboard from '@/components/Keyboard';
import TextOutput from '@/components/TextOutput';
import DarkModeToggle from '@/components/DarkModeToggle';
import { GazeProvider } from '@/context/GazeContext';

export default function Home() {
  return (
    <GazeProvider>
      <DarkModeToggle />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Gaze Typing Assistant
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <CameraFeed />
              <GazeTracker />
            </div>

            <div className="space-y-6">
              <TextOutput />
            </div>
          </div>

          <div className="mt-8">
            <Keyboard />
          </div>
        </div>
      </div>
    </GazeProvider>
  );
}
