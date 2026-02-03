'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface GazePoint {
  x: number
  y: number
  timestamp: number
}

interface EyeTrackingState {
  gazePoint: GazePoint
  isTracking: boolean
  cameraReady: boolean
  error: string | null
  confidence: number
}

// MediaPipe Face Mesh landmark indices
const LANDMARKS = {
  // Left eye corners
  LEFT_EYE_OUTER: 33,
  LEFT_EYE_INNER: 133,
  LEFT_EYE_TOP: 159,
  LEFT_EYE_BOTTOM: 145,
  // Right eye corners
  RIGHT_EYE_OUTER: 362,
  RIGHT_EYE_INNER: 263,
  RIGHT_EYE_TOP: 386,
  RIGHT_EYE_BOTTOM: 374,
  // Iris centers (refined model)
  LEFT_IRIS_CENTER: 468,
  RIGHT_IRIS_CENTER: 473,
}

// Smoothing factor for gaze (0-1, higher = smoother but more lag)
const SMOOTHING_FACTOR = 0.3

export function useEyeTracking() {
  const [state, setState] = useState<EyeTrackingState>({
    gazePoint: { x: 50, y: 50, timestamp: Date.now() },
    isTracking: false,
    cameraReady: false,
    error: null,
    confidence: 0,
  })

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const faceMeshRef = useRef<any>(null)
  const cameraRef = useRef<any>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lastGazeRef = useRef({ x: 50, y: 50 })
  const isInitializedRef = useRef(false)
  const isTrackingRef = useRef(false)

  // Calculate gaze position from eye landmarks
  const calculateGaze = useCallback((landmarks: any[]) => {
    try {
      // Get left eye landmarks
      const leftOuter = landmarks[LANDMARKS.LEFT_EYE_OUTER]
      const leftInner = landmarks[LANDMARKS.LEFT_EYE_INNER]
      const leftTop = landmarks[LANDMARKS.LEFT_EYE_TOP]
      const leftBottom = landmarks[LANDMARKS.LEFT_EYE_BOTTOM]
      const leftIris = landmarks[LANDMARKS.LEFT_IRIS_CENTER]

      // Get right eye landmarks
      const rightOuter = landmarks[LANDMARKS.RIGHT_EYE_OUTER]
      const rightInner = landmarks[LANDMARKS.RIGHT_EYE_INNER]
      const rightTop = landmarks[LANDMARKS.RIGHT_EYE_TOP]
      const rightBottom = landmarks[LANDMARKS.RIGHT_EYE_BOTTOM]
      const rightIris = landmarks[LANDMARKS.RIGHT_IRIS_CENTER]

      // Calculate horizontal gaze ratio for each eye (0 = looking left, 1 = looking right)
      const leftEyeWidth = Math.abs(leftInner.x - leftOuter.x)
      const rightEyeWidth = Math.abs(rightInner.x - rightOuter.x)

      const leftHorizRatio = (leftIris.x - leftOuter.x) / leftEyeWidth
      const rightHorizRatio = (rightIris.x - rightOuter.x) / rightEyeWidth

      // Calculate vertical gaze ratio for each eye (0 = looking up, 1 = looking down)
      const leftEyeHeight = Math.abs(leftBottom.y - leftTop.y)
      const rightEyeHeight = Math.abs(rightBottom.y - rightTop.y)

      const leftVertRatio = (leftIris.y - leftTop.y) / leftEyeHeight
      const rightVertRatio = (rightIris.y - rightTop.y) / rightEyeHeight

      // Average both eyes for more stable tracking
      const horizRatio = (leftHorizRatio + rightHorizRatio) / 2
      const vertRatio = (leftVertRatio + rightVertRatio) / 2

      // Map to screen coordinates (0-100)
      // Invert X because camera is mirrored, and adjust ranges for natural mapping
      // The ratios are typically between 0.3-0.7, so we expand this range
      const rawX = 100 - ((horizRatio - 0.3) / 0.4) * 100
      const rawY = ((vertRatio - 0.35) / 0.3) * 100

      // Clamp values to 0-100
      const clampedX = Math.max(0, Math.min(100, rawX))
      const clampedY = Math.max(0, Math.min(100, rawY))

      // Apply smoothing
      const smoothedX = lastGazeRef.current.x + (clampedX - lastGazeRef.current.x) * SMOOTHING_FACTOR
      const smoothedY = lastGazeRef.current.y + (clampedY - lastGazeRef.current.y) * SMOOTHING_FACTOR

      lastGazeRef.current = { x: smoothedX, y: smoothedY }

      // Calculate confidence based on eye openness
      const leftOpenness = leftEyeHeight / leftEyeWidth
      const rightOpenness = rightEyeHeight / rightEyeWidth
      const avgOpenness = (leftOpenness + rightOpenness) / 2
      const confidence = Math.min(1, avgOpenness * 4) // Normalize to 0-1

      return {
        x: smoothedX,
        y: smoothedY,
        confidence,
      }
    } catch {
      return null
    }
  }, [])

  // Initialize MediaPipe Face Mesh
  const initializeFaceMesh = useCallback(async () => {
    if (isInitializedRef.current) return

    try {
      // Dynamic imports for MediaPipe (they require browser environment)
      const { FaceMesh } = await import('@mediapipe/face_mesh')
      const { Camera } = await import('@mediapipe/camera_utils')

      // Create video element for camera feed
      const video = document.createElement('video')
      video.setAttribute('playsinline', '')
      video.style.display = 'none'
      document.body.appendChild(video)
      videoRef.current = video

      // Create canvas for processing
      const canvas = document.createElement('canvas')
      canvas.width = 640
      canvas.height = 480
      canvas.style.display = 'none'
      document.body.appendChild(canvas)
      canvasRef.current = canvas

      // Initialize Face Mesh
      const faceMesh = new FaceMesh({
        locateFile: (file: string) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
        },
      })

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true, // Required for iris tracking
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      })

      faceMesh.onResults((results: any) => {
        if (!isTrackingRef.current) return

        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
          const landmarks = results.multiFaceLandmarks[0]
          const gaze = calculateGaze(landmarks)

          if (gaze) {
            setState(prev => ({
              ...prev,
              gazePoint: {
                x: gaze.x,
                y: gaze.y,
                timestamp: Date.now(),
              },
              confidence: gaze.confidence,
              error: null,
            }))
          }
        }
      })

      await faceMesh.initialize()
      faceMeshRef.current = faceMesh

      // Initialize camera
      const camera = new Camera(video, {
        onFrame: async () => {
          if (faceMeshRef.current && isTrackingRef.current) {
            await faceMeshRef.current.send({ image: video })
          }
        },
        width: 640,
        height: 480,
      })

      cameraRef.current = camera

      isInitializedRef.current = true
      setState(prev => ({ ...prev, cameraReady: true, error: null }))

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize eye tracking'
      setState(prev => ({ ...prev, error: errorMessage, cameraReady: false }))
    }
  }, [calculateGaze])

  // Start tracking
  const startTracking = useCallback(async () => {
    try {
      if (!isInitializedRef.current) {
        await initializeFaceMesh()
      }

      if (cameraRef.current) {
        await cameraRef.current.start()
        isTrackingRef.current = true
        setState(prev => ({ ...prev, isTracking: true, error: null }))
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start camera'
      
      // Check for permission denied
      if (errorMessage.includes('Permission') || errorMessage.includes('NotAllowed')) {
        setState(prev => ({ 
          ...prev, 
          error: 'Camera permission denied. Please allow camera access to use eye tracking.',
          isTracking: false,
        }))
      } else {
        setState(prev => ({ ...prev, error: errorMessage, isTracking: false }))
      }
    }
  }, [initializeFaceMesh])

  // Stop tracking
  const stopTracking = useCallback(() => {
    isTrackingRef.current = false
    
    if (cameraRef.current) {
      cameraRef.current.stop()
    }

    setState(prev => ({ ...prev, isTracking: false }))
  }, [])

  // Toggle tracking
  const toggleTracking = useCallback(() => {
    if (isTrackingRef.current) {
      stopTracking()
    } else {
      startTracking()
    }
  }, [startTracking, stopTracking])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      if (cameraRef.current) {
        cameraRef.current.stop()
      }

      if (videoRef.current) {
        videoRef.current.remove()
      }

      if (canvasRef.current) {
        canvasRef.current.remove()
      }
    }
  }, [])

  return {
    ...state,
    startTracking,
    stopTracking,
    toggleTracking,
    setGazePoint: (x: number, y: number) => {
      lastGazeRef.current = { x, y }
      setState(prev => ({
        ...prev,
        gazePoint: { x, y, timestamp: Date.now() },
      }))
    },
  }
}
