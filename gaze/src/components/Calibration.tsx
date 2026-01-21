import { useState, useEffect } from 'react';

interface CalibrationProps {
  onCalibrated: (mapping: any) => void;
  gazeX: number;
  gazeY: number;
  dwellTime: number;
}

const points = [
  { x: 0.1, y: 0.1 }, // top-left
  { x: 0.5, y: 0.1 }, // top-center
  { x: 0.9, y: 0.1 }, // top-right
  { x: 0.1, y: 0.5 }, // middle-left
  { x: 0.5, y: 0.5 }, // center
  { x: 0.9, y: 0.5 }, // middle-right
  { x: 0.1, y: 0.9 }, // bottom-left
  { x: 0.5, y: 0.9 }, // bottom-center
  { x: 0.9, y: 0.9 }, // bottom-right
];

export default function Calibration({ onCalibrated, gazeX, gazeY, dwellTime }: CalibrationProps) {
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [dwellStart, setDwellStart] = useState<number | null>(null);
  const [calibrationData, setCalibrationData] = useState<any[]>([]);

  useEffect(() => {
    if (currentPointIndex >= points.length) {
      // Compute mapping
      const mapping = computeMapping(calibrationData);
      onCalibrated(mapping);
      return;
    }

    const point = points[currentPointIndex];
    const screenX = point.x * window.innerWidth;
    const screenY = point.y * window.innerHeight;

    const gazeScreenX = gazeX * window.innerWidth;
    const gazeScreenY = gazeY * window.innerHeight;

    const distance = Math.sqrt((gazeScreenX - screenX) ** 2 + (gazeScreenY - screenY) ** 2);
    const threshold = 50; // pixels

    if (distance < threshold) {
      if (dwellStart === null) {
        setDwellStart(Date.now());
      } else if (Date.now() - dwellStart > dwellTime) {
        setCalibrationData(prev => [...prev, { screen: point, gaze: { x: gazeX, y: gazeY } }]);
        setCurrentPointIndex(prev => prev + 1);
        setDwellStart(null);
      }
    } else {
      setDwellStart(null);
    }
  }, [gazeX, gazeY, currentPointIndex, dwellStart, dwellTime, onCalibrated, calibrationData]);

  const computeMapping = (data: any[]) => {
    // Simple linear mapping: assume gaze x,y proportional to screen
    const gazeXs = data.map(d => d.gaze.x);
    const screenXs = data.map(d => d.screen.x);
    const gazeYs = data.map(d => d.gaze.y);
    const screenYs = data.map(d => d.screen.y);

    const minGazeX = Math.min(...gazeXs);
    const maxGazeX = Math.max(...gazeXs);
    const minScreenX = Math.min(...screenXs);
    const maxScreenX = Math.max(...screenXs);

    const minGazeY = Math.min(...gazeYs);
    const maxGazeY = Math.max(...gazeYs);
    const minScreenY = Math.min(...screenYs);
    const maxScreenY = Math.max(...screenYs);

    return {
      mapX: (gazeX: number) => ((gazeX - minGazeX) / (maxGazeX - minGazeX)) * (maxScreenX - minScreenX) + minScreenX,
      mapY: (gazeY: number) => ((gazeY - minGazeY) / (maxGazeY - minGazeY)) * (maxScreenY - minScreenY) + minScreenY,
    };
  };

  if (currentPointIndex >= points.length) {
    return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl">Calibration Complete!</div>;
  }

  const point = points[currentPointIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50">
      <div
        className="absolute w-8 h-8 bg-red-500 rounded-full"
        style={{
          left: `${point.x * 100}%`,
          top: `${point.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div className="absolute top-4 left-4 text-white text-xl">
        Look at the red dot and hold your gaze for {dwellTime}ms. Point {currentPointIndex + 1} of {points.length}
      </div>
    </div>
  );
}