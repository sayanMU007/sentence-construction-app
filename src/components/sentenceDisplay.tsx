import React, { useMemo } from 'react';
import { Question } from '../types';

interface SentenceDisplayProps {
  question: Question;
  selectedWords: (number | null)[];
  onBlankClick: (index: number) => void;
}

const SentenceDisplay = ({ question, selectedWords, onBlankClick }: SentenceDisplayProps) => {
  const sentenceParts = useMemo(() => {
    // Split the sentence into parts based on blanks
    return question.sentence.split('_____');
  }, [question.sentence]);

  return (
    <div className="text-xl md:text-2xl leading-relaxed">
      {sentenceParts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < sentenceParts.length - 1 && (
            <button
              onClick={() => onBlankClick(index)}
              className={`inline-block mx-1 min-w-[80px] px-2 py-1 border-b-2 text-center ${
                selectedWords[index] !== null
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-300 bg-gray-50 text-gray-400'
              }`}
            >
              {selectedWords[index] !== null 
                ? question.options.find(opt => opt.id === selectedWords[index])?.text || ''
                : ''}
            </button>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export { SentenceDisplay };

// src/components/WordOptions.tsx
import { Word } from '../types';

interface WordOptionsProps {
  options: Word[];
  selectedWords: (number | null)[];
  onWordSelect: (wordId: number) => void;
}

const WordOptions = ({ options, selectedWords, onWordSelect }: WordOptionsProps) => {
  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {options.map((option) => {
        const isSelected = selectedWords.includes(option.id);
        
        return (
          <button
            key={option.id}
            onClick={() => !isSelected && onWordSelect(option.id)}
            className={`px-4 py-2 rounded-md ${
              isSelected
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
            disabled={isSelected}
          >
            {option.text}
          </button>
        );
      })}
    </div>
  );
};

export { WordOptions };
