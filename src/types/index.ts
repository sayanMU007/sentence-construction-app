import { ReactNode } from 'react';

export interface Word {
    word: ReactNode;
    id: number;
    text: string;
}

export interface Blank {
    id: number;
    wordId: number | null;
}

export interface Question {
    id: number;
    sentence: string;
    blanks: Blank[];
    options: Word[];
    correctAnswers: number[];
}

export interface UserAnswer {
    questionId: number;
    answers: (number | null)[];
    isCorrect: boolean;
}