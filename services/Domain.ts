// apiService.ts

import { httpRequest } from '@/helper/apiService';
import { HttpMethod } from '@/helper/enums';



export const getQuestionsByTopic = async (topicId: number, isSubscribed:boolean ) => {
    try {
        const res = await httpRequest<{ questions: any[] }>(`/api/topics/${topicId}/questions`, {
            method: HttpMethod.GET,
            isSubscribed,
        });
        return res;
    } catch (error) {
        throw error;
    }
};

export const getIndustrySectionTopicData = async () => {
    try {
        const res = await httpRequest<{ results: any[] }>('/api/industries-with-sections-and-topics', {
            method: HttpMethod.GET,
        });
        return res;
    } catch (error) {
        throw error;
    }
};