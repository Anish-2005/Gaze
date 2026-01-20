# Gaze Typing Assistant

An assistive communication web application that enables eye-gaze-based typing using computer vision and machine learning.

## Features

- **Webcam Integration**: Live video feed with camera permission handling
- **Face Detection**: Real-time face detection using OpenCV and Python backend
- **Eye Detection**: Eye tracking within detected faces for enhanced gaze estimation
- **Gaze Estimation**: Maps detected facial features to screen coordinates
- **On-Screen Keyboard**: Large, high-contrast keys with dwell-time selection
- **Text Output**: Real-time display of typed text
- **Text-to-Speech**: Web Speech API integration for audio playback
- **Dark/Light Mode**: Automatic system preference detection with manual toggle
- **Mouse Fallback**: Mouse control for testing and accessibility
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Camera**: WebRTC API
- **Speech**: Web Speech API
- **Real-time Communication**: WebSocket

### Backend
- **Framework**: FastAPI (Python)
- **Computer Vision**: OpenCV with Haar cascades
- **Real-time Processing**: Async WebSocket communication
- **Face Detection**: Haar cascade classifiers
- **Eye Detection**: Integrated eye tracking

## Getting Started

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Run the Python backend
python main.py

# Or use the convenience script (Windows)
run_backend.bat
```

### 3. Access the Application

1. **Open** [http://localhost:3000](http://localhost:3000) in your browser
2. **Grant camera permission** when prompted
3. **Choose tracking mode**:
   - 🐭 **Mouse Mode**: Use mouse for testing
   - 👁️ **Face Mode**: Requires Python backend running

## Architecture

```
┌─────────────────┐    WebSocket    ┌─────────────────┐
│   Next.js       │◄──────────────►│   FastAPI       │
│   Frontend      │                 │   Backend       │
│                 │                 │                 │
│ • Camera Feed   │                 │ • OpenCV        │
│ • UI Controls   │                 │ • Face Detection│
│ • Text Output   │                 │ • Eye Tracking  │
└─────────────────┘                 └─────────────────┘
         │                                   │
         └───────────── Camera ──────────────┘
```

## API Communication

### WebSocket Protocol
- **Endpoint**: `ws://localhost:8000/ws/face-detection/{client_id}`
- **Frame Rate**: Real-time video processing
- **Data Format**: Base64 encoded JPEG frames
- **Response**: Face detection coordinates and confidence scores

## How to Use

1. **Allow Camera Access**: The app will request permission to use your webcam
2. **Position Yourself**: Center your face in the camera view for face detection
3. **Gaze at Keys**: Look at the on-screen keyboard keys (face center controls gaze)
4. **Dwell to Select**: Hold your gaze on a key for 1 second to type it
5. **Use Special Keys**:
   - **␣ (Space)**: Add space between words
   - **⌫ (Backspace)**: Delete the last character
6. **Speak Text**: Click the "🔊 Speak Text" button to hear your typed text

## Keyboard Navigation Fallback

For users who cannot use gaze tracking:
- Use mouse to click keys directly
- Dark mode toggle in top-right corner

## Architecture

### Components
- `CameraFeed`: Handles webcam access and video display
- `GazeTracker`: Processes video frames with ONNX model for face detection and gaze estimation
- `Keyboard`: On-screen keyboard with dwell-time selection
- `TextOutput`: Displays typed text and TTS controls
- `DarkModeToggle`: Theme switching

### State Management
- `GazeContext`: Centralized state for typed text, gaze position, and tracking status

### Future Enhancements
- Upgrade to eye landmark detection model for more precise gaze tracking
- Add pupil/iris position detection for better accuracy
- Implement head pose estimation
- Add calibration step for personalized gaze mapping
- Word prediction and auto-complete features
- Customizable dwell times and keyboard layouts

## Building for Production

```bash
npm run build
npm start
```

## Contributing

This is an MVP implementation. Key areas for improvement:
- Replace mouse simulation with actual eye-tracking ML model
- Add comprehensive error handling
- Implement keyboard-only navigation
- Add unit tests
- Optimize performance for real-time processing

## License

MIT License
