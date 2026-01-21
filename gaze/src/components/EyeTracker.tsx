import { useRef, useEffect, useCallback, useState } from 'react';

interface EyeTrackerProps {
  onGaze: (x: number, y: number) => void;
  onBlink: () => void;
  width?: number;
  height?: number;
}

declare global {
  interface Window {
    FaceMesh: any;
    Camera: any;
  }
}

const dist = (p1: any, p2: any) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

export default function EyeTracker({ onGaze, onBlink, width = 640, height = 480 }: EyeTrackerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);

  const onResults = useCallback((results: any) => {
    if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) return;

    const landmarks = results.multiFaceLandmarks[0];

    // Iris landmarks are typically indices 468-477 for left eye, 478-487 for right eye
    // For simplicity, use the center of left iris
    const leftIrisIndices = [468, 469, 470, 471, 472, 473, 474, 475, 476, 477];
    const leftIris = leftIrisIndices.map(i => landmarks[i]);

    const irisCenter = {
      x: leftIris.reduce((sum, p) => sum + p.x, 0) / leftIris.length,
      y: leftIris.reduce((sum, p) => sum + p.y, 0) / leftIris.length,
    };

    // For now, map iris x,y directly to screen coordinates (0-1)
    // In reality, this needs calibration
    onGaze(irisCenter.x, irisCenter.y);

    // Blink detection
    const leftEyeIndices = [33, 160, 158, 133, 153, 144];
    const leftEye = leftEyeIndices.map(i => landmarks[i]);
    const ear = (dist(leftEye[1], leftEye[5]) + dist(leftEye[2], leftEye[4])) / (2 * dist(leftEye[0], leftEye[3]));

    if (ear < 0.25 && !isBlinking) {
      setIsBlinking(true);
      onBlink();
    } else if (ear > 0.3 && isBlinking) {
      setIsBlinking(false);
    }

    // Draw on canvas for debugging
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(results.image, 0, 0, width, height);
        // Draw iris center
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(irisCenter.x * width, irisCenter.y * height, 5, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }, [onGaze, width, height]);

  useEffect(() => {
    const loadScripts = async () => {
      if (window.FaceMesh && window.Camera) return;

      const faceMeshScript = document.createElement('script');
      faceMeshScript.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1634683407/face_mesh.js';
      document.head.appendChild(faceMeshScript);

      const cameraScript = document.createElement('script');
      cameraScript.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3/camera_utils.js';
      document.head.appendChild(cameraScript);

      await new Promise((resolve) => {
        let loaded = 0;
        const checkLoaded = () => {
          loaded++;
          if (loaded === 2) resolve(void 0);
        };
        faceMeshScript.onload = checkLoaded;
        cameraScript.onload = checkLoaded;
      });
    };

    loadScripts().then(() => {
      if (!videoRef.current) return;

      const faceMesh = new window.FaceMesh({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1634683407/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults(onResults);

      const camera = new window.Camera(videoRef.current, {
        onFrame: async () => {
          await faceMesh.send({ image: videoRef.current! });
        },
        width,
        height,
      });

      camera.start();

      return () => {
        camera.stop();
        faceMesh.close();
      };
    });
  }, [onResults, width, height]);

  return (
    <div className="relative">
      <video ref={videoRef} className="hidden" />
      <canvas ref={canvasRef} width={width} height={height} className="border" />
    </div>
  );
}