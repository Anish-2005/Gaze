import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'gaze_tracking_lib'))

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
import base64
import asyncio
from typing import Dict, List
import logging
from gaze_tracking import GazeTracking

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

# Global variables for gaze tracking
gaze_tracker = None

@app.on_event("startup")
async def startup_event():
    """Initialize gaze tracking on startup"""
    global gaze_tracker

    try:
        gaze_tracker = GazeTracking()
        logger.info("Gaze tracking initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize gaze tracking: {e}")

class GazeTracker:
    def __init__(self):
        self.gaze = gaze_tracker

    def track_gaze(self, frame: np.ndarray) -> Dict:
        """Track gaze in the given frame"""
        if self.gaze is None:
            return {"error": "Gaze tracker not initialized"}

        try:
            self.gaze.refresh(frame)

            gaze_data = {
                "horizontal_ratio": self.gaze.horizontal_ratio(),
                "vertical_ratio": self.gaze.vertical_ratio(),
                "is_left": self.gaze.is_left(),
                "is_right": self.gaze.is_right(),
                "is_center": self.gaze.is_center(),
                "is_blinking": self.gaze.is_blinking(),
                "pupil_left_coords": self.gaze.pupil_left_coords(),
                "pupil_right_coords": self.gaze.pupil_right_coords(),
            }

            return gaze_data

        except Exception as e:
            logger.error(f"Error in gaze tracking: {e}")
            return {"error": str(e)}

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
gaze_tracker_instance = GazeTracker()

@app.websocket("/ws/gaze-tracking/{client_id}")
async def gaze_tracking_websocket(websocket: WebSocket, client_id: str):
    """WebSocket endpoint for real-time gaze tracking"""
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

                    # Track gaze
                    gaze_data = gaze_tracker_instance.track_gaze(frame)

                    # Send gaze tracking results back to client
                    await manager.send_personal_message({
                        "type": "gaze_result",
                        "gaze": gaze_data,
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
        "message": "Gaze Tracking Backend with GazeTracking Library",
        "gaze_tracker_loaded": gaze_tracker is not None
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "gaze_tracking_status": "loaded" if gaze_tracker else "failed",
        "active_connections": len(manager.active_connections)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)