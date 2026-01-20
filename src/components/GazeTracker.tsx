'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const websocketRef = useRef<WebSocket | null>(null);
  const animationRef = useRef<number | null>(null);
  const clientIdRef = useRef<string>(`client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const lastFrameTimeRef = useRef<number>(Date.now());

  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [faceDetection, setFaceDetection] = useState<FaceDetection | null>(null);
  const [performanceHistory, setPerformanceHistory] = useState<number[]>([]);
  const [averageFPS, setAverageFPS] = useState(0);
  const [processingFPS, setProcessingFPS] = useState(0);
  const [useMouseFallback, setUseMouseFallback] = useState(true); // Start with mouse for testing - face detection has model issues
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

  // WebSocket connection to Python backend
  useEffect(() => {
    const connectWebSocket = () => {
      try {
        setConnectionError(null);
        const ws = new WebSocket(`ws://localhost:8000/ws/face-detection/${clientIdRef.current}`);

        ws.onopen = () => {
          console.log('Connected to Python face detection backend');
          setIsConnected(true);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.type === 'detection_result' && data.faces && data.faces.length > 0) {
              // Use the first detected face
              const face = data.faces[0];
              setFaceDetection(face);

              // Calculate gaze position based on face center
              const screenX = Math.max(0, Math.min(windowWidth, face.x * windowWidth));
              const screenY = Math.max(0, Math.min(windowHeight, face.y * windowHeight));

              // Add some variation based on face tilt/size (simulating gaze direction)
              const gazeOffsetX = (face.x - 0.5) * 200; // Face tilt affects horizontal gaze
              const gazeOffsetY = (face.y - 0.5) * 150; // Face position affects vertical gaze

              const finalX = Math.max(0, Math.min(windowWidth, screenX + gazeOffsetX));
              const finalY = Math.max(0, Math.min(windowHeight, screenY + gazeOffsetY));

              console.log('Face detected via Python backend:', {
                face,
                screenPos: { x: screenX, y: screenY },
                gazeOffset: { x: gazeOffsetX, y: gazeOffsetY },
                finalGaze: { x: finalX, y: finalY }
              });

              setGazePosition(finalX, finalY);
            } else if (data.type === 'error') {
              console.error('Backend error:', data.message);
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        ws.onclose = () => {
          console.log('Disconnected from Python backend');
          setIsConnected(false);
          setFaceDetection(null);

          // Try to reconnect after 3 seconds
          setTimeout(() => {
            if (!websocketRef.current || websocketRef.current.readyState === WebSocket.CLOSED) {
              console.log('Attempting to reconnect to Python backend...');
              connectWebSocket();
            }
          }, 3000);
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setConnectionError('Failed to connect to face detection backend');
          setIsConnected(false);
        };

        websocketRef.current = ws;
      } catch (error) {
        console.error('Failed to create WebSocket connection:', error);
        setConnectionError('Failed to connect to face detection backend');
      }
    };

    connectWebSocket();

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
        websocketRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isTracking || useMouseFallback || !isConnected || !websocketRef.current) {
      return;
    }

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

    const captureFrame = async () => {
      if (!videoRef.current || !canvasRef.current || !websocketRef.current) {
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx || video.videoWidth === 0 || video.videoHeight === 0) {
        return;
      }

      // Set canvas size to video size
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0);

      try {
        // Convert canvas to base64
        const imageData = canvas.toDataURL('image/jpeg', 0.8);

        // Send frame to Python backend
        websocketRef.current.send(JSON.stringify({
          type: 'frame',
          image: imageData,
          timestamp: Date.now()
        }));

        // Calculate FPS
        const now = Date.now();
        const fps = 1000 / (now - lastFrameTimeRef.current);
        setProcessingFPS(Math.round(fps));
        lastFrameTimeRef.current = now;

      } catch (error) {
        console.error('Error sending frame to backend:', error);
      }
    };

    const startCapture = () => {
      const loop = () => {
        captureFrame();
        animationRef.current = requestAnimationFrame(loop);
      };
      loop();
    };

    startCapture();

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

    const processFrame = async () => {
      if (!videoRef.current || !canvasRef.current || !websocketRef.current) {
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx || video.videoWidth === 0 || video.videoHeight === 0) {
        return;
      }

      // Set canvas size to video size
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0);

      try {
        // Convert canvas to base64
        const imageData = canvas.toDataURL('image/jpeg', 0.8);

        // Send frame to Python backend
        websocketRef.current.send(JSON.stringify({
          type: 'frame',
          image: imageData,
          timestamp: Date.now()
        }));

        // Calculate FPS
        const now = Date.now();
        const fps = 1000 / (now - lastFrameTimeRef.current);
        setProcessingFPS(Math.round(fps));
        lastFrameTimeRef.current = now;

      } catch (error) {
        console.error('Error sending frame to backend:', error);
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
  }, [isTracking, setGazePosition, windowWidth, windowHeight, useMouseFallback]);

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
      {/* Enhanced Header with Live Status */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 rounded-2xl p-6 border border-blue-100 dark:border-gray-600 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="text-3xl">🤖</span>
              {isConnected && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-white dark:border-gray-800"></div>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI Gaze Tracking
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Python backend face detection & eye tracking
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
                  : 'bg-red-500 text-white hover:bg-red-600 cursor-not-allowed opacity-50'
              }`}
              disabled={!useMouseFallback} // Disable face mode button since it's broken
            >
              {useMouseFallback ? '🐭 Mouse Mode' : '👁️ Face Mode (Disabled)'}
            </button>

            {/* Live Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
              <div className={`w-2 h-2 rounded-full ${
                isConnected && isTracking && (!useMouseFallback ? faceDetection : true)
                  ? 'bg-green-500 animate-pulse'
                  : isConnected && isTracking && !useMouseFallback
                  ? 'bg-yellow-500 animate-pulse'
                  : 'bg-red-500'
              }`}></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {useMouseFallback
                  ? 'Mouse Tracking Active'
                  : isConnected
                  ? (faceDetection ? 'Face Tracking Active' : 'Face Searching...')
                  : 'Backend Disconnected'}
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

        {connectionError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-red-500 text-xl">⚠️</span>
              <div>
                <div className="font-semibold text-red-800 dark:text-red-200">Backend Connection Error</div>
                <div className="text-sm text-red-700 dark:text-red-300">{connectionError}</div>
                <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                  Make sure the Python backend is running: <code>cd backend && python main.py</code>
                </div>
              </div>
            </div>
          </div>
        )}

        {!useMouseFallback && !isConnected && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-yellow-500 text-xl">🔌</span>
              <div>
                <div className="font-semibold text-yellow-800 dark:text-yellow-200">Python Backend Required</div>
                <div className="text-sm text-yellow-700 dark:text-yellow-300">
                  Face detection requires the Python backend. Start it with: <code>cd backend && python main.py</code>
                </div>
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
                <span className="text-sm text-gray-600 dark:text-gray-400">Backend Status</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {isConnected ? 'Connected' : 'Disconnected'}
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
