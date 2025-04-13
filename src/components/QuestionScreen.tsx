import { useState, useEffect } from 'react';
import { SentenceDisplay } from './sentenceDisplay';
import Timer from './Timer';
import { useQuestionStore } from '../store/questionstore';
import { useTimer } from '../hooks/useTimer';
import { Word } from '../types';

const TIMER_DURATION = 30;

const QuestionScreen = () => {
  const { 
    currentQuestion, 
    nextQuestion, 
    answerQuestion, 
    isLastQuestion 
  } = useQuestionStore();
  
  const question = currentQuestion();
  const [selectedWords, setSelectedWords] = useState<(number | null)[]>([]);
  const [, setNextBlankIndex] = useState(0);
  
  const handleTimeUp = () => {
    // Submit whatever is currently selected when time is up
    if (areAllBlanksFilled()) {
      handleSubmitAnswer();
    }
    handleNextQuestion();
  };
  
  const { timeLeft, reset: resetTimer } = useTimer(TIMER_DURATION, handleTimeUp);
  
  useEffect(() => {
    if (!question) return;
    
    // Reset state for new question
    setSelectedWords(new Array(question.blanks.length).fill(null));
    setNextBlankIndex(0);
    resetTimer();
  }, [question, resetTimer]);
  
  if (!question) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }
  
  const handleWordSelect = (wordId: number) => {
    const updatedSelectedWords = [...selectedWords];
    
    // Find the next empty blank
    const emptyBlankIndex = updatedSelectedWords.findIndex(word => word === null);
    
    if (emptyBlankIndex !== -1) {
      updatedSelectedWords[emptyBlankIndex] = wordId;
      setSelectedWords(updatedSelectedWords);
      setNextBlankIndex(emptyBlankIndex + 1);
    }
  };
  
  const handleBlankClick = (index: number) => {
    if (selectedWords[index] !== null) {
      const updatedSelectedWords = [...selectedWords];
      updatedSelectedWords[index] = null;
      setSelectedWords(updatedSelectedWords);
      setNextBlankIndex(index);
    }
  };
  
  const areAllBlanksFilled = () => {
    return selectedWords.every(word => word !== null);
  };
  
  const handleSubmitAnswer = () => {
    answerQuestion(selectedWords);
  };
  
  const handleNextQuestion = () => {
    if (areAllBlanksFilled()) {
      handleSubmitAnswer();
    }
    nextQuestion();
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Question {question.id}</h2>
        <Timer timeLeft={timeLeft} totalTime={TIMER_DURATION} />
      </div>
      
      <div className="mb-8">
        <SentenceDisplay 
          question={question}
          selectedWords={selectedWords}
          onBlankClick={handleBlankClick}
        />
      </div>
      
      <WordOptions
        options={question.options}
        selectedWords={selectedWords}
        onWordSelect={handleWordSelect}
      />
      
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNextQuestion}
          disabled={!areAllBlanksFilled()}
          className={`px-6 py-2 rounded-md ${
            areAllBlanksFilled()
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLastQuestion() ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuestionScreen;

interface WordOptionsProps {
  options: Word[];
  selectedWords: (number | null)[];
  onWordSelect: (wordId: number) => void;
}

const WordOptions: React.FC<WordOptionsProps> = ({ options, selectedWords, onWordSelect }) => {
  return (
    <div>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onWordSelect(option.id)}
          disabled={selectedWords.includes(option.id)}
          className={`px-4 py-2 m-1 rounded-md ${
            selectedWords.includes(option.id) ? 'bg-gray-300' : 'bg-indigo-500 text-white'
          }`}
        >
          {option.word}
        </button>
      ))}
    </div>
  );
};

export { WordOptions };
