import React from 'react';
import { marked } from 'marked';

const levelOrder: { [key: string]: number } = {
  Entry: 1,
  Junior: 2,
  Mid: 3,
  Senior: 4,
  Expert: 5,
};

interface Answer {
  id: number;
  content: string;
}

interface QuestionLevel {
  id: number;
  level_name: string;
}

interface Question {
  id: number;
  Content: string;
  answers: Answer[];
  question_level: QuestionLevel;
}

interface SectionContentProps {
  selectedSection: number;
  filteredQaList: Question[];
}

const sortQuestionsByLevel = (questions: Question[]) => {
  return questions.sort((a, b) => {
    const levelA = a.question_level.level_name;
    const levelB = b.question_level.level_name;
    return (levelOrder[levelA] || 0) - (levelOrder[levelB] || 0);
  });
};

export function QuestionAnswerContent({ selectedSection, filteredQaList }: SectionContentProps) {
  const sortedQuestions = sortQuestionsByLevel(filteredQaList);

  return (
    <div className="my-8 border border-gray-300 p-4">
      {sortedQuestions.length > 0 && (
        <h3 className="text-xl mb-2">Top {sortedQuestions.length} Interview Questions</h3>
      )}
      <div className="space-y-4">
        {sortedQuestions.map((qa, index) => (
          <details key={qa.id} className="bg-gray-100 p-4 rounded shadow-md">
            <summary className="cursor-pointer font-semibold flex items-center justify-between">
              <span className="text-lg text-gray-600">Q{index + 1}: {qa.Content}</span>
              <div className="flex items-center">
                <span className="text-sm mr-2 px-2 py-1 rounded bg-orange-500 text-white">Add To PDF</span>
                <span className="mr-4 font-semibold text-blue-600">{qa.question_level.level_name}</span>
              </div>
            </summary>
            {qa.answers.map((answer, answerIndex) => (
              <div key={answer.id} className={`mt-2 p-3 rounded ${answerIndex % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'}`}>
                {qa.answers.length > 1 && (
                  <span className="font-semibold text-sm">Answer {answerIndex + 1}:</span>
                )}
                <p dangerouslySetInnerHTML={{ __html: marked(answer.content) }} className="ml-4 text-gray-700" />
              </div>
            ))}
          </details>
        ))}
      </div>
    </div>
  );
}