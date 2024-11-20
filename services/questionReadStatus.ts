import { httpRequest } from '../helper/apiService';
import { HttpMethod } from '@/helper/enums';

export const addQuestionReadStatus = async (statusData: {
    UserEmail: string;           
    QuestionId: number;     
    ReadStatus: boolean;         
}): Promise<any> => {
    try {
        const res = await httpRequest<any>('/api/question-read-statuses', {
            method: HttpMethod.POST,
            body: { data: statusData },
        });
        return res;
    } catch (error) {
        throw error;
    }
};

export const updateQuestionReadStatus = async (statusId: string, updatedStatus: {
    ReadStatus: boolean;          // Updated read status (true or false)
}): Promise<any> => {
    try {
        const res = await httpRequest<any>(`/api/question-read-statuses/${statusId}`, {
            method: HttpMethod.PUT,
            body: { data: updatedStatus },
        });
        return res;
    } catch (error) {
        throw error;
    }
};

export const getQuestionReadStatusByUserId = async (userId: string): Promise<any[]> => {
    try {
        const res = await httpRequest<{ results: any[] }>(`/api/userreadstatus?userId=${userId}`, {
            method: HttpMethod.GET,
        });
        return res.results;
    } catch (error) {
        throw error;
    }
};
