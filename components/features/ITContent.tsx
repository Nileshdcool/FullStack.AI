import React, { useState, useEffect } from 'react';

interface ITContentProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function ITContent({ activeTab, setActiveTab }: ITContentProps) {
    const fullStackTechNames = [
        'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'Ruby on Rails', 'ASP.NET', 'React Native', 'Flutter', 'Ionic'
    ];
    const algoTechNames = [
        'Binary Search', 'Quick Sort', 'Merge Sort', 'Dynamic Programming', 'Graph Algorithms', 'Tree Traversal', 'Hashing', 'Recursion'
    ];
    const systemDesignTechNames = [
        'Microservices', 'Monolithic Architecture', 'Load Balancing', 'Caching', 'Database Sharding', 'CAP Theorem', 'Message Queues', 'API Gateway'
    ];
    const dataSciencMlTechNames = [
        'Linear Regression', 'Logistic Regression', 'Decision Trees', 'Random Forests', 'Support Vector Machines', 'Neural Networks', 'K-Means Clustering', 'Principal Component Analysis'
    ];

    const qaList = [
        { question: "What is React?", answer: "React is a JavaScript library for building user interfaces.", badge: 'React' },
        { question: "What is Node.js?", answer: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.", badge: 'Node.js' },
        { question: "What is Django?", answer: "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.", badge: 'Django' }
    ];

    const [selectedBadge, setSelectedBadge] = useState<string>(fullStackTechNames[0]);

    const filteredQaList = selectedBadge ? qaList.filter(qa => qa.badge === selectedBadge) : qaList;

    useEffect(() => {
        if (activeTab === 'Full-Stack, Web & Mobile') {
            setSelectedBadge(fullStackTechNames[0]);
        } else if (activeTab === 'Algorithms & Data Structures') {
            setSelectedBadge(algoTechNames[0]);
        } else if (activeTab === 'System Design & Architecture') {
            setSelectedBadge(systemDesignTechNames[0]);
        } else if (activeTab === 'Data Science & ML') {
            setSelectedBadge(dataSciencMlTechNames[0]);
        }
    }, [activeTab]);

    return (
        <>
            <section className="my-8">
                <div className="flex justify-center mb-4">
                    <button
                        className={`px-4 py-2 mx-1 ${activeTab === 'Full-Stack, Web & Mobile' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
                        onClick={() => setActiveTab('Full-Stack, Web & Mobile')}
                    >
                        Full-Stack, Web & Mobile
                    </button>
                    <button
                        className={`px-4 py-2 mx-1 ${activeTab === 'Algorithms & Data Structures' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
                        onClick={() => setActiveTab('Algorithms & Data Structures')}
                    >
                        Algorithms & Data Structures
                    </button>
                    <button
                        className={`px-4 py-2 mx-1 ${activeTab === 'System Design & Architecture' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
                        onClick={() => setActiveTab('System Design & Architecture')}
                    >
                        System Design & Architecture
                    </button>
                    <button
                        className={`px-4 py-2 mx-1 ${activeTab === 'Data Science & ML' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
                        onClick={() => setActiveTab('Data Science & ML')}
                    >
                        Data Science & ML
                    </button>
                </div>
                <div className="p-4 border rounded">
                    {activeTab === 'Full-Stack, Web & Mobile' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Full-Stack, Web & Mobile Technologies</h2>
                            <div className="flex flex-wrap">
                                {fullStackTechNames.map((tech) => (
                                    <span
                                        key={tech}
                                        className={`bg-blue-200 text-blue-800 px-2 py-1 m-1 rounded-full cursor-pointer hover:bg-blue-300 ${selectedBadge === tech ? 'bg-blue-400' : ''}`}
                                        onClick={() => setSelectedBadge(tech)}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'Algorithms & Data Structures' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Algorithms & Data Structures</h2>
                            <div className="flex flex-wrap">
                                {algoTechNames.map((tech) => (
                                    <span
                                        key={tech}
                                        className={`bg-blue-200 text-blue-800 px-2 py-1 m-1 rounded-full cursor-pointer hover:bg-blue-300 ${selectedBadge === tech ? 'bg-blue-400' : ''}`}
                                        onClick={() => setSelectedBadge(tech)}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'System Design & Architecture' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">System Design & Architecture</h2>
                            <div className="flex flex-wrap">
                                {systemDesignTechNames.map((tech) => (
                                    <span
                                        key={tech}
                                        className={`bg-blue-200 text-blue-800 px-2 py-1 m-1 rounded-full cursor-pointer hover:bg-blue-300 ${selectedBadge === tech ? 'bg-blue-400' : ''}`}
                                        onClick={() => setSelectedBadge(tech)}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'Data Science & ML' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Data Science & ML</h2>
                            <div className="flex flex-wrap">
                                {dataSciencMlTechNames.map((tech) => (
                                    <span
                                        key={tech}
                                        className={`bg-blue-200 text-blue-800 px-2 py-1 m-1 rounded-full cursor-pointer hover:bg-blue-300 ${selectedBadge === tech ? 'bg-blue-400' : ''}`}
                                        onClick={() => setSelectedBadge(tech)}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <section className="my-8">
                <h2 className="text-2xl font-bold mb-4">Questions & Answers</h2>
                <div className="space-y-4">
                    {filteredQaList.map((qa, index) => (
                        <details key={index} className="bg-gray-100 p-4 rounded shadow-md">
                            <summary className="cursor-pointer font-semibold">{qa.question}</summary>
                            <p className="mt-2">{qa.answer}</p>
                        </details>
                    ))}
                </div>
            </section>
        </>
    );
}