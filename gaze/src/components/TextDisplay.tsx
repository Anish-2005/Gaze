import { useEffect } from 'react';

interface TextDisplayProps {
  text: string;
  onSpeak: () => void;
  onClear: () => void;
  onUndo: () => void;
}

export default function TextDisplay({ text, onSpeak, onClear, onUndo }: TextDisplayProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-[15vh] bg-gray-900 text-white flex flex-col justify-center items-center p-4">
      <div className="text-3xl mb-4 text-center">{text || 'Start typing...'}</div>
      <div className="flex gap-4">
        <button onClick={onSpeak} className="px-6 py-3 bg-green-600 text-white rounded-lg text-xl">
          Speak
        </button>
        <button onClick={onClear} className="px-6 py-3 bg-red-600 text-white rounded-lg text-xl">
          Clear
        </button>
        <button onClick={onUndo} className="px-6 py-3 bg-yellow-600 text-white rounded-lg text-xl">
          Undo
        </button>
      </div>
    </div>
  );
}