import { useState, useEffect } from 'react';

interface QuickPhrasesProps {
  gazeX: number;
  gazeY: number;
  onPhrase: (phrase: string) => void;
  dwellTime: number;
}

const phrases = [
  "I am in pain",
  "I need help",
  "Washroom",
  "Nurse",
  "Yes",
  "No",
  "Thank you",
  "Water",
];

export default function QuickPhrases({ gazeX, gazeY, onPhrase, dwellTime }: QuickPhrasesProps) {
  const [hoveredPhrase, setHoveredPhrase] = useState<string | null>(null);
  const [dwellStart, setDwellStart] = useState<number | null>(null);

  useEffect(() => {
    const screenX = gazeX * window.innerWidth;
    const screenY = gazeY * window.innerHeight;

    // Assume phrases are at bottom, calculate
    const bottomHeight = window.innerHeight * 0.15;
    const phrasesY = window.innerHeight - bottomHeight;
    const phrasesHeight = bottomHeight;
    const phrasesX = 0;
    const phrasesWidth = window.innerWidth;

    if (screenY < phrasesY || screenY > phrasesY + phrasesHeight) {
      setHoveredPhrase(null);
      setDwellStart(null);
      return;
    }

    const numPhrases = phrases.length;
    const phraseWidth = phrasesWidth / numPhrases;
    const phraseIndex = Math.floor((screenX - phrasesX) / phraseWidth);

    if (phraseIndex < 0 || phraseIndex >= numPhrases) {
      setHoveredPhrase(null);
      setDwellStart(null);
      return;
    }

    const phrase = phrases[phraseIndex];
    if (hoveredPhrase !== phrase) {
      setHoveredPhrase(phrase);
      setDwellStart(Date.now());
    } else if (dwellStart && Date.now() - dwellStart > dwellTime) {
      onPhrase(phrase);
      setDwellStart(null);
      setTimeout(() => setHoveredPhrase(null), 100);
    }
  }, [gazeX, gazeY, hoveredPhrase, dwellStart, dwellTime, onPhrase]);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[15vh] bg-gray-800 flex">
      {phrases.map((phrase, index) => (
        <button
          key={phrase}
          className={`flex-1 text-white text-lg p-2 ${
            hoveredPhrase === phrase ? 'bg-blue-500' : 'bg-gray-700'
          }`}
        >
          {phrase}
        </button>
      ))}
    </div>
  );
}