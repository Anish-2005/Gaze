# Gaze Typing Assistant

An assistive communication web application that enables eye-gaze-based typing using a laptop or phone webcam.

## Features

- **Webcam Integration**: Live video feed with camera permission handling
- **Gaze Tracking**: Eye/iris position detection (currently simulated with mouse for MVP)
- **On-Screen Keyboard**: Large, high-contrast keys with dwell-time selection
- **Text Output**: Real-time display of typed text
- **Text-to-Speech**: Web Speech API integration for audio playback
- **Dark/Light Mode**: Automatic system preference detection with manual toggle
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Camera**: WebRTC API
- **Speech**: Web Speech API
- **Future ML**: ONNX Runtime Web (placeholder ready)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open** [http://localhost:3000](http://localhost:3000) in your browser

4. **Grant camera permission** when prompted

## How to Use

1. **Allow Camera Access**: The app will request permission to use your webcam
2. **Position Yourself**: Center your face in the camera view
3. **Gaze at Keys**: Look at the on-screen keyboard keys
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
- `GazeTracker`: Processes gaze position (mouse simulation for MVP)
- `Keyboard`: On-screen keyboard with dwell-time selection
- `TextOutput`: Displays typed text and TTS controls
- `DarkModeToggle`: Theme switching

### State Management
- `GazeContext`: Centralized state for typed text, gaze position, and tracking status

### Future Enhancements
- Real eye-tracking using ONNX Runtime Web
- Advanced keyboard layouts (numbers, punctuation)
- Word prediction
- Customizable dwell times
- Accessibility improvements

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
