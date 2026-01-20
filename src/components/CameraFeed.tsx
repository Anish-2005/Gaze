'use client';

import React, { useRef, useEffect } from 'react';
import { useGaze } from '@/context/GazeContext';

const CameraFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setIsTracking } = useGaze();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsTracking(true);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setIsTracking(false);
      }
    };

    startCamera();

    return () => {
      // Cleanup stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [setIsTracking]);

  return (
    <div className="w-full max-w-md mx-auto">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-auto border-2 border-gray-300 rounded-lg"
      />
      <p className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
        Camera feed for eye tracking
      </p>
    </div>
  );
};

export default CameraFeed;