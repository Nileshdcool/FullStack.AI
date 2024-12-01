import React, { useContext, useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import { AppContext } from '@/context/AppContext';
import { Question, SectionContentProps, WebSocketData } from '@/interfaces/interviewmodels';
import { FaLock } from 'react-icons/fa';
import { addQuestionReadStatus, updateQuestionReadStatus } from '@/services/questionReadStatus';
import axios from 'axios';
import { connectWebSocket, disconnectWebSocket } from '@/utils/websocket';
import { HttpMethod, WebSocketStatus } from '@/helper/enums';
import { httpRequest } from '@/helper/apiService';
import { apiURL, freeQuestiontoRead, questionAnswerLowPrioriryFont, questionAnswerPrimaryFont, questionAnswerSecondaryFont } from '@/helper/constants';
import { toast } from 'react-toastify';
import { getSessionKey } from '@/helper/sessionKey';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { FontToRead } from '@/helper/enums';


const BASE_URL = process.env.REACT_APP_API_URL || apiURL;

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

const sortQuestionsForUnsubscribed = (questions: Question[]) => {
  return questions.sort((a, b) => a.id - b.id);
};


export function QuestionAnswerContent({ filteredQaList, topicName }: SectionContentProps) {
  const { isSubscribed, user } = useContext(AppContext);
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set());
  const [readStatuses, setReadStatuses] = useState<{ [key: number]: boolean }>({});
  const [statusIds, setStatusIds] = useState<{ [key: number]: string }>({});
  const [selectedQuestions, setSelectedQuestions] = useState<Set<number>>(new Set());
  const [fileReady, setFileReady] = useState<boolean>(false);
  const [buttonLabel, setButtonLabel] = useState<string>('Generate PDF');
  const [selectedTopicName, setSelectedTopicName] = useState<string>('Generate PDF');
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedFont, setSelectedFont] = useState<FontToRead>(questionAnswerPrimaryFont);

  useEffect(() => {

    if (topicName != "") {
      setSelectedTopicName(topicName);
    }
    const sortedQuestions = sortQuestionsByLevel(filteredQaList);

    filteredQaList = isSubscribed ? sortQuestionsByLevel(filteredQaList) : sortQuestionsForUnsubscribed(filteredQaList);
    const initialReadStatuses: { [key: number]: boolean } = {};
    const initialStatusIds: { [key: number]: string } = {}; // Adjust type based on `statusId` type

    sortedQuestions.forEach((qa: Question) => {
      initialReadStatuses[qa.id] = qa.readStatus; // Assuming `qa.readStatus` is boolean
      initialStatusIds[qa.id] = qa.statusId;     // Assuming `qa.statusId` is string
    });

    setReadStatuses(initialReadStatuses);
    setStatusIds(initialStatusIds);
    setSelectedQuestions(new Set());
  }, [filteredQaList]);

  useEffect(() => {
    const sessionKey = user?.email || getSessionKey();

    if (sessionKey) {
      // Connect WebSocket to listen for progress updates
      connectWebSocket(sessionKey, (data: WebSocketData) => {
        if (data.status === WebSocketStatus.Completed) {
          toast.info('PDF generated successfully!', {
            autoClose: 500,
          });
          setFileReady(true); // File is ready
          setSelectedQuestions(new Set());
          setButtonLabel("Download PDF");
        }
      });
      // Cleanup WebSocket connection on component unmount
      return () => disconnectWebSocket();
    }
  }, [selectedQuestions]);

  const handleAddToPdf = (questionId: number) => {
    setSelectedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
    setButtonLabel(`Generate PDF (${selectedQuestions.size + 1})`);
  };

  const getFormattedDate = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}${month}${date}_${hours}${minutes}${seconds}`;
  };

  const generatePdf = async (): Promise<void> => {
    if (selectedQuestions.size === 0) return;

    try {
      const sessionKey = user?.email || getSessionKey();
      const fileName: string = `ElevarAI_QAS_${getFormattedDate()}.pdf`;
      setLoading(true); // Start loading
      setFileReady(false);
      setButtonLabel('Generating PDF...');
      await httpRequest<string>('/api/generate-pdf', {
        method: HttpMethod.POST,
        userEmail: user?.email,
        body: { selectedQuestions: Array.from(selectedQuestions), fileName: fileName, topicName: selectedTopicName, sessionKey: sessionKey },
      });
      localStorage.setItem('fileName', fileName);
      setFileReady(true); // File is ready
    } catch (error) {
      console.error('Error during PDF generation:', error);
      toast.error('Failed to generate PDF. Try again.');
    } finally {
      setLoading(false); // End loading
    }
  };


  const downloadPdf = async (): Promise<void> => {
    try {
      const fileName = localStorage.getItem('fileName');
      const fullUrl = `${BASE_URL}` + "/api/download-pdf";
      setLoading(true); // Start loading
      const response = await axios.post(fullUrl, { fileName }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName || 'questions.pdf');
      document.body.appendChild(link);
      link.click();
      setButtonLabel('Generate PDF');
      setSelectedQuestions(new Set());
      setFileReady(false);
      localStorage.removeItem('fileName');
      toast.info('PDF downloaded successfully!', {
        autoClose: 500,
      });
    } catch (error) {
      console.error('Error during PDF download:', error);
      toast.error('Failed to download PDF. Try again.');
    } finally {
      setLoading(false); // End loading
    }
  };


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

  const calculateProgress = () => {
    const totalQuestions = filteredQaList.length;
    const readQuestions = Object.values(readStatuses).filter((status) => status).length;
    return totalQuestions > 0 ? (readQuestions / totalQuestions) * 100 : 0;
  };

  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>, questionId: number) => {
    e.stopPropagation();
    const isChecked = e.target.checked;
    const statusId = statusIds[questionId];
    setReadStatuses((prevState) => ({ ...prevState, [questionId]: isChecked }));

    try {
      if (isChecked) {
        if (statusId != null) {
          await updateQuestionReadStatus(statusId, { ReadStatus: true });
        } else {
          const response = await addQuestionReadStatus({
            UserEmail: user?.email ?? '',
            QuestionId: questionId,
            ReadStatus: true,
          });
          setStatusIds((prev) => ({ ...prev, [questionId]: response.data.documentId }));
        }
      } else if (statusId != null) {
        await updateQuestionReadStatus(statusId, { ReadStatus: false });
      }
    } catch (error) {
      setReadStatuses((prevState) => ({ ...prevState, [questionId]: !isChecked }));

    }
  };

  return (
    <div className="my-8 border border-gray-300 p-4">
      <div className="mb-4 flex justify-end">
        <button
          disabled={selectedQuestions.size === 0 && !fileReady || loading}
          onClick={fileReady ? downloadPdf : generatePdf}
          className={`flex items-center px-4 py-2 rounded ${fileReady ? 'bg-green-500' : 'bg-blue-500'} text-white`}
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              {fileReady ? 'Downloading...' : 'Generating...'}
            </span>
          ) : (
            buttonLabel
          )}
        </button>
      </div>
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
      <div className="space-y-4">
        {filteredQaList.map((qa, index) => (
          <div
            key={qa.id}
            className={`bg-gray-100 p-4 rounded shadow-md ${!isSubscribed && index > freeQuestiontoRead ? 'pointer-events-none' : ''}`}
          >
            <summary
              className="cursor-pointer font-semibold flex items-center justify-between"
              style={{ fontFamily: `${selectedFont}, ${questionAnswerSecondaryFont}, ${questionAnswerLowPrioriryFont}` }}
              onClick={() => toggleQuestion(qa.id)}
            >
              <span className="text-lg text-gray-600">
                Q{index + 1}: {qa.Content}
              </span>
              <div className="flex items-center">
                <span
                  className={`text-sm mr-2 px-2 py-1 rounded ${qa.question_level.level_name === 'Entry'
                    ? 'bg-green-400 text-white'
                    : qa.question_level.level_name === 'Junior'
                      ? 'bg-yellow-400 text-white'
                      : qa.question_level.level_name === 'Mid'
                        ? 'bg-blue-400 text-white'
                        : qa.question_level.level_name === 'Senior'
                          ? 'bg-orange-400 text-white'
                          : 'bg-red-500 text-white'
                    }`}
                >
                  {qa.question_level.level_name}
                </span>
                {(isSubscribed || index < freeQuestiontoRead) && (
                  <>
                    <button
                      onClick={() => handleAddToPdf(qa.id)}
                      className={`text-sm mr-2 px-2 py-1 rounded ${selectedQuestions.has(qa.id) ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
                        }`}
                    >
                      {selectedQuestions.has(qa.id) ? 'Remove from PDF' : 'Add to PDF'}
                    </button>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={readStatuses[qa.id]}
                      onChange={(e) => handleCheckboxChange(e, qa.id)}
                    />
                  </>
                )}
                {!isSubscribed && index + 1 > freeQuestiontoRead && <FaLock className="text-gray-500 ml-2" />}
              </div>
            </summary>

            {openQuestions.has(qa.id) && qa.answers.map((answer, answerIndex) => (
              <div
                key={answer.id}
                className={`mt-2 p-3 rounded ${answerIndex % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'}`}
              >
                {qa.answers.length > 1 && (
                  <span className="text-sm"  style={{ fontFamily: selectedFont }}>Answer {answerIndex + 1}:</span>
                )}

                {/* Render answer content with syntax highlighting for code blocks */}
                <div className="ml-4 text-gray-700">
                  {/* Separate code blocks from regular text */}
                  {answer.content.split('```').map((part, index) => {
                    if (index % 2 === 0) {
                      // Render regular text (non-code) part
                      return (
                        <span
                          key={index}
                          dangerouslySetInnerHTML={{
                            __html: marked(part),
                          }}
                        />
                      );
                    } else {
                      return (
                       // part
                       <SyntaxHighlighter language="javascript" style={okaidia}>
                       {part}
                     </SyntaxHighlighter>
                      );
                    }
                  })}
                </div>
              </div>
            ))}

          </div>
        ))}
      </div>
    </div>
  );
}