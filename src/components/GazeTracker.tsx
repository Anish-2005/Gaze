'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useGaze } from '@/context/GazeContext';
import * as ort from 'onnxruntime-web';

interface FaceDetection {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
}

const GazeTracker: React.FC = () => {
  const { gazeX, gazeY, setGazePosition, isTracking } = useGaze();
  const sessionRef = useRef<ort.InferenceSession | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const [isModelLoading, setIsModelLoading] = useState(true);
  const [modelError, setModelError] = useState<string | null>(null);
  const [faceDetection, setFaceDetection] = useState<FaceDetection | null>(null);
  const [performanceHistory, setPerformanceHistory] = useState<number[]>([]);
  const [averageFPS, setAverageFPS] = useState(0);

  // Track performance over time
  useEffect(() => {
    if (processingFPS > 0) {
      setPerformanceHistory(prev => {
        const newHistory = [...prev, processingFPS].slice(-10); // Keep last 10 readings
        setAverageFPS(Math.round(newHistory.reduce((a, b) => a + b, 0) / newHistory.length));
        return newHistory;
      });
    }
  }, [processingFPS]);

  // Calculate gaze stability (how much the gaze position changes)
  const [gazeStability, setGazeStability] = useState(0);
  const [lastGazePos, setLastGazePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const distance = Math.sqrt(
      Math.pow(gazeX - lastGazePos.x, 2) + Math.pow(gazeY - lastGazePos.y, 2)
    );
    setGazeStability(Math.max(0, 100 - distance)); // Higher stability = less movement
    setLastGazePos({ x: gazeX, y: gazeY });
  }, [gazeX, gazeY, lastGazePos]);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsModelLoading(true);
        setModelError(null);

        // Load YuNet face detection model from local public folder
        const modelUrl = '/models/face_detection_yunet_2023mar.onnx';

        // Fetch model
        const modelResponse = await fetch(modelUrl);
        const modelData = await modelResponse.arrayBuffer();

        sessionRef.current = await ort.InferenceSession.create(modelData);

        setIsModelLoading(false);
        console.log('Face detection model loaded successfully');
      } catch (error) {
        setIsModelLoading(false);
        setModelError('Failed to load face detection model');
        console.error('Failed to load model:', error);
        // Fallback to mouse simulation if model fails
        console.log('Falling back to mouse-based gaze tracking');
        setGazePosition(window.innerWidth / 2, window.innerHeight / 2);
      }
    };

    loadModel();
  }, [setGazePosition]);

  useEffect(() => {
    if (!isTracking || !sessionRef.current) return;

    // Set up video from camera
    const setupVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    setupVideo();

    const processFrame = async () => {
      if (!videoRef.current || !canvasRef.current || !sessionRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size to video size
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0);

      // Preprocess for model (YuNet expects 160x120)
      const inputWidth = 160;
      const inputHeight = 120;
      const resizedCanvas = document.createElement('canvas');
      resizedCanvas.width = inputWidth;
      resizedCanvas.height = inputHeight;
      const resizedCtx = resizedCanvas.getContext('2d');
      if (!resizedCtx) return;
      resizedCtx.drawImage(canvas, 0, 0, inputWidth, inputHeight);

      // Get image data
      const imageData = resizedCtx.getImageData(0, 0, inputWidth, inputHeight);
      const { data, width, height } = imageData;

      // Convert to tensor (RGB, normalize)
      const inputTensor = new Float32Array(width * height * 3);
      for (let i = 0; i < data.length; i += 4) {
        const idx = (i / 4) * 3;
        inputTensor[idx] = data[i] / 255.0;     // R
        inputTensor[idx + 1] = data[i + 1] / 255.0; // G
        inputTensor[idx + 2] = data[i + 2] / 255.0; // B
      }

      // Create ONNX tensor
      const tensor = new ort.Tensor('float32', inputTensor, [1, 3, height, width]);

      try {
        // Run inference
        const feeds = { input: tensor };
        const results = await sessionRef.current.run(feeds);

        // Process YuNet results
        const loc = results.loc.data as Float32Array; // [num_faces, 4] - x, y, w, h
        const conf = results.conf.data as Float32Array; // [num_faces, 2] - background, face
        const numFaces = loc.length / 4;

        // Find the best face detection
        let bestScore = 0;
        let bestFace: FaceDetection | null = null;

        for (let i = 0; i < numFaces; i++) {
          const faceConf = conf[i * 2 + 1]; // face confidence
          if (faceConf > bestScore && faceConf > 0.5) {
            bestScore = faceConf;
            const x = loc[i * 4];
            const y = loc[i * 4 + 1];
            const w = loc[i * 4 + 2];
            const h = loc[i * 4 + 3];
            bestFace = {
              x: x / inputWidth,
              y: y / inputHeight,
              width: w / inputWidth,
              height: h / inputHeight,
              confidence: faceConf
            };
          }
        }

        setFaceDetection(bestFace);

        if (bestFace) {
          // Map to screen coordinates
          const screenX = bestFace.x * window.innerWidth;
          const screenY = bestFace.y * window.innerHeight;

          setGazePosition(screenX, screenY);
        }

        // Calculate FPS
        const now = Date.now();
        const fps = 1000 / (now - lastFrameTime);
        setProcessingFPS(Math.round(fps));
        setLastFrameTime(now);

      } catch (error) {
        console.error('Inference error:', error);
      }
    };

    const startProcessing = () => {
      const loop = () => {
        processFrame();
        animationRef.current = requestAnimationFrame(loop);
      };
      loop();
    };

    startProcessing();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Cleanup stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isTracking, setGazePosition, lastFrameTime]);

  // Keyboard fallback navigation
  useEffect(() => {
    if (!isTracking) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const step = 20;
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

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTracking, setGazePosition, gazeX, gazeY]);

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Live Status */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 rounded-2xl p-6 border border-blue-100 dark:border-gray-600 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="text-3xl">🤖</span>
              {sessionRef.current && !isModelLoading && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-white dark:border-gray-800"></div>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI Gaze Tracking
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Real-time face detection & eye tracking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
              <div className={`w-2 h-2 rounded-full ${
                sessionRef.current && !isModelLoading && isTracking && faceDetection
                  ? 'bg-green-500 animate-pulse'
                  : sessionRef.current && !isModelLoading && isTracking
                  ? 'bg-yellow-500 animate-pulse'
                  : 'bg-red-500'
              }`}></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {sessionRef.current && !isModelLoading && isTracking && faceDetection
                  ? 'Tracking Active'
                  : sessionRef.current && !isModelLoading && isTracking
                  ? 'Searching...'
                  : 'Inactive'}
              </span>
            </div>

            {/* FPS Counter */}
            <div className="text-right">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">FPS</div>
              <div className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                {processingFPS}
              </div>
            </div>
          </div>
        </div>

        {modelError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-red-500 text-xl">⚠️</span>
              <div>
                <div className="font-semibold text-red-800 dark:text-red-200">Model Loading Error</div>
                <div className="text-sm text-red-700 dark:text-red-300">{modelError}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Face Detection Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-lg">👤</span>
            Face Detection
          </h4>

          {faceDetection ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Position</div>
                  <div className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                    X: {(faceDetection.x * 100).toFixed(1)}%<br/>
                    Y: {(faceDetection.y * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Size</div>
                  <div className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                    W: {(faceDetection.width * 100).toFixed(1)}%<br/>
                    H: {(faceDetection.height * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Confidence</div>
                  <div className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                    {(faceDetection.confidence * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${faceDetection.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">👀</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                {isTracking ? 'Searching for face...' : 'Camera not active'}
              </div>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                <div className="bg-gray-400 h-1 rounded-full w-1/3 animate-pulse"></div>
              </div>
            </div>
          )}
        </div>

        {/* Processing Status Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-lg">⚡</span>
            System Status
          </h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Real-time Tracking</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  sessionRef.current && !isModelLoading && isTracking
                    ? 'bg-green-500 animate-pulse'
                    : 'bg-gray-400'
                }`}></div>
                <span className="text-xs font-medium text-gray-900 dark:text-white">
                  {sessionRef.current && !isModelLoading && isTracking ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Processing FPS</span>
              <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                {processingFPS > 0 ? `${processingFPS} fps` : '--'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Face Detected</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${faceDetection ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-xs font-medium text-gray-900 dark:text-white">
                  {faceDetection ? 'Yes' : 'No'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Gaze Position</span>
              <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                {Math.round(gazeX)}, {Math.round(gazeY)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Visualization */}
      {faceDetection && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-lg">📊</span>
            Gaze Position Visualization
          </h4>

          <div className="relative w-full h-32 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-500">
            {/* Grid lines */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-400 dark:bg-gray-500"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-400 dark:bg-gray-500"></div>
            </div>

            {/* Gaze point */}
            <div
              className="absolute w-6 h-6 border-3 border-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out shadow-lg"
              style={{
                left: `${faceDetection.x * 100}%`,
                top: `${faceDetection.y * 100}%`,
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3), 0 0 0 6px rgba(59, 130, 246, 0.1)'
              }}
            >
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            {/* Center indicator */}
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-gray-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
            Face position relative to camera view
          </div>
        </div>
      )}

      {/* Hidden processing elements */}
      <div className="hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
        />
      </div>
    </div>
  );
};

export default GazeTracker;

      try {
        // Run inference
        const feeds = { input: tensor };
        const results = await sessionRef.current.run(feeds);

        // Process YuNet results
        const loc = results.loc.data as Float32Array; // [num_faces, 4] - x, y, w, h
        const conf = results.conf.data as Float32Array; // [num_faces, 2] - background, face
        const numFaces = loc.length / 4;

        // Find the best face detection
        let bestScore = 0;
        let bestCenterX = 0.5;
        let bestCenterY = 0.5;

        for (let i = 0; i < numFaces; i++) {
          const faceConf = conf[i * 2 + 1]; // face confidence
          if (faceConf > bestScore && faceConf > 0.5) {
            bestScore = faceConf;
            const x = loc[i * 4];
            const y = loc[i * 4 + 1];
            const w = loc[i * 4 + 2];
            const h = loc[i * 4 + 3];
            bestCenterX = (x + w / 2) / inputWidth; // normalize to 0-1
            bestCenterY = (y + h / 2) / inputHeight;
          }
        }

        if (bestScore > 0) {
          // Map to screen coordinates
          const screenX = bestCenterX * window.innerWidth;
          const screenY = bestCenterY * window.innerHeight;

          setGazePosition(screenX, screenY);
        }
      } catch (error) {
        console.error('Inference error:', error);
      }
    };

    const startProcessing = () => {
      const loop = () => {
        processFrame();
        animationRef.current = requestAnimationFrame(loop);
      };
      loop();
    };

    startProcessing();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Cleanup stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isTracking, setGazePosition]);

  // Keyboard fallback navigation
  useEffect(() => {
    if (!isTracking) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const step = 20;
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

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTracking, setGazePosition, gazeX, gazeY]);

  // Hidden video and canvas for processing
  return (
    <>
      <video
        ref={videoRef}
        style={{ display: 'none' }}
        autoPlay
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default GazeTracker;