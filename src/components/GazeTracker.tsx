  "use client";

import React, { useEffect, useRef, useState } from 'react';
import '@mediapipe/face_mesh';
import '@mediapipe/camera_utils';
import '@mediapipe/drawing_utils';
import { useGaze } from '@/context/GazeContext';

interface FaceDetection {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
}
 

const GazeTracker: React.FC = () => {
  const { gazeX, gazeY, setGazePosition, isTracking } = useGaze();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(Date.now());

  const [faceDetection, setFaceDetection] = useState<FaceDetection | null>(null);
  const [useMouseFallback, setUseMouseFallback] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1920);
  const [windowHeight, setWindowHeight] = useState(1080);

  // Calibration state
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationStep, setCalibrationStep] = useState(0);
  const [calibrationData, setCalibrationData] = useState<{screen: {x: number, y: number}, face: {x: number, y: number}}[]>([]);
  const [calibrationMap, setCalibrationMap] = useState<{aX: number, bX: number, aY: number, bY: number} | null>(null);

  // Start calibration
  const startCalibration = () => {
    setIsCalibrating(true);
    setCalibrationStep(0);
    setCalibrationData([]);
    setCalibrationMap(null);
  };
 

  // Refs for calibrationMap, windowWidth, windowHeight to use in callback
  const calibrationMapRef = useRef(calibrationMap);
  const windowWidthRef = useRef(windowWidth);
  const windowHeightRef = useRef(windowHeight);

  useEffect(() => { calibrationMapRef.current = calibrationMap; }, [calibrationMap]);
  useEffect(() => { windowWidthRef.current = windowWidth; }, [windowWidth]);
  useEffect(() => { windowHeightRef.current = windowHeight; }, [windowHeight]);

  // MediaPipe Face Mesh setup and iris tracking (run only once on mount)
  useEffect(() => {
    let faceMesh: any;
    let camera: any;
    let running = true;

    async function loadFaceMesh() {
      const { FaceMesh } = await import('@mediapipe/face_mesh');
      const { Camera } = await import('@mediapipe/camera_utils');

      faceMesh = new FaceMesh({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });
      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true, // enables iris landmarks
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults((results: any) => {
        if (!running) return;
        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
          const landmarks = results.multiFaceLandmarks[0];
          // Iris center: left = 468, right = 473 (see MediaPipe docs)
          const leftIris = landmarks[468];
          const rightIris = landmarks[473];
          // Use average of both irises for gaze
          const irisX = (leftIris.x + rightIris.x) / 2;
          const irisY = (leftIris.y + rightIris.y) / 2;
          setFaceDetection({
            x: irisX,
            y: irisY,
            width: 0,
            height: 0,
            confidence: 1,
          });
          // Map and smooth using latest refs
          const mapFaceToScreenRef = (face: {x: number, y: number}) => {
            const map = calibrationMapRef.current;
            const w = windowWidthRef.current;
            const h = windowHeightRef.current;
            if (!map) return { x: face.x * w, y: face.y * h };
            return {
              x: map.aX * face.x + map.bX,
              y: map.aY * face.y + map.bY,
            };
          };
          const mapped = mapFaceToScreenRef({ x: irisX, y: irisY });
          const smoothed = getSmoothedGaze(
            Math.max(0, Math.min(windowWidthRef.current, mapped.x)),
            Math.max(0, Math.min(windowHeightRef.current, mapped.y))
          );
          setGazePosition(smoothed.x, smoothed.y);
        }
      });

      if (videoRef.current) {
        camera = new Camera(videoRef.current, {
          onFrame: async () => {
            await faceMesh.send({ image: videoRef.current });
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }
    }

    loadFaceMesh();

    return () => {
      running = false;
      if (camera) camera.stop();
    };
  }, []);



const CALIBRATION_POINTS = [
  { x: 0.1, y: 0.1 },
  { x: 0.9, y: 0.1 },
  { x: 0.5, y: 0.5 },
  { x: 0.1, y: 0.9 },
  { x: 0.9, y: 0.9 },
];
  // Collect calibration data
  useEffect(() => {
    if (!isCalibrating || calibrationStep >= CALIBRATION_POINTS.length) return;
    if (!faceDetection) return;

    // Wait 1s for user to look at the dot, then record
    const timeout = setTimeout(() => {
      setCalibrationData(prev => [
        ...prev,
        {
          screen: {
            x: CALIBRATION_POINTS[calibrationStep].x * windowWidth,
            y: CALIBRATION_POINTS[calibrationStep].y * windowHeight,
          },
          face: {
            x: faceDetection.x,
            y: faceDetection.y,
          },
        },
      ]);
      setCalibrationStep(step => step + 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [isCalibrating, calibrationStep, faceDetection, windowWidth, windowHeight]);

  // When calibration is done, compute mapping
  useEffect(() => {
    if (isCalibrating && calibrationStep === CALIBRATION_POINTS.length && calibrationData.length === CALIBRATION_POINTS.length) {
      // Simple linear mapping: screen = a * face + b
      // Solve for a, b using least squares for x and y separately
      const n = calibrationData.length;
      let sumFaceX = 0, sumScreenX = 0, sumFaceY = 0, sumScreenY = 0, sumFaceX2 = 0, sumFaceY2 = 0, sumFaceXScreenX = 0, sumFaceYScreenY = 0;
      for (const d of calibrationData) {
        sumFaceX += d.face.x;
        sumScreenX += d.screen.x;
        sumFaceX2 += d.face.x * d.face.x;
        sumFaceXScreenX += d.face.x * d.screen.x;
        sumFaceY += d.face.y;
        sumScreenY += d.screen.y;
        sumFaceY2 += d.face.y * d.face.y;
        sumFaceYScreenY += d.face.y * d.screen.y;
      }
      const aX = (n * sumFaceXScreenX - sumFaceX * sumScreenX) / (n * sumFaceX2 - sumFaceX * sumFaceX);
      const bX = (sumScreenX - aX * sumFaceX) / n;
      const aY = (n * sumFaceYScreenY - sumFaceY * sumScreenY) / (n * sumFaceY2 - sumFaceY * sumFaceY);
      const bY = (sumScreenY - aY * sumFaceY) / n;
      setCalibrationMap({ aX, bX, aY, bY });
      setIsCalibrating(false);
    }
  }, [isCalibrating, calibrationStep, calibrationData]);

  // Use calibration map for gaze mapping
  const mapFaceToScreen = (face: {x: number, y: number}) => {
    if (!calibrationMap) return { x: face.x * windowWidth, y: face.y * windowHeight };
    return {
      x: calibrationMap.aX * face.x + calibrationMap.bX,
      y: calibrationMap.aY * face.y + calibrationMap.bY,
    };
  };

  // Smoothing: moving average for gaze
  const SMOOTHING_WINDOW = 7;
  const gazeHistory = useRef<{x: number, y: number}[]>([]);

  const getSmoothedGaze = (x: number, y: number) => {
    gazeHistory.current.push({ x, y });
    if (gazeHistory.current.length > SMOOTHING_WINDOW) {
      gazeHistory.current.shift();
    }
    const avg = gazeHistory.current.reduce((acc, val) => ({ x: acc.x + val.x, y: acc.y + val.y }), { x: 0, y: 0 });
    const n = gazeHistory.current.length;
    return { x: avg.x / n, y: avg.y / n };
  };

  // Set window size after mount to avoid SSR issues
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  // (Performance metrics removed for simplicity)

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

  // (Removed old backend video/canvas setup and frame capture logic)

  // Mouse fallback for testing gaze tracking
  useEffect(() => {
    if (!isTracking) return;

    let lastMoveTime = Date.now();

    const handleMouseMove = (event: MouseEvent) => {
      // Use mouse position as gaze position for testing
      setGazePosition(event.clientX, event.clientY);
      lastMoveTime = Date.now();

      // Add visual feedback for mouse tracking
      console.log('🎯 Mouse gaze active:', { x: event.clientX, y: event.clientY });
    };

    const handleMouseClick = () => {
      console.log('🖱️ Mouse click detected - use gaze for keyboard interaction');
    };

    // Add mouse tracking indicator
    const handleMouseEnter = () => {
      console.log('🎯 Mouse tracking activated - move cursor to control gaze');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTracking, setGazePosition]);

  return (
    <div className="space-y-6">
      {/* Calibration UI */}
      <div className="mb-4">
        {!calibrationMap && !isCalibrating && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700"
            onClick={startCalibration}
          >
            Start Calibration
          </button>
        )}
        {isCalibrating && calibrationStep < CALIBRATION_POINTS.length && (
          <div className="flex flex-col items-center justify-center">
            <div className="mb-2 text-lg font-semibold">Calibration Step {calibrationStep + 1} / {CALIBRATION_POINTS.length}</div>
            <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg">
              {CALIBRATION_POINTS.map((pt, idx) => (
                <div
                  key={idx}
                  className={`absolute w-8 h-8 rounded-full ${idx === calibrationStep ? 'bg-blue-500 animate-pulse' : 'bg-gray-400 opacity-30'} border-4 border-white`}
                  style={{
                    left: `calc(${pt.x * 100}% - 16px)`,
                    top: `calc(${pt.y * 100}% - 16px)`
                  }}
                />
              ))}
            </div>
            <div className="mt-2 text-gray-600 dark:text-gray-300">Look at the highlighted dot...</div>
          </div>
        )}
        {calibrationMap && (
          <div className="text-green-700 dark:text-green-300 font-semibold">Calibration complete!</div>
        )}
      </div>
      {/* Enhanced Header with Live Status */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 rounded-2xl p-6 border border-blue-100 dark:border-gray-600 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="text-3xl">👁️</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Iris Gaze Tracking
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All inference runs in your browser. No backend required.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Tracking Mode Toggle */}
            <button
              onClick={() => setUseMouseFallback(!useMouseFallback)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                useMouseFallback
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed opacity-50'
              }`}
              disabled={!useMouseFallback}
            >
              {useMouseFallback ? '🐭 Mouse Mode' : '👁️ Iris Mode'}
            </button>
            <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
              <div className={`w-2 h-2 rounded-full ${isTracking && !useMouseFallback && faceDetection ? 'bg-green-500 animate-pulse' : 'bg-yellow-500 animate-pulse'}`}></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {useMouseFallback ? 'Mouse Tracking Active' : (faceDetection ? 'Iris Tracking Active' : 'Searching...')}
              </span>
            </div>
          </div>
        </div>
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

        {/* System Performance Panel removed for simplicity */}
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

              {/* Custom on-screen cursor following gaze */}
              <div
                className="absolute z-50 pointer-events-none"
                style={{
                  left: `${(gazeX / windowWidth) * 100}%`,
                  top: `${(gazeY / windowHeight) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  transition: 'left 0.15s, top 0.15s',
                }}
              >
                <div className="w-8 h-8 rounded-full border-4 border-blue-500 bg-blue-200/60 shadow-lg animate-pulse"></div>
                <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-blue-700 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
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
