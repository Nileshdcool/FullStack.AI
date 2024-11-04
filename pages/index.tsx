import React, { useEffect, useState, useContext } from 'react';
import { getIndustrySectionTopicData, getQuestionsByTopic } from '@/services/Domain';
import { AppContext } from '@/context/AppContext';
import { IndustryButtonToggle } from '@/components/IndustryToggle';
import { QuestionAnswerContent } from '@/components/features/SectionContent';

interface Topic {
  id: number;
  documentId: string;
  Name: string;
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

interface HomeProps {
  initialIndustries: Industry[];
}

const Home: React.FC<HomeProps> = ({ initialIndustries }) => {
  const { handleIndustryChange, selectedIndustry } = useContext(AppContext);
  const [industries, setIndustries] = useState<Industry[]>(initialIndustries);
  const [sections, setSections] = useState<Section[]>(initialIndustries[0]?.sections || []);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>(initialIndustries[0]?.sections[0]?.Name || '');

  const fetchQuestions = async (topicId: number) => {
    try {
      const response = await getQuestionsByTopic(topicId);
      setQuestions(response.questions);
    } catch (error) {
      console.error('Error fetching questions', error);
    }
  };

  useEffect(() => {
    // Load default selections on first load
    if (initialIndustries.length > 0) {
      const defaultIndustry = initialIndustries[0];
      const defaultSection = defaultIndustry.sections[0];
      const defaultTopic = defaultSection?.topics[0];

      handleIndustryChange(defaultIndustry.Name); // Set the selected industry
      setSections(defaultIndustry.sections);
      setActiveTab(defaultSection.Name);
      setSelectedSection(defaultSection.id);
      setTopics(defaultSection.topics);

      if (defaultTopic) {
        setSelectedTopic(defaultTopic.id);
        setSelectedBadge(defaultTopic.Name);
        fetchQuestions(defaultTopic.id); // Fetch questions for the default topic
      }
    }
  }, [initialIndustries, handleIndustryChange]);

  const handleSectionChange = (section: Section) => {
    setSelectedSection(section.id);
    setSelectedTopic(null);
    setTopics(section.topics);
    setActiveTab(section.Name);
  };

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

  return (
    <div>
      <h1>Interview Questions</h1>

      <IndustryButtonToggle
        industries={industries}
        selectedIndustry={selectedIndustry}
        onChange={handleIndustryChangeWrapper}
      />

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
                onClick={() => {
                  setSelectedTopic(topic.id);
                  setSelectedBadge(topic.Name);
                  fetchQuestions(topic.id); // Fetch questions when a new topic is selected
                }}
              >
                {topic.Name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedSection && (
        <QuestionAnswerContent selectedSection={selectedSection} filteredQaList={questions} />
      )}
    </div>
  );
};

export default Home;


import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const initialIndustries = await getIndustrySectionTopicData();

    return {
      props: {
        initialIndustries,
      },
    };
  } catch (error) {
    console.error('Error fetching industries:', error);
    return {
      props: {
        initialIndustries: [],
      },
    };
  }
};
