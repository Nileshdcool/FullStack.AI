import React, { useEffect, useState, useContext } from 'react';
import { getIndustrySectionTopicData, getQuestionsByTopic } from '@/services/Domain';
import { AppContext } from '@/context/AppContext';
import { IndustryButtonToggle } from '@/components/IndustryToggle';
import { QuestionAnswerContent } from '@/components/features/SectionContent';
import { HomeProps, Industry, Question, Section, Topic } from '@/interfaces/interviewmodels';

const Home: React.FC<HomeProps> = ({ initialIndustries }) => {
  const { handleIndustryChange, selectedIndustry } = useContext(AppContext);
  const [industries] = useState<Industry[]>(initialIndustries);
  const [sections, setSections] = useState<Section[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [, setSelectedTopic] = useState<number | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeTab, setActiveTab] = useState<string>('');

  // Load default industry, section, topic on initial load
  useEffect(() => {
    if (initialIndustries.length > 0) {
        const defaultIndustry = initialIndustries[0];
        handleIndustryChange(defaultIndustry.Name);
    }
}, [initialIndustries]);


  // Update sections and load first section, topic, and questions when industry changes
  useEffect(() => {
    const selectedIndustryData = industries.find(ind => ind.Name === selectedIndustry);
    if (selectedIndustryData) {
      setSections(selectedIndustryData.sections);
  
      if (selectedIndustryData.sections.length > 0) {
        const firstSection = selectedIndustryData.sections[0];
        setSelectedSection(firstSection.id);
        setActiveTab(firstSection.Name); // Set the activeTab to the default section
        setTopics(firstSection.topics);
  
        // Load questions for the first topic in the first section
        if (firstSection.topics.length > 0) {
          debugger;
          const firstTopic = firstSection.topics[0];
          setSelectedTopic(firstTopic.id);
          setSelectedBadge(firstTopic.Name);
          fetchQuestions(firstTopic.id);
        } else {
          setSelectedTopic(null);
          setQuestions([]);
        }
      } else {
        setSelectedSection(null);
        setTopics([]);
        setQuestions([]);
      }
    }
  }, [selectedIndustry, industries]);
  
  // Load topics and first topic questions when section changes
  useEffect(() => {
    const selectedSectionData = sections.find(sec => sec.id === selectedSection);
    if (selectedSectionData) {
      setTopics(selectedSectionData.topics);

      if (selectedSectionData.topics.length > 0) {
        const firstTopic = selectedSectionData.topics[0];
        setSelectedTopic(firstTopic.id);
        setSelectedBadge(firstTopic.Name);
        fetchQuestions(firstTopic.id);
      } else {
        setSelectedTopic(null);
        setQuestions([]);
      }
    }
  }, [selectedSection, sections]);

  // Fetch questions by topic ID
  const fetchQuestions = async (topicId: number) => {
    try {
      const response = await getQuestionsByTopic(topicId);
      setQuestions(response.questions);
    } catch (error) {
      console.error('Error fetching questions', error);
    }
  };

  // Handle section change and load questions for its first topic
  const handleSectionChange = (section: Section) => {
    setSelectedSection(section.id);
    setActiveTab(section.Name);
  };

  // Wrapper to handle industry change
  const handleIndustryChangeWrapper = (industryId: string) => {
    handleIndustryChange(industryId);
  };

  return (
    <div>

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
        <QuestionAnswerContent selectedSection={selectedSection} filteredQaList={questions} topicName={selectedBadge || ""} />
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
