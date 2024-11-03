import React from 'react';

// Define the order of levels
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
  level_name: string; // Include the level_name property
}

interface Question {
  id: number;
  Content: string; // Match your API's field name
  answers: Answer[];
  question_level: QuestionLevel; // Change this to be of type QuestionLevel
}

interface SectionContentProps {
  selectedSection: number;
  filteredQaList: Question[]; // Update the type based on your API structure
}

// Function to sort questions by their level
const sortQuestionsByLevel = (questions: Question[]) => {
  return questions.sort((a, b) => {
    const levelA = a.question_level.level_name;
    const levelB = b.question_level.level_name;
    return (levelOrder[levelA] || 0) - (levelOrder[levelB] || 0);
  });
};

export function QuestionAnswerContent({ selectedSection, filteredQaList }: SectionContentProps) {
  // Sort questions before rendering
  const sortedQuestions = sortQuestionsByLevel(filteredQaList);

  return (
    <div className="my-8 border border-gray-300 p-4">
      {/* <h2 className="text-2xl font-bold mb-4">
        Content for Section ID: {selectedSection}
      </h2> */}

      {sortedQuestions.length > 0 && (
        <h3 className="text-xl mb-2">Top {sortedQuestions.length} Interview Questions</h3>
      )}
      <div className="space-y-4">
        {sortedQuestions.map((qa, index) => (
          <details key={qa.id} className="bg-gray-100 p-4 rounded shadow-md">
            <summary className="cursor-pointer font-semibold flex items-center justify-between">
              {/* Display question number based on index */}
              <span className="text-lg text-gray-600">Q{index + 1}: {qa.Content}</span>
              <div className="flex items-center">
                <span className="text-sm mr-2 px-2 py-1 rounded bg-orange-500 text-white">Add To PDF</span>
                {/* Access level_name from question_level */}
                <span className="mr-4 font-semibold text-blue-600">{qa.question_level.level_name}</span>
              </div>
            </summary>
            {qa.answers.map(answer => (
              <p key={answer.id} className="mt-2">{answer.content}</p>
            ))}
          </details>
        ))}
      </div>
    </div>
  );
}
