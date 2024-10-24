import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpMethod } from './enums';
import { apiURL } from './constants';
import { getAuth } from 'firebase/auth';

const BASE_URL = process.env.REACT_APP_API_URL || apiURL;
console.log("Base URL:", BASE_URL); // Log base URL

interface ApiOptions {
    method: HttpMethod;
    body?: any; // Optional body for methods like POST, PUT, etc.
    headers?: Record<string, string>; // Optional headers to override or add custom headers
}

export const httpRequest = async <T>(endpoint: string, options: ApiOptions): Promise<T> => {
    const auth = getAuth();
    
    const { method, body, headers } = options;
    const fullUrl = `${BASE_URL}${endpoint}`;
    console.log("Making request to:", fullUrl); // Log full URL

    // Retrieve the Bearer token from the current user
    const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
    
    const config: AxiosRequestConfig = {
        method,
        url: fullUrl,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}), // Add Bearer token if it exists
        },
        data: body || undefined,
    };

    try {
        const response: AxiosResponse<T> = await axios(config);
        return response.data;
    } catch (error: any) {
        console.error("HTTP Request Error:", error); // Log error details
        if (error.response) {
            console.error("Response data:", error.response.data); // Log response data for context
            throw new Error(`Error: ${error.response.status} ${error.response.statusText}`);
        } else {
            throw new Error(`Error: ${error.message}`);
        }
    }
};
