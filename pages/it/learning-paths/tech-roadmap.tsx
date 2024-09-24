import React from 'react';

export default function TechRoadmapPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8">Technology Roadmap</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Full-Stack, Web & Mobile</h2>
                    <ul className="list-disc list-inside">
                        <li>React</li>
                        <li>Angular</li>
                        <li>Vue</li>
                        <li>Node.js</li>
                        <li>Express</li>
                        <li>Django</li>
                        <li>Flask</li>
                        <li>Spring Boot</li>
                        <li>Ruby on Rails</li>
                        <li>ASP.NET</li>
                        <li>React Native</li>
                        <li>Flutter</li>
                        <li>Ionic</li>
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Algorithms & Data Structures</h2>
                    <ul className="list-disc list-inside">
                        <li>Binary Search</li>
                        <li>Quick Sort</li>
                        <li>Merge Sort</li>
                        <li>Dynamic Programming</li>
                        <li>Graph Algorithms</li>
                        <li>Tree Traversal</li>
                        <li>Hashing</li>
                        <li>Recursion</li>
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">System Design & Architecture</h2>
                    <ul className="list-disc list-inside">
                        <li>Microservices</li>
                        <li>Monolithic Architecture</li>
                        <li>Load Balancing</li>
                        <li>Caching</li>
                        <li>Database Sharding</li>
                        <li>CAP Theorem</li>
                        <li>Message Queues</li>
                        <li>API Gateway</li>
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Data Science & ML</h2>
                    <ul className="list-disc list-inside">
                        <li>Linear Regression</li>
                        <li>Logistic Regression</li>
                        <li>Decision Trees</li>
                        <li>Random Forests</li>
                        <li>Support Vector Machines</li>
                        <li>Neural Networks</li>
                        <li>K-Means Clustering</li>
                        <li>Principal Component Analysis</li>
                    </ul>
                </div>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl font-bold text-center mb-8">Roadmap Timeline</h2>
                <div className="relative">
                    <div className="border-l-2 border-gray-300 absolute h-full left-1/2 transform -translate-x-1/2"></div>
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
                                <h3 className="text-xl font-bold">Q1 2023</h3>
                                <p>Introduction to Full-Stack Development</p>
                            </div>
                            <div className="w-1/2"></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="w-1/2"></div>
                            <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
                                <h3 className="text-xl font-bold">Q2 2023</h3>
                                <p>Advanced Algorithms & Data Structures</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
                                <h3 className="text-xl font-bold">Q3 2023</h3>
                                <p>System Design & Architecture</p>
                            </div>
                            <div className="w-1/2"></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="w-1/2"></div>
                            <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
                                <h3 className="text-xl font-bold">Q4 2023</h3>
                                <p>Data Science & Machine Learning</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}