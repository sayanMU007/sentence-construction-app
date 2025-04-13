import { create } from 'zustand';
import { Question, UserAnswer } from '../types';
import { fetchQuestions } from '../utils/api';

interface QuestionState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  loading: boolean;
  error: string | null;
  
  // Actions
  loadQuestions: () => Promise<void>;
  nextQuestion: () => void;
  answerQuestion: (answers: (number | null)[]) => void;
  resetState: () => void;
  
  // Computed
  currentQuestion: () => Question | undefined;
  isLastQuestion: () => boolean;
  score: () => number;
}

export const useQuestionStore = create<QuestionState>((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  loading: false,
  error: null,
  
  loadQuestions: async () => {
    set({ loading: true, error: null });
    try {
      const questions = await fetchQuestions();
      set({ questions, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load questions', 
        loading: false 
      });
    }
  },
  
  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  },
  
  answerQuestion: (answers) => {
    const { currentQuestion, userAnswers } = get();
    const question = currentQuestion();
    
    if (!question) return;
    
    const isCorrect = JSON.stringify(answers) === JSON.stringify(question.correctAnswers);
    
    const userAnswer: UserAnswer = {
      questionId: question.id,
      answers,
      isCorrect
    };
    
    // Update existing answer or add new one
    const updatedAnswers = [...userAnswers];
    const existingIndex = updatedAnswers.findIndex(a => a.questionId === question.id);
    
    if (existingIndex !== -1) {
      updatedAnswers[existingIndex] = userAnswer;
    } else {
      updatedAnswers.push(userAnswer);
    }
    
    set({ userAnswers: updatedAnswers });
  },
  
  resetState: () => {
    set({
      currentQuestionIndex: 0,
      userAnswers: [],
    });
  },
  
  currentQuestion: () => {
    const { questions, currentQuestionIndex } = get();
    return questions[currentQuestionIndex];
  },
  
  isLastQuestion: () => {
    const { questions, currentQuestionIndex } = get();
    return currentQuestionIndex === questions.length - 1;
  },
  
  score: () => {
    const { userAnswers } = get();
    return userAnswers.filter(answer => answer.isCorrect).length;
  }
}));