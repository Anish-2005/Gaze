import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GazeState {
  typedText: string;
  gazeX: number;
  gazeY: number;
  isTracking: boolean;
}

interface GazeContextType extends GazeState {
  setTypedText: (text: string) => void;
  setGazePosition: (x: number, y: number) => void;
  setIsTracking: (tracking: boolean) => void;
  appendText: (char: string) => void;
  backspace: () => void;
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
        setTypedText,
        setGazePosition,
        setIsTracking,
        appendText,
        backspace,
      }}
    >
      {children}
    </GazeContext.Provider>
  );
};