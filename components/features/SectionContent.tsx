import React, { useContext, useState } from 'react';
import { marked } from 'marked';
import { AppContext } from '@/context/AppContext';
import { Question, SectionContentProps } from '@/interfaces/interviewmodels';
import { FaLock } from 'react-icons/fa';

const levelOrder: { [key: string]: number } = {
  Entry: 1,
  Junior: 2,
  Mid: 3,
  Senior: 4,
  Expert: 5,
};

const sortQuestionsByLevel = (questions: Question[]) => {
  return questions.sort((a, b) => {
    const levelA = a.question_level.level_name;
    const levelB = b.question_level.level_name;
    return (levelOrder[levelA] || 0) - (levelOrder[levelB] || 0);
  });
};

export function QuestionAnswerContent({ filteredQaList }: SectionContentProps) {
  const { isSubscribed } = useContext(AppContext);
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set());
  const sortedQuestions = sortQuestionsByLevel(filteredQaList);

  const toggleQuestion = (id: number) => {
    setOpenQuestions(prevState => {
      const newState = new Set(prevState);
      if (newState.has(id)) {
        newState.delete(id); // Close the question if it's already open
      } else {
        newState.add(id); // Open the question if it's closed
      }
      return newState;
    });
  };

  return (
    <div className="my-8 border border-gray-300 p-4">
      {sortedQuestions.length > 0 && (
        <h3 className="text-xl mb-2">Top {sortedQuestions.length} Interview Questions</h3>
      )}
      <div className="space-y-4">
        {sortedQuestions.map((qa, index) => (
          <div
            key={qa.id}
            className={`bg-gray-100 p-4 rounded shadow-md ${
              (!isSubscribed && index > 0) ? 'pointer-events-none' : '' // Disable interaction for locked questions
            }`}
          >
            <summary
              className="cursor-pointer font-semibold flex items-center justify-between"
              onClick={() => toggleQuestion(qa.id)}
            >
              <span className="text-lg text-gray-600">
                Q{index + 1}: {qa.Content}
              </span>
              <div className="flex items-center">
                {(!isSubscribed && index > 0) && (
                  <FaLock className="text-gray-500 mr-2" title="Subscribe to unlock" />
                )}
                <span className="text-sm mr-2 px-2 py-1 rounded bg-orange-500 text-white">Add To PDF</span>
                <span
                  className={`text-sm mr-2 px-2 py-1 rounded ${
                    qa.question_level.level_name === 'Entry'
                      ? 'bg-green-400 text-white'
                      : qa.question_level.level_name === 'Junior'
                      ? 'bg-yellow-400 text-white'
                      : qa.question_level.level_name === 'Mid'
                      ? 'bg-blue-400 text-white'
                      : qa.question_level.level_name === 'Senior'
                      ? 'bg-orange-400 text-white'
                      : qa.question_level.level_name === 'Expert'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}
                >
                  {qa.question_level.level_name}
                </span>
                <input
                  type="checkbox"
                  className="ml-2"
                  onChange={() => {
                    // Handle Add to PDF action here
                  }}
                />
              </div>
            </summary>
            {/* Display answers only for questions that are in openQuestions */}
            {openQuestions.has(qa.id) && (
              qa.answers.map((answer, answerIndex) => (
                <div
                  key={answer.id}
                  className={`mt-2 p-3 rounded ${
                    answerIndex % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'
                  }`}
                >
                  {qa.answers.length > 1 && (
                    <span className="font-semibold text-sm">Answer {answerIndex + 1}:</span>
                  )}
                  <p
                    dangerouslySetInnerHTML={{ __html: marked(answer.content) }}
                    className="ml-4 text-gray-700"
                  />
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
