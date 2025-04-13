import { Question } from '../types/index';

const API_URL = 'http://localhost:3001';

export const fetchQuestions = async (): Promise => {
  try {
    const response = await fetch(`${API_URL}/questions`);
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};