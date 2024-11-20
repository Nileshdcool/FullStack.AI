import React, { useContext, useEffect, useState } from 'react';
import { marked } from 'marked';
import { AppContext } from '@/context/AppContext';
import { Question, SectionContentProps, WebSocketData } from '@/interfaces/interviewmodels';
import { FaLock } from 'react-icons/fa';
import { addQuestionReadStatus, updateQuestionReadStatus } from '@/services/questionReadStatus';
import axios from 'axios';
import { connectWebSocket, disconnectWebSocket } from '@/utils/websocket';
import { HttpMethod } from '@/helper/enums';
import { httpRequest } from '@/helper/apiService';
import { apiURL } from '@/helper/constants';
import { toast } from 'react-toastify';

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


export function QuestionAnswerContent({ filteredQaList, topicName }: SectionContentProps) {
  debugger;
  const { isSubscribed, user } = useContext(AppContext);
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set());
  const [readStatuses, setReadStatuses] = useState<{ [key: number]: boolean }>({});
  const [statusIds, setStatusIds] = useState<{ [key: number]: string }>({});
  const [selectedQuestions, setSelectedQuestions] = useState<Set<number>>(new Set());
  const [fileReady, setFileReady] = useState<boolean>(false);
  const [buttonLabel, setButtonLabel] = useState<string>('Generate PDF');
  const [selectedTopicName, setSelectedTopicName] = useState<string>('Generate PDF');


  useEffect(() => {
    if (topicName != "") {
      setSelectedTopicName(topicName);
    }
    const sortedQuestions = sortQuestionsByLevel(filteredQaList);
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
    const userId = user?.email ?? ''; // Replace with a real user ID for WebSocket connection

    if (userId) {
      // Connect WebSocket to listen for progress updates
      connectWebSocket(userId, (data: WebSocketData) => {
        if (data.status === 'completed') {
          toast.info('PDF generated successfully!');
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
    debugger;
    if (selectedQuestions.size === 0) return;

    try {
      const fileName: string = `ElevarAI_QAS_${getFormattedDate()}.pdf`;
      toast.info('Starting PDF generation...');
      setFileReady(false); // Reset file-ready state
      setButtonLabel('Generating PDF...');
      await httpRequest<string>('/api/generate-pdf', {
        method: HttpMethod.POST,
        userEmail: user?.email,
        body: { selectedQuestions: Array.from(selectedQuestions), fileName: fileName, topicName: selectedTopicName },
      });
      localStorage.setItem('fileName', fileName);

    } catch (error) {
      console.error('Error during PDF generation:', error);
      toast.error('Failed to generate PDF. Try again.');

    }
  };

  const downloadPdf = async (): Promise<void> => {
    try {
      debugger;
      const fileName = localStorage.getItem('fileName');
      const fullUrl = `${BASE_URL}` + "/api/download-pdf";
      const response = await axios.post(fullUrl, {
        fileName: fileName,
      }, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName || 'questions.pdf');
      document.body.appendChild(link);
      link.click();
      toast.info('PDF downloaded successfully!');
      setButtonLabel('Generate PDF'); // Reset button label
      setSelectedQuestions(new Set()); // Clear selected questions
      setFileReady(false);
      localStorage.removeItem('fileName');
    } catch (error) {
      console.error('Error during PDF download:', error);
      toast.error('Failed to download PDF. Try again.');
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

  const handleCheckboxChange = async (e:React.ChangeEvent<HTMLInputElement>, questionId: number) => {
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
      console.log(error)

    }
  };

  return (
    <div className="my-8 border border-gray-300 p-4">
      {filteredQaList.length > 0 && (
        <h3 className="text-xl mb-2">Top {filteredQaList.length} Interview Questions</h3>
      )}
      <div className="mb-4 flex justify-end">
        <button
          disabled={selectedQuestions.size === 0 && !fileReady}
          onClick={fileReady ? downloadPdf : generatePdf}
          className={`px-4 py-2 rounded ${fileReady ? 'bg-green-500' : 'bg-blue-500'} text-white`}
        >
          {buttonLabel}
        </button>
        {/* {progress && <p className="ml-4 text-gray-700">{progress}</p>} */}
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
        {sortQuestionsByLevel(filteredQaList).map((qa, index) => (
          <div
            key={qa.id}
            className={`bg-gray-100 p-4 rounded shadow-md ${!isSubscribed && index > 0 ? 'pointer-events-none' : ''}`}
          >
            <summary
              className="cursor-pointer font-semibold flex items-center justify-between"
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
                {(isSubscribed || index === 0) && (
                  <>
                    <button
                      onClick={() => handleAddToPdf(qa.id)}
                      className={`text-sm mr-2 px-2 py-1 rounded ${selectedQuestions.has(qa.id) ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
                        }`}
                    >
                      {selectedQuestions.has(qa.id) ? 'Added' : 'Add to PDF'}
                    </button>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={readStatuses[qa.id]}
                      onChange={(e) => handleCheckboxChange(e, qa.id)}
                    />
                  </>
                )}
                {!isSubscribed && index > 0 && <FaLock className="text-gray-500 ml-2" />}
              </div>
            </summary>
            {/* <div
              className={`mt-2 text-sm text-gray-700 ${openQuestions.has(qa.id) ? 'block' : 'hidden'}`}
              dangerouslySetInnerHTML={{
                __html: qa.Answer ? marked(qa.Answer) : '<p>No answer available.</p>',
              }}
            /> */}

            {openQuestions.has(qa.id) && qa.answers.map((answer, answerIndex) => (
              <div
                key={answer.id}
                className={`mt-2 p-3 rounded ${answerIndex % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'}`}
              >
                {qa.answers.length > 1 && (
                  <span className="font-semibold text-sm">Answer {answerIndex + 1}:</span>
                )}
                <p
                  dangerouslySetInnerHTML={{
                    __html: marked(answer.content) || '<p>No answer available.</p>',
                  }}
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