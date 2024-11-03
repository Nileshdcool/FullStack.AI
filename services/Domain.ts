// apiService.ts

import { httpRequest } from '@/helper/apiService';
import { HttpMethod } from '@/helper/enums';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:1337'; // Replace with your Strapi base URL

// export const getIndustrySectionTopicData = async () => {
//   const response = await axios.get(`${API_BASE_URL}/industries`);
//   return response.data;
// };

export const getQuestionsByTopic = async (topicId: number) => {
    try {
        const res = await httpRequest<{ questions: any[] }>(`/api/topics/${topicId}/questions`, {
            method: HttpMethod.GET,
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