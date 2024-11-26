import React, { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { getQuestionReadStatusByUserId } from '@/services/questionReadStatus';

interface ProgressReportPageProps {
    progressData: { [key: string]: { completed: number, total: number } };
}

const ProgressReportPage: React.FC<ProgressReportPageProps> = ({ progressData }) => {
    const { user } = useContext(AppContext);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Progress Report</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(progressData).map((badge) => {
                    const { completed, total } = progressData[badge];
                    const progressPercentage = (completed / total) * 100;
                    return (
                        <div key={badge} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">{badge}</h2>
                            <p className="text-gray-700 mb-4">Completed {completed} out of {total} questions</p>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div
                                    className="bg-blue-500 h-4 rounded-full"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const getServerSideProps = async (context: any) => {
    const userId = context.query.userId; // Assuming userId is passed as a query parameter
    const readStatuses = await getQuestionReadStatusByUserId(userId);
    const progressData = readStatuses.reduce((acc: any, status: any) => {
        const { badge, done } = status;
        if (!acc[badge]) {
            acc[badge] = { completed: 0, total: 0 };
        }
        acc[badge].total += 1;
        if (done) {
            acc[badge].completed += 1;
        }
        return acc;
    }, {});

    return {
        props: {
            progressData,
        },
    };
};

export default ProgressReportPage;