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
  const [processingFPS, setProcessingFPS] = useState(0);
  const [lastFrameTime, setLastFrameTime] = useState(Date.now());
  const [windowWidth, setWindowWidth] = useState(1920); // Default fallback
  const [windowHeight, setWindowHeight] = useState(1080); // Default fallback

  // Set window size after mount to avoid SSR issues
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    // Set initial size
    updateWindowSize();

    // Add resize listener
    window.addEventListener('resize', updateWindowSize);

    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  const performanceHistoryRef = useRef<number[]>([]);
  const currentFPSRef = useRef(0);

  // Update FPS ref whenever processingFPS changes
  useEffect(() => {
    currentFPSRef.current = processingFPS;
  }, [processingFPS]);

  // Track performance over time (update every second to avoid infinite loops)
  useEffect(() => {
    const interval = setInterval(() => {
      const currentFPS = currentFPSRef.current;
      if (currentFPS > 0) {
        const newHistory = [...performanceHistoryRef.current, currentFPS].slice(-10);
        setPerformanceHistory(newHistory);
        setAverageFPS(Math.round(newHistory.reduce((a, b) => a + b, 0) / newHistory.length));
        performanceHistoryRef.current = newHistory;
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []); // Empty dependency array - only run once

  // Calculate gaze stability (how much the gaze position changes)
  const [gazeStability, setGazeStability] = useState(0);
  const [lastGazePos, setLastGazePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const distance = Math.sqrt(
      Math.pow(gazeX - lastGazePos.x, 2) + Math.pow(gazeY - lastGazePos.y, 2)
    );
    setGazeStability(Math.max(0, 100 - distance)); // Higher stability = less movement
    setLastGazePos({ x: gazeX, y: gazeY });
  }, [gazeX, gazeY]);

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

        // Create session with reduced logging to suppress CPU warnings
        // logSeverityLevel: 3 = only show errors and fatal messages (suppresses warnings)
        const sessionOptions = {
          logSeverityLevel: 3, // 0=verbose, 1=info, 2=warning, 3=error, 4=fatal
          logVerbosityLevel: 0, // 0=verbose, higher numbers reduce verbosity
        };

        sessionRef.current = await ort.InferenceSession.create(new Uint8Array(modelData), sessionOptions);

        setIsModelLoading(false);
        console.log('Face detection model loaded successfully');
      } catch (error) {
        setIsModelLoading(false);
        setModelError('Failed to load face detection model');
        console.error('Failed to load model:', error);
        // Fallback to mouse simulation if model fails
        console.log('Falling back to mouse-based gaze tracking');
        setGazePosition(windowWidth / 2, windowHeight / 2);
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
          const screenX = bestFace.x * windowWidth;
          const screenY = bestFace.y * windowHeight;

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
  }, [isTracking, setGazePosition, lastFrameTime, windowWidth, windowHeight]);

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

      {/* Advanced Metrics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Face Detection Panel */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-2xl">👤</span>
              Face Detection
            </h4>
            {faceDetection && (
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/20 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-800 dark:text-green-200">Detected</span>
              </div>
            )}
          </div>

          {faceDetection ? (
            <div className="space-y-6">
              {/* Primary Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide font-semibold">Position</div>
                  <div className="font-mono text-lg font-bold text-blue-900 dark:text-blue-100 mt-1">
                    X: {(faceDetection.x * 100).toFixed(1)}%<br/>
                    Y: {(faceDetection.y * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                  <div className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wide font-semibold">Size</div>
                  <div className="font-mono text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">
                    W: {(faceDetection.width * 100).toFixed(1)}%<br/>
                    H: {(faceDetection.height * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wide font-semibold">Stability</div>
                  <div className="font-mono text-lg font-bold text-emerald-900 dark:text-emerald-100 mt-1">
                    {gazeStability.toFixed(0)}%
                  </div>
                  <div className="w-full bg-emerald-200 dark:bg-emerald-700 rounded-full h-1 mt-2">
                    <div
                      className="bg-emerald-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${gazeStability}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Confidence Meter */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Detection Confidence</div>
                  <div className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                    {(faceDetection.confidence * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-600 h-3 rounded-full transition-all duration-500 ease-out relative"
                    style={{ width: `${faceDetection.confidence * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="relative mb-4">
                <div className="text-6xl animate-bounce">👀</div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">
                {isTracking ? 'Scanning for face...' : 'Camera inactive'}
              </div>
              <div className="text-gray-400 dark:text-gray-500 text-sm mb-4">
                Position yourself in front of the camera
              </div>
              <div className="flex justify-center">
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full w-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* System Performance Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h4 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            Performance
          </h4>

          <div className="space-y-4">
            {/* FPS with Trend */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">Processing Speed</span>
                <span className="text-xs text-blue-600 dark:text-blue-400">FPS</span>
              </div>
              <div className="font-mono text-2xl font-bold text-blue-900 dark:text-blue-100">
                {processingFPS}
              </div>
              <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                Avg: {averageFPS} fps
              </div>
            </div>

            {/* System Status Grid */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Model Status</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    sessionRef.current && !isModelLoading ? 'bg-green-500' : isModelLoading ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
                  }`}></div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {sessionRef.current && !isModelLoading ? 'Loaded' : isModelLoading ? 'Loading' : 'Error'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Tracking Mode</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isTracking ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {isTracking ? 'Active' : 'Paused'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Face Lock</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${faceDetection ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {faceDetection ? 'Locked' : 'Searching'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Gaze Visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-2xl">📍</span>
            Gaze Position & Tracking
          </h4>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Screen coordinates: ({Math.round(gazeX)}, {Math.round(gazeY)})
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visual Tracking Area */}
          <div className="relative">
            <div className="relative w-full h-48 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-700 dark:to-gray-600 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-500">
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/3 w-px h-full bg-gray-400 dark:bg-gray-500"></div>
                <div className="absolute top-0 right-1/3 w-px h-full bg-gray-400 dark:bg-gray-500"></div>
                <div className="absolute left-0 top-1/3 h-px w-full bg-gray-400 dark:bg-gray-500"></div>
                <div className="absolute left-0 bottom-1/3 h-px w-full bg-gray-400 dark:bg-gray-500"></div>
              </div>

              {/* Center crosshair */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 border-2 border-gray-400 dark:border-gray-500 rounded-full opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>

              {/* Current gaze point */}
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
                style={{
                  left: `${(gazeX / windowWidth) * 100}%`,
                  top: `${(gazeY / windowHeight) * 100}%`,
                }}
              >
                <div className="relative">
                  <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg animate-pulse"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>

              {/* Face detection indicator */}
              {faceDetection && (
                <div
                  className="absolute border-2 border-green-500 rounded-lg transition-all duration-300"
                  style={{
                    left: `${faceDetection.x * 100}%`,
                    top: `${faceDetection.y * 100}%`,
                    width: `${faceDetection.width * 100}%`,
                    height: `${faceDetection.height * 100}%`,
                  }}
                >
                  <div className="absolute -top-6 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-lg">
                    Face Detected
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
              Live gaze tracking visualization
            </div>
          </div>

          {/* Tracking Statistics */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
              <div className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">Tracking Quality</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-700 dark:text-green-300">Stability</span>
                  <span className="font-mono font-bold text-green-900 dark:text-green-100">{gazeStability.toFixed(0)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700 dark:text-green-300">Confidence</span>
                  <span className="font-mono font-bold text-green-900 dark:text-green-100">
                    {faceDetection ? (faceDetection.confidence * 100).toFixed(0) : 0}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
              <div className="text-sm font-semibold text-purple-800 dark:text-purple-200 mb-2">Performance Metrics</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-700 dark:text-purple-300">Current FPS</span>
                  <span className="font-mono font-bold text-purple-900 dark:text-purple-100">{processingFPS}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-purple-700 dark:text-purple-300">Average FPS</span>
                  <span className="font-mono font-bold text-purple-900 dark:text-purple-100">{averageFPS}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-purple-700 dark:text-purple-300">Samples</span>
                  <span className="font-mono font-bold text-purple-900 dark:text-purple-100">{performanceHistory.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
