// apiService.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpMethod } from './enums';
import { apiURL } from './constants';
import { getAuth } from 'firebase/auth';

const BASE_URL = process.env.REACT_APP_API_URL || apiURL;
console.log("Base URL:", BASE_URL); 

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
    console.log("Making request to:", fullUrl);

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
