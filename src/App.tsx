import { useEffect, useState } from 'react';
import QuestionScreen from './components/QuestionScreen';
import FeedbackScreen from './components/questionStore';
import { create } from 'zustand';

interface QuestionStore {
  loadQuestions: () => void;
  questions: any[]; // Replace `any` with the actual type of a question
  currentQuestionIndex: number;
  isLastQuestion: () => boolean;
  userAnswers: any[]; // Replace `any` with the actual type of an answer
}

export const useQuestionStore = create<QuestionStore>(() => ({
  loadQuestions: () => {},
  questions: [],
  currentQuestionIndex: 0,
  isLastQuestion: () => false,
  userAnswers: [],
}));

function App() {
  const { loadQuestions, questions, currentQuestionIndex, isLastQuestion, userAnswers } = useQuestionStore();
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);
  
  useEffect(() => {
    // Check if all questions have been answered and we're at the end
    if (questions.length > 0 && 
        isLastQuestion() && 
        userAnswers.length === questions.length) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [questions, currentQuestionIndex, isLastQuestion, userAnswers]);
  
  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading questions...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-800">Sentence Construction Tool</h1>
          <p className="text-gray-600">Fill in the blanks with the correct words</p>
        </header>
        
        <main>
          {isComplete ? <FeedbackScreen /> : <QuestionScreen />}
        </main>
      </div>
    </div>
  );
}

export default App;