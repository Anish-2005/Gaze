import { useEffect } from 'react';

interface TextDisplayProps {
  text: string;
  onSpeak: () => void;
  onClear: () => void;
}

export default function TextDisplay({ text, onSpeak, onClear }: TextDisplayProps) {
  useEffect(() => {
    // Auto speak when text changes, or on button
  }, [text]);

  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed top-4 left-4 right-4 bg-white border rounded-lg p-4 shadow-lg">
      <div className="text-2xl mb-4 min-h-[3rem]">{text || 'Start typing...'}</div>
      <div className="flex gap-2">
        <button onClick={speak} className="px-4 py-2 bg-blue-500 text-white rounded">
          Speak
        </button>
        <button onClick={onClear} className="px-4 py-2 bg-red-500 text-white rounded">
          Clear
        </button>
      </div>
    </div>
  );
}