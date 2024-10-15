import { httpRequest } from '../helper/apiService'
import { HttpMethod } from '@/helper/enums';


export const    addLoginHistory = async (loginData: {
    userId: string; 
    email:string,              // Unique identifier for the user
    loginTime: string;       // Timestamp when the user logged in
    logoutTime?: string;     // Optional timestamp for logout
    sessionDuration: string;            // IP address of the user
    sessionStatus: string;               // Description of the device used
}): Promise<any> => {
    try {
        debugger;
        const res = await httpRequest<any>('/api/login-histories', {
            method: HttpMethod.POST,
            body: { data: loginData },
        });
        return res;
    } catch (error) {
        throw error;
    }
};

export const updateLogoutTime = async (loginHistoryId: string, logoutTime: string): Promise<any> => {
    try {
        const res = await httpRequest<any>(`/api/login-histories/${loginHistoryId}`, {
            method: HttpMethod.PUT,
            body: {
                data: {
                    logoutTime: logoutTime,
                    sessionStatus: 'Logged Off', // Optionally update the session status
                },
            },
        });
        return res;
    } catch (error) {
        throw error;
    }
};


export const getSubscriptionByPaymentID = async (paymentID: string) => {
    try {
        const res = await httpRequest<{ results: any[] }>('/api/subscriptions?StripePaymentID=' + paymentID, {
            method: HttpMethod.GET,
        });
        return res.results.length > 0;
    } catch (error) {
        throw error;
    }
};

export const getLoginHistoryByUserId = async (userId: string) => {
    try {
        const res = await httpRequest<{ results: any[] }>('/api/LoginHistory?userId=' + userId, {
            method: HttpMethod.GET,
        });
        return res.results; // Return the login history results
    } catch (error) {
        throw error;
    }
};