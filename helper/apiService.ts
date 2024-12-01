// apiService.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpMethod } from './enums';
import { apiURL } from './constants';
import { getAuth } from 'firebase/auth';

const BASE_URL = process.env.REACT_APP_API_URL || apiURL;

interface ApiOptions {
    method: HttpMethod;
    body?: any;
    headers?: Record<string, string>;
    isSubscribed?: boolean; // New parameter for subscription status
    userEmail?: string|null
}

export const httpRequest = async <T>(endpoint: string, options: ApiOptions): Promise<T> => {
    const auth = getAuth();
    
    const { method, body, headers, isSubscribed,userEmail } = options;
    const fullUrl = `${BASE_URL}${endpoint}`;

    const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
    
    const config: AxiosRequestConfig = {
        method,
        url: fullUrl,
        headers: {
            'Content-Type': 'application/json',
            'X-User-Email': userEmail ? userEmail : "",  // Pass subscription status
            'X-User-Subscribed': isSubscribed ? 'true' : 'false',  // Pass subscription status
            ...headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        data: body || undefined,
    };

    try {
        const response: AxiosResponse<T> = await axios(config);
        return response.data;
    } catch (error: any) {
        if (error.response) {
        throw new Error(`Error: ${error.response.status} ${error.response.statusText}`);
        } else {
            throw new Error(`Error: ${error.message}`);
        }
    }
};

// apiService.ts

export const downloadPdfRequest = async (selectedQuestions: Set<number>): Promise<Blob> => {
    const options = {
      method: HttpMethod.POST,
      body: {
        selectedQuestions: Array.from(selectedQuestions),
      },
    };
    
    try {
      // Call httpRequest to get the Blob response
      const response = await httpRequest<Blob>('/api/download-pdf', options);
  
      return response; // return the Blob response
    } catch (error: any) {
      throw new Error('Failed to download PDF: ' + error.message);
    }
  };
  