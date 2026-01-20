'use client';

import React, { useEffect, useRef } from 'react';
import { useGaze } from '@/context/GazeContext';
import * as ort from 'onnxruntime-web';

const GazeTracker: React.FC = () => {
  const { gazeX, gazeY, setGazePosition, isTracking } = useGaze();
  const sessionRef = useRef<ort.InferenceSession | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        // Load YOLOv8 face detection model
        // Model expects 640x640 input
        const modelUrl = 'https://huggingface.co/derronqi/yolov8-face/resolve/main/yolov8n-face.onnx';
        const dataUrl = modelUrl + '.data';

        // Fetch model
        const modelResponse = await fetch(modelUrl);
        const modelData = await modelResponse.arrayBuffer();

        sessionRef.current = await ort.InferenceSession.create(modelData);

        console.log('Model loaded successfully');
      } catch (error) {
        console.error('Failed to load model:', error);
        // Fallback to mouse simulation if model fails
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

      // Preprocess for model (resize to 640x640)
      const inputWidth = 640;
      const inputHeight = 640;
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
        const feeds = { images: tensor }; // YOLOv8 uses 'images' as input name
        const results = await sessionRef.current.run(feeds);

        // Process results (YOLOv8 outputs detections)
        const output = results.output0.data as Float32Array; // [1, 5, 8400]
        const numDetections = 8400;
        const numClasses = 1; // face

        // Find the best face detection
        let bestScore = 0;
        let centerX = 0.5; // default center
        let centerY = 0.5;
        for (let i = 0; i < numDetections; i++) {
          const offset = i * 5;
          const x = output[offset];
          const y = output[offset + 1];
          const w = output[offset + 2];
          const h = output[offset + 3];
          const conf = output[offset + 4];

          if (conf > bestScore && conf > 0.5) { // confidence threshold
            bestScore = conf;
            centerX = x;
            centerY = y;
          }
        }

        if (bestScore > 0) {
          // Map to screen coordinates
          const screenX = centerX * window.innerWidth;
          const screenY = centerY * window.innerHeight;

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