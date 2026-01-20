"use client";

import React, { useEffect, useRef, useState } from "react";
import "@mediapipe/face_mesh";
import "@mediapipe/camera_utils";
import { useGaze } from "@/context/GazeContext";

interface FaceDetection {
  x: number;
  y: number;
  confidence: number;
}

const GazeTracker: React.FC = () => {
  const { gazeX, gazeY, setGazePosition, isTracking } = useGaze();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [faceDetection, setFaceDetection] = useState<FaceDetection | null>(null);
  const [windowWidth, setWindowWidth] = useState(1920);
  const [windowHeight, setWindowHeight] = useState(1080);

  /* ================================
     CORE REFS
  ================================= */
  const neutralEyeRef = useRef<{ x: number; y: number } | null>(null);
  const lastFrameTimeRef = useRef<number>(performance.now());
  const gazeHistoryRef = useRef<{ x: number; y: number }[]>([]);

  /* ================================
     PARAMETERS (TUNE THESE)
  ================================= */
  const GAIN = 2800;        // speed
  const DEAD_ZONE = 0.012;  // jitter removal
  const MAX_SPEED = 45;     // px per frame
  const SMOOTHING = 5;

  /* ================================
     RELATIVE GAZE (THE FIX)
  ================================= */
  const applyRelativeGaze = (iris: { x: number; y: number }) => {
    if (!neutralEyeRef.current) {
      return { x: gazeX, y: gazeY };
    }

    let dx = iris.x - neutralEyeRef.current.x;
    let dy = iris.y - neutralEyeRef.current.y;

    if (Math.abs(dx) < DEAD_ZONE) dx = 0;
    if (Math.abs(dy) < DEAD_ZONE) dy = 0;

    let vx = dx * GAIN;
    let vy = dy * GAIN;

    vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, vx));
    vy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, vy));

    const now = performance.now();
    const dt = Math.min(32, now - lastFrameTimeRef.current);
    lastFrameTimeRef.current = now;

    vx *= dt / 16;
    vy *= dt / 16;

    return {
      x: Math.max(0, Math.min(windowWidth, gazeX + vx)),
      y: Math.max(0, Math.min(windowHeight, gazeY + vy)),
    };
  };

  /* ================================
     SMOOTHING
  ================================= */
  const smoothGaze = (x: number, y: number) => {
    gazeHistoryRef.current.push({ x, y });
    if (gazeHistoryRef.current.length > SMOOTHING) {
      gazeHistoryRef.current.shift();
    }

    const avg = gazeHistoryRef.current.reduce(
      (a, v) => ({ x: a.x + v.x, y: a.y + v.y }),
      { x: 0, y: 0 }
    );

    const n = gazeHistoryRef.current.length;
    return { x: avg.x / n, y: avg.y / n };
  };

  /* ================================
     MEDIAPIPE SETUP
  ================================= */
  useEffect(() => {
    let running = true;
    let camera: any;

    const load = async () => {
      const { FaceMesh } = await import("@mediapipe/face_mesh");
      const { Camera } = await import("@mediapipe/camera_utils");

      const faceMesh = new FaceMesh({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults((results: any) => {
        if (!running) return;
        if (!results.multiFaceLandmarks?.length) return;

        const lm = results.multiFaceLandmarks[0];
        const left = lm[468];
        const right = lm[473];

        const irisX = (left.x + right.x) / 2;
        const irisY = (left.y + right.y) / 2;

        setFaceDetection({ x: irisX, y: irisY, confidence: 1 });

        // AUTO-SET NEUTRAL ON FIRST DETECTION
        if (!neutralEyeRef.current) {
          neutralEyeRef.current = { x: irisX, y: irisY };
        }

        const next = applyRelativeGaze({ x: irisX, y: irisY });
        const smooth = smoothGaze(next.x, next.y);
        setGazePosition(smooth.x, smooth.y);
      });

      if (videoRef.current) {
        camera = new Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current) {
              await faceMesh.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }
    };

    load();

    return () => {
      running = false;
      if (camera) camera.stop();
    };
  }, []);

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
        <button
          onClick={() => {
            if (faceDetection) {
              neutralEyeRef.current = {
                x: faceDetection.x,
                y: faceDetection.y,
              };
            }
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold"
        >
          Recenter Eyes
        </button>

        <div className="text-sm text-gray-600 dark:text-gray-300">
          {faceDetection ? "👁️ Tracking Active" : "Searching for face…"}
        </div>
      </div>

      {/* DEBUG CURSOR */}
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
    </div>
  );
};

export default GazeTracker;
