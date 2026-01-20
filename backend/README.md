# Gaze Tracking Backend

Python backend for real-time face detection and gaze tracking using OpenCV and FastAPI.

## Features

- **Real-time face detection** using OpenCV Haar cascades
- **Eye detection** within detected faces
- **WebSocket communication** with Next.js frontend
- **FastAPI** for high-performance async processing
- **CORS enabled** for frontend communication

## Setup

1. **Install Python dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Run the backend:**
   ```bash
   python main.py
   ```

   The backend will start on `http://localhost:8000`

3. **Health check:**
   Visit `http://localhost:8000/health` to verify the backend is running

## API Endpoints

- `GET /` - Health check and status
- `GET /health` - Detailed health information
- `WebSocket /ws/face-detection/{client_id}` - Real-time face detection

## WebSocket Protocol

### Client → Server
```json
{
  "type": "frame",
  "image": "data:image/jpeg;base64,...",
  "timestamp": 1234567890
}
```

### Server → Client
```json
{
  "type": "detection_result",
  "faces": [
    {
      "x": 0.3,
      "y": 0.2,
      "width": 0.2,
      "height": 0.3,
      "confidence": 0.85,
      "eyes": [
        {"x": 0.35, "y": 0.25, "width": 0.03, "height": 0.02},
        {"x": 0.42, "y": 0.25, "width": 0.03, "height": 0.02}
      ]
    }
  ],
  "timestamp": 1234567890
}
```

## Dependencies

- **OpenCV** - Computer vision and face detection
- **FastAPI** - Modern async web framework
- **Uvicorn** - ASGI server
- **NumPy** - Numerical computing

## Troubleshooting

1. **OpenCV not installed:** `pip install opencv-python`
2. **Camera permissions:** Ensure browser has camera access
3. **Port conflicts:** Change port in `main.py` if 8000 is in use
4. **CORS issues:** Check that frontend URL is in allowed origins

## Architecture

```
Frontend (Next.js) ↔ WebSocket ↔ Backend (FastAPI + OpenCV)
      ↓
   Camera Feed
      ↓
Face Detection → Gaze Estimation → Screen Coordinates
```