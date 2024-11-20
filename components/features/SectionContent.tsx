import React, { useContext, useEffect, useState } from 'react';
import { marked } from 'marked';
import { AppContext } from '@/context/AppContext';
import { SectionContentProps } from '@/interfaces/interviewmodels';
import { FaLock } from 'react-icons/fa';
import { addQuestionReadStatus, updateQuestionReadStatus } from '@/services/questionReadStatus';

const levelOrder: { [key: string]: number } = {
  Entry: 1,
  Junior: 2,
  Mid: 3,
  Senior: 4,
  Expert: 5,
};

const sortQuestionsByLevel = (questions: any[]) => {
  return questions.sort((a, b) => {
    const levelA = a.question_level.level_name;
    const levelB = b.question_level.level_name;
    return (levelOrder[levelA] || 0) - (levelOrder[levelB] || 0);
  });
};

export function QuestionAnswerContent({ filteredQaList }: SectionContentProps) {
  const { isSubscribed, user } = useContext(AppContext);
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set());
  const [readStatuses, setReadStatuses] = useState<{ [key: number]: boolean }>({});
  const [statusIds, setStatusIds] = useState<{ [key: number]: string }>({});

  // Initialize the read statuses based on the fetched questions and sort them by level
  useEffect(() => {
    const sortedQuestions = sortQuestionsByLevel(filteredQaList);

    const initialReadStatuses: { [key: number]: boolean } = {};
    const initialStatusIds: { [key: number]: string } = {};

    sortedQuestions.forEach((qa) => {
      initialReadStatuses[qa.id] = qa.readStatus;
      initialStatusIds[qa.id] = qa.statusId;
    });

    setReadStatuses(initialReadStatuses);
    setStatusIds(initialStatusIds);
  }, [filteredQaList]);

  // Calculate the progress of read questions
  const calculateProgress = () => {
    const totalQuestions = filteredQaList.length;
    const readQuestions = Object.values(readStatuses).filter(status => status).length;
    return totalQuestions > 0 ? (readQuestions / totalQuestions) * 100 : 0;
  };

  // Toggle answer visibility
  const toggleQuestion = (id: number) => {
    setOpenQuestions((prevState) => {
      const newState = new Set(prevState);
      if (newState.has(id)) {
        newState.delete(id);
      } else {
        newState.add(id);
      }
      return newState;
    });
  };

  // Handle checkbox change for read status
  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>, questionId: number) => {
    e.stopPropagation(); // Prevent the click event from propagating to the question toggle

    const isChecked = e.target.checked;
    const statusId = statusIds[questionId];
    setReadStatuses((prevState) => ({ ...prevState, [questionId]: isChecked }));

    try {
      if (isChecked) {
        if (statusId != null) {
          await updateQuestionReadStatus(statusId, { ReadStatus: true });
        } else {
          const response = await addQuestionReadStatus({
            UserEmail: user?.email ?? "",
            QuestionId: questionId,
            ReadStatus: true,
          });
          setStatusIds((prev) => ({ ...prev, [questionId]: response.data.documentId }));
        }
      } else {
        if (statusId != null) {
          await updateQuestionReadStatus(statusId, { ReadStatus: false });
        } else {
        }
      }
    } catch (error) {
      setReadStatuses((prevState) => ({ ...prevState, [questionId]: !isChecked }));
    }
  };

  return (
    <div className="my-8 border border-gray-300 p-4">
      {filteredQaList.length > 0 && (
        <h3 className="text-xl mb-2">Top {filteredQaList.length} Interview Questions</h3>
      )}
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <label className="text-sm font-semibold">Read Progress</label>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-500 h-1.5 rounded-full"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{Math.round(calculateProgress())}% Complete</p>
        </div>

        {sortQuestionsByLevel(filteredQaList).map((qa, index) => (
          <div
            key={qa.id}
            className={`bg-gray-100 p-4 rounded shadow-md ${
              !isSubscribed && index > 0 ? 'pointer-events-none' : ''
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
                <span className="text-sm mr-2 px-2 py-1 rounded bg-orange-500 text-white">
                  Add To PDF
                </span>
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
                  checked={readStatuses[qa.id] || false}
                  onChange={(e) => handleCheckboxChange(e, qa.id)}
                />
              </div>
            </summary>
            {openQuestions.has(qa.id) &&
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
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
