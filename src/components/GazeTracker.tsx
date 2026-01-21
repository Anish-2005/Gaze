"use client";

import React, { useEffect, useRef, useState } from "react";
import { useGaze } from "@/context/GazeContext";

const GazeTracker: React.FC = () => {
  const { gazeX, gazeY, setGazePosition } = useGaze();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1920);
  const [windowHeight, setWindowHeight] = useState(1080);

  /* ================================
     WEBSOCKET CONNECTION
  ================================= */
  useEffect(() => {
    const clientId = `client_${Date.now()}`;
    const ws = new WebSocket(`ws://localhost:8000/ws/gaze-tracking/${clientId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "gaze_result" && data.gaze) {
        const { horizontal_ratio, vertical_ratio } = data.gaze;
        if (horizontal_ratio !== null && vertical_ratio !== null) {
          // Map ratios to screen coordinates
          const x = horizontal_ratio * windowWidth;
          const y = vertical_ratio * windowHeight;
          setGazePosition(x, y);
        }
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [windowWidth, windowHeight, setGazePosition]);

  /* ================================
     VIDEO CAPTURE AND FRAME SENDING
  ================================= */
  useEffect(() => {
    if (!videoRef.current || !isConnected) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sendFrame = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL("image/jpeg", 0.8);
        const message = {
          type: "frame",
          image: imageData,
          timestamp: Date.now(),
        };

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify(message));
        }
      }
    };

    const interval = setInterval(sendFrame, 100); // Send frame every 100ms

    return () => clearInterval(interval);
  }, [isConnected]);

  /* ================================
     CAMERA ACCESS
  ================================= */
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    if (isConnected) {
      startCamera();
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isConnected]);

  /* ================================
     WINDOW SIZE
  ================================= */
  useEffect(() => {
    const update = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ================================
     UI
  ================================= */
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {isConnected ? "🖥️ Backend Connected" : "🔌 Connecting to backend..."}
        </div>
      </div>

      {/* Debug Cursor */}
      <div className="relative w-full h-64 border rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div
          className="absolute w-6 h-6 rounded-full bg-blue-500 shadow-lg"
          style={{
            left: `${(gazeX / windowWidth) * 100}%`,
            top: `${(gazeY / windowHeight) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <video ref={videoRef} autoPlay muted playsInline className="hidden" />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default GazeTracker;
