from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
import base64
import asyncio
from typing import Dict, List
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Gaze Tracking Backend", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for face detection
face_cascade = None
eye_cascade = None

@app.on_event("startup")
async def startup_event():
    """Initialize face detection models on startup"""
    global face_cascade, eye_cascade

    try:
        # Load OpenCV's pre-trained face and eye detection models
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

        if face_cascade.empty():
            logger.error("Failed to load face cascade classifier")
        else:
            logger.info("Face detection model loaded successfully")

        if eye_cascade.empty():
            logger.warning("Failed to load eye cascade classifier")
        else:
            logger.info("Eye detection model loaded successfully")

    except Exception as e:
        logger.error(f"Failed to initialize models: {e}")

class FaceDetector:
    def __init__(self):
        self.face_cascade = face_cascade
        self.eye_cascade = eye_cascade

    def detect_faces(self, frame: np.ndarray) -> List[Dict]:
        """Detect faces in the given frame"""
        if self.face_cascade is None or self.face_cascade.empty():
            return []

        # Convert to grayscale for detection
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detect faces
        faces = self.face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30, 30)
        )

        face_data = []
        for (x, y, w, h) in faces:
            # Calculate relative coordinates (0-1)
            frame_h, frame_w = frame.shape[:2]
            relative_x = x / frame_w
            relative_y = y / frame_h
            relative_w = w / frame_w
            relative_h = h / frame_h

            # Detect eyes within the face region
            face_roi = gray[y:y+h, x:x+w]
            eyes = []
            if self.eye_cascade is not None and not self.eye_cascade.empty():
                detected_eyes = self.eye_cascade.detectMultiScale(face_roi, scaleFactor=1.1, minNeighbors=3)
                for (ex, ey, ew, eh) in detected_eyes[:2]:  # Take max 2 eyes
                    eyes.append({
                        'x': (x + ex) / frame_w,
                        'y': (y + ey) / frame_h,
                        'width': ew / frame_w,
                        'height': eh / frame_h
                    })

            face_data.append({
                'x': relative_x,
                'y': relative_y,
                'width': relative_w,
                'height': relative_h,
                'confidence': 0.8,  # OpenCV doesn't provide confidence scores
                'eyes': eyes
            })

        return face_data

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        self.active_connections[client_id] = websocket
        logger.info(f"Client {client_id} connected. Total connections: {len(self.active_connections)}")

    def disconnect(self, client_id: str):
        if client_id in self.active_connections:
            del self.active_connections[client_id]
            logger.info(f"Client {client_id} disconnected. Total connections: {len(self.active_connections)}")

    async def send_personal_message(self, message: dict, client_id: str):
        if client_id in self.active_connections:
            await self.active_connections[client_id].send_json(message)

manager = ConnectionManager()
face_detector = FaceDetector()

@app.websocket("/ws/face-detection/{client_id}")
async def face_detection_websocket(websocket: WebSocket, client_id: str):
    """WebSocket endpoint for real-time face detection"""
    await manager.connect(websocket, client_id)

    try:
        while True:
            # Receive frame data from client
            data = await websocket.receive_json()

            if data.get("type") == "frame":
                # Decode base64 image
                image_data = data.get("image", "")
                if not image_data:
                    continue

                try:
                    # Remove data URL prefix if present
                    if image_data.startswith("data:image"):
                        image_data = image_data.split(",")[1]

                    # Decode base64 to bytes
                    image_bytes = base64.b64decode(image_data)

                    # Convert to numpy array
                    nparr = np.frombuffer(image_bytes, np.uint8)
                    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

                    if frame is None:
                        continue

                    # Detect faces
                    faces = face_detector.detect_faces(frame)

                    # Send detection results back to client
                    await manager.send_personal_message({
                        "type": "detection_result",
                        "faces": faces,
                        "timestamp": data.get("timestamp")
                    }, client_id)

                except Exception as e:
                    logger.error(f"Error processing frame: {e}")
                    await manager.send_personal_message({
                        "type": "error",
                        "message": f"Frame processing error: {str(e)}"
                    }, client_id)

    except WebSocketDisconnect:
        manager.disconnect(client_id)
    except Exception as e:
        logger.error(f"WebSocket error for client {client_id}: {e}")
        manager.disconnect(client_id)

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "running",
        "message": "Gaze Tracking Backend with OpenCV Face Detection",
        "models_loaded": {
            "face_cascade": face_cascade is not None and not face_cascade.empty(),
            "eye_cascade": eye_cascade is not None and not eye_cascade.empty()
        }
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "opencv_version": cv2.__version__,
        "models_status": {
            "face_detection": "loaded" if (face_cascade and not face_cascade.empty()) else "failed",
            "eye_detection": "loaded" if (eye_cascade and not eye_cascade.empty()) else "failed"
        },
        "active_connections": len(manager.active_connections)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)