'use client';

import React, { useEffect } from 'react';
import { useGaze } from '@/context/GazeContext';

const GazeTracker: React.FC = () => {
  const { gazeX, gazeY, setGazePosition, isTracking } = useGaze();

  useEffect(() => {
    if (!isTracking) return;

    const handleMouseMove = (event: MouseEvent) => {
      // For MVP, use mouse position as proxy for gaze
      // In real implementation, this would be eye tracking coordinates
      setGazePosition(event.clientX, event.clientY);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Keyboard fallback navigation
      const step = 20; // pixels to move per key press
      switch (event.key) {
        case 'ArrowUp':
          setGazePosition(gazeX, gazeY - step);
          break;
        case 'ArrowDown':
          setGazePosition(gazeX, gazeY + step);
          break;
        case 'ArrowLeft':
          setGazePosition(gazeX - step, gazeY);
          break;
        case 'ArrowRight':
          setGazePosition(gazeX + step, gazeY);
          break;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTracking, setGazePosition, gazeX, gazeY]);

  // TODO: Integrate ONNX Runtime Web for actual eye tracking
  // Load model, process video frames, detect iris position

  return null; // This component doesn't render anything visible
};

export default GazeTracker;