import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GazeState {
  typedText: string;
  gazeX: number;
  gazeY: number;
  isTracking: boolean;
  dwellTime: number;
  voice: string;
  keyboardLayout: string;
}

interface GazeContextType extends GazeState {
  setTypedText: (text: string) => void;
  setGazePosition: (x: number, y: number) => void;
  setIsTracking: (tracking: boolean) => void;
  appendText: (char: string) => void;
  backspace: () => void;
  setDwellTime: (time: number) => void;
  setVoice: (voice: string) => void;
  setKeyboardLayout: (layout: string) => void;
}

const GazeContext = createContext<GazeContextType | undefined>(undefined);

export const useGaze = () => {
  const context = useContext(GazeContext);
  if (!context) {
    throw new Error('useGaze must be used within a GazeProvider');
  }
  return context;
};

interface GazeProviderProps {
  children: ReactNode;
}

export const GazeProvider: React.FC<GazeProviderProps> = ({ children }) => {
  const [typedText, setTypedText] = useState('');
  const [gazeX, setGazeX] = useState(0);
  const [gazeY, setGazeY] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [dwellTime, setDwellTime] = useState(1000);
  const [voice, setVoice] = useState('default');
  const [keyboardLayout, setKeyboardLayout] = useState('qwerty');

  const setGazePosition = (x: number, y: number) => {
    setGazeX(x);
    setGazeY(y);
  };

  const appendText = (char: string) => {
    setTypedText(prev => prev + char);
  };

  const backspace = () => {
    setTypedText(prev => prev.slice(0, -1));
  };

  return (
    <GazeContext.Provider
      value={{
        typedText,
        gazeX,
        gazeY,
        isTracking,
        dwellTime,
        voice,
        keyboardLayout,
        setTypedText,
        setGazePosition,
        setIsTracking,
        appendText,
        backspace,
        setDwellTime,
        setVoice,
        setKeyboardLayout,
      }}
    >
      {children}
    </GazeContext.Provider>
  );
};