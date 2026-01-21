'use client';

import { useState, useEffect, useRef } from 'react';
import EyeTracker from '@/components/EyeTracker';
import Keyboard from '@/components/Keyboard';
import TextDisplay from '@/components/TextDisplay';
import Calibration from '@/components/Calibration';
import Cursor from '@/components/Cursor';
import QuickPhrases from '@/components/QuickPhrases';

export default function Home() {
  const [text, setText] = useState('');
  const [rawGaze, setRawGaze] = useState({ x: 0.5, y: 0.5 });
  const [dwellTime, setDwellTime] = useState(800); // ms
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [mapping, setMapping] = useState<{ mapX: (x: number) => number; mapY: (y: number) => number } | null>(null);
  const [isCaregiverMode, setIsCaregiverMode] = useState(false);
  const smoothedGazeRef = useRef({ x: 0.5, y: 0.5 });
  const alpha = 0.3;

  useEffect(() => {
    smoothedGazeRef.current = {
      x: alpha * rawGaze.x + (1 - alpha) * smoothedGazeRef.current.x,
      y: alpha * rawGaze.y + (1 - alpha) * smoothedGazeRef.current.y,
    };
  }, [rawGaze, alpha]);

  const smoothedGaze = smoothedGazeRef.current;

  const mappedGaze = mapping ? {
    x: mapping.mapX(smoothedGaze.x),
    y: mapping.mapY(smoothedGaze.y),
  } : { x: 0.5, y: 0.5 };

  const handleLetter = (letter: string) => {
    if (letter === ' ') {
      setText(prev => prev + ' ');
    } else if (letter === 'backspace') {
      setText(prev => prev.slice(0, -1));
    } else {
      setText(prev => prev + letter);
    }
  };

  const handleCalibrated = (newMapping: any) => {
    setMapping(newMapping);
    setIsCalibrating(false);
  };

  const handleBlink = () => {
    const x = mappedGaze.x * window.innerWidth;
    const y = mappedGaze.y * window.innerHeight;
    const element = document.elementFromPoint(x, y);
    if (element && element instanceof HTMLElement) {
      element.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TextDisplay text={text} onSpeak={() => {}} onClear={() => setText('')} />
      <EyeTracker onGaze={(x, y) => setRawGaze({ x, y })} onBlink={handleBlink} />
      {mapping && <Cursor x={mappedGaze.x} y={mappedGaze.y} />}
      <Keyboard gazeX={mappedGaze.x} gazeY={mappedGaze.y} onLetter={handleLetter} dwellTime={dwellTime} />
      {isCalibrating && (
        <Calibration
          onCalibrated={handleCalibrated}
          gazeX={smoothedGaze.x}
          gazeY={smoothedGaze.y}
          dwellTime={dwellTime}
        />
      )}
      <div className="fixed bottom-4 left-4 flex gap-4">
        <button
          onClick={() => setIsCalibrating(true)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Calibrate
        </button>
        <label>
          Dwell Time: {dwellTime}ms
          <input
            type="range"
            min="300"
            max="2000"
            value={dwellTime}
            onChange={(e) => setDwellTime(Number(e.target.value))}
            className="ml-2"
          />
        </label>
      </div>
    </div>
  );
}
