'use client';

import React, { useEffect } from 'react';
import { useGaze } from '@/context/GazeContext';

const GazeTracker: React.FC = () => {
  const { setGazePosition, isTracking } = useGaze();

  useEffect(() => {
    if (!isTracking) return;

    const handleMouseMove = (event: MouseEvent) => {
      // For MVP, use mouse position as proxy for gaze
      // In real implementation, this would be eye tracking coordinates
      setGazePosition(event.clientX, event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTracking, setGazePosition]);

  // TODO: Integrate ONNX Runtime Web for actual eye tracking
  // Load model, process video frames, detect iris position

  return null; // This component doesn't render anything visible
};

export default GazeTracker;