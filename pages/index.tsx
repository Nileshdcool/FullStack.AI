import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { getIndustrySectionTopicData, getQuestionsByTopic } from '@/services/Domain';
import { AppContext } from '@/context/AppContext';
import { IndustryButtonToggle } from '@/components/IndustryToggle';
import { QuestionAnswerContent } from '@/components/features/SectionContent';

interface Topic {
  id: number;
  documentId: string;
  Name: string; // Corrected the property name to match the fetched data
}

interface Section {
  id: number;
  documentId: string;
  Name: string;
  topics: Topic[];
}

interface Industry {
  id: number;
  documentId: string;
  Name: string;
  sections: Section[];
}

const Home: React.FC = () => {
  const { handleIndustryChange, selectedIndustry } = useContext(AppContext);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>(''); // State for active tab
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null); // State for selected badge

  // Fetch industries, sections, and topics from the API
  const fetchIndustriesSectionsTopics = async () => {
    try {
      const response = await getIndustrySectionTopicData();
      const industryData: Industry[] = response;
      setIndustries(industryData);

      // Automatically select the first industry if available
      if (industryData.length > 0) {
        const firstIndustry = industryData[0];
        handleIndustryChange(firstIndustry.id.toString());
        setSections(firstIndustry.sections);

        if (firstIndustry.sections.length > 0) {
          const firstSection = firstIndustry.sections[0];
          setSelectedSection(firstSection.id);
          setTopics(firstSection.topics);
          setActiveTab(firstSection.Name); // Set the first section as active tab
        }
      }
    } catch (error) {
      console.error('Error fetching industries, sections, and topics', error);
    }
  };

  // Fetch questions based on the selected topic
  const fetchQuestions = async (topicId: number) => {
    debugger;
    try {
      const response = await getQuestionsByTopic(topicId); 
      setQuestions(response.questions); // Assuming your API response has a `questions` property
    } catch (error) {
      console.error('Error fetching questions', error);
    }
  };


  useEffect(() => {
    fetchIndustriesSectionsTopics();
  }, []);

  // Fetch questions when the selected topic changes
  useEffect(() => {
    if (selectedTopic) {
      debugger;
      fetchQuestions(selectedTopic);
    }
  }, [selectedTopic]);

  // Handle section changes
  const handleSectionChange = (section: Section) => {
    debugger;
    setSelectedSection(section.id);
    setSelectedTopic(null);
    setTopics(section.topics);
    setActiveTab(section.Name); // Set active tab to the selected section
  };

  // Handle topic changes
  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(Number(e.target.value));
  };

  // Handle industry change
  const handleIndustryChangeWrapper = (industryId: string) => {
    handleIndustryChange(industryId);
    const selectedIndustryData = industries.find(industry => industry.Name.toString() === industryId);
    if (selectedIndustryData) {
      setSections(selectedIndustryData.sections);
      if (selectedIndustryData.sections.length > 0) {
        const firstSection = selectedIndustryData.sections[0];
        setSelectedSection(firstSection.id);
        setTopics(firstSection.topics);
        setActiveTab(firstSection.Name);
      } else {
        setSelectedSection(null);
        setTopics([]);
      }
    }
  };

  // Filter questions based on the selected section (you can customize the filtering logic)
  const filteredQaList = questions.filter(question => question.sectionId === selectedSection);

  return (
    <div>
      <h1>Interview Questions</h1>

      <IndustryButtonToggle
        industries={industries}
        selectedIndustry={selectedIndustry}
        onChange={handleIndustryChangeWrapper}
      />

      {/* Button Group for Sections (Tabs) */}
      <div className="flex justify-center mb-4">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`px-4 py-2 mx-1 ${activeTab === section.Name ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => handleSectionChange(section)}
          >
            {section.Name}
          </button>
        ))}
      </div>

      {topics.length > 0 && (
        <div className="p-4 border rounded mt-4">
          <h2 className="text-2xl font-bold mb-4">Available Topics</h2>
          <div className="flex flex-wrap">
            {topics.map((topic) => (
              <span
                key={topic.id}
                className={`bg-blue-200 text-blue-800 px-2 py-1 m-1 rounded-full cursor-pointer hover:bg-blue-300 ${selectedBadge === topic.Name ? 'bg-blue-400' : ''}`}
                onClick={() => setSelectedTopic(topic.id)}
              >
                {topic.Name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* {selectedTopic && (
        <div>
          <h2>Questions for Topic ID: {selectedTopic}</h2>
          <ul>
            {questions.map((question) => (
              <li key={question.id}>{question.text}</li>
            ))}
          </ul>
        </div>
      )} */}

      {selectedSection && (
        <QuestionAnswerContent selectedSection={selectedSection} filteredQaList={questions} />
      )}

    </div>
  );
};

export default Home;
