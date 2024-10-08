// api.ts
const BASE_URL = 'http://localhost:5000';

interface ApiOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any; // Optional body for methods like POST, PUT, etc.
    headers?: HeadersInit; // Optional headers to override or add custom headers
}

export const fetchData = async <T>(endpoint: string, options: ApiOptions): Promise<T> => {
    debugger;
    const { method, body, headers } = options;
    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    };

    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: { ...defaultHeaders, ...headers },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        throw error;
    }
};
