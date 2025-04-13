export type Question = {
  id: string;
  sentence: string;
  options: { id: string; text: string }[];
  correctAnswers: string[];
};

export type UserAnswer = {
  questionId: string;
  answers: string[];
  isCorrect: boolean;
};

import { useQuestionStore } from '../store/questionstore';

const FeedbackScreen = () => {
  const { questions, userAnswers, score, resetState } = useQuestionStore() as unknown as {
    questions: Question[];
    userAnswers: UserAnswer[];
    score: () => number;
    resetState: () => void;
  };

  const handleTryAgain = () => {
    resetState();
  };

  const displaySentenceWithAnswers = (
    question: Question,
    // Removed unused isCorrect parameter
    userAnswers: string[] | undefined
  ) => {
    const parts = question.sentence.split('_____');
    let result = '';

    parts.forEach((part: string, index: number) => {
      result += part;

      if (index < parts.length - 1) {
        const wordId = userAnswers?.[index];
        const word = question.options.find((opt) => opt.id === wordId)?.text || '';
        const correctWordId = question.correctAnswers[index];
        const isWordCorrect = wordId === correctWordId;

        result += isWordCorrect
          ? ` <span class="font-medium text-green-600">${word}</span> `
          : ` <span class="font-medium text-red-600">${word}</span> `;
      }
    });

    return <div dangerouslySetInnerHTML={{ __html: result }} />;
  };

  const displaySentenceWithCorrectAnswers = (question: Question) => {
    const parts = question.sentence.split('_____');
    let result = '';

    parts.forEach((part: string, index: number) => {
      result += part;

      if (index < parts.length - 1) {
        const correctWordId = question.correctAnswers[index];
        const word: string = question.options.find((opt) => opt.id === correctWordId)?.text || '';

        result += ` <span class="font-medium text-green-600">${word}</span> `;
      }
    });

    return <div dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Results</h2>
        <p className="text-lg">
          You scored <span className="font-bold text-indigo-600">{score()}</span> out of{' '}
          {questions.length}
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((question) => {
          const userAnswer = userAnswers.find((a) => a.questionId === question.id);
          const isCorrect = userAnswer?.isCorrect || false;

          return (
            <div
              key={question.id}
              className={`p-4 rounded-lg border ${
                isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium">Question {question.id}</h3>
                <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                  {isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </div>

              <div className="mt-2">
                {displaySentenceWithAnswers(question, userAnswer?.answers)}
              </div>

              {!isCorrect && (
                <div className="mt-2 pt-2 border-t border-red-200">
                  <p className="text-sm text-gray-600">Correct answer:</p>
                  {displaySentenceWithCorrectAnswers(question)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleTryAgain}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default FeedbackScreen;
