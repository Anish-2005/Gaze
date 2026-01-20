'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useGaze } from '@/context/GazeContext';

const CameraFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setIsTracking } = useGaze();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setIsLoading(false);
            setIsTracking(true);
          };
        }
      } catch (err) {
        setIsLoading(false);
        setError('Camera access denied or unavailable');
        setIsTracking(false);
        console.error('Error accessing camera:', err);
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

  // Simulate face detection status (in real implementation, this would come from ML model)
  useEffect(() => {
    if (!isLoading && !error) {
      const interval = setInterval(() => {
        // Simulate face detection - in real app, this would be based on ML results
        setFaceDetected(Math.random() > 0.3); // 70% chance of "detecting" face
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLoading, error]);

  return (
    <div className="w-full">
      <div className="relative bg-black rounded-lg overflow-hidden shadow-lg">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Initializing camera...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-900">
            <div className="text-center text-white p-4">
              <div className="text-4xl mb-4">📷</div>
              <p className="font-semibold">Camera Error</p>
              <p className="text-sm mt-2">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-white text-red-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-auto ${isLoading || error ? 'invisible' : 'visible'}`}
          style={{ maxHeight: '300px', transform: 'scaleX(-1)' }}
        />

        {/* Face detection overlay */}
        {!isLoading && !error && faceDetected && (
          <div className="absolute inset-0 border-4 border-green-400 rounded-lg animate-pulse">
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
              ✓ Face Detected
            </div>
          </div>
        )}

        {/* Camera controls overlay */}
        <div className="absolute bottom-2 right-2 flex gap-2">
          <div className={`w-3 h-3 rounded-full ${faceDetected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        </div>
      </div>

      {/* Status indicators */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${!error && !isLoading ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-gray-600 dark:text-gray-400">
            {!error && !isLoading ? 'Camera Active' : 'Camera Offline'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${faceDetected ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span className="text-gray-600 dark:text-gray-400">
            {faceDetected ? 'Face Tracked' : 'Searching...'}
          </span>
        </div>
      </div>

      {/* Hidden canvas for processing */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default CameraFeed;