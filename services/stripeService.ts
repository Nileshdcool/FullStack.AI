import { httpRequest } from '../helper/apiService'
import { HttpMethod } from '@/helper/enums';

export const createCheckoutSession = async (amount: number, userEmail: string, selectedPlanName: string): Promise<{ url: string }> => {
    try {
        const res = await httpRequest<{ url: string }>('/api/stripe/create-checkout-session', {
            method: HttpMethod.POST,
            body: { amount, userEmail, selectedPlanName },
        });
        return res;
    } catch (error) {
        throw error;
    }
};

export const verifySession = async (sessionId: string): Promise<any> => {
    try {
        const res = await httpRequest<any>(`/api/stripe/verify-session/${sessionId}`, {
            method: HttpMethod.GET,
        });
        return res;
    } catch (error) {
        throw error;
    }
};

// Function to add a subscription record
export const addSubscription = async (subscriptionData: {
    User: string;
    SubscriptionType: string;
    StartDate: string;
    EndDate: string;
    StripePaymentID: string;
    StripeSubscriptionID: string;
    PaymentStatus: string;
}): Promise<any> => {
    try {
        const res = await httpRequest<any>('/api/subscriptions', {
            method: HttpMethod.POST,
            body: { data: subscriptionData },
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

export const getSubscriptionByUserId = async (userEmail: string) => {
    try {
        const res = await httpRequest<{ results: any[] }>('/api/subscriptions?user=' + userEmail, {
            method: HttpMethod.GET,
        });
        if(res.results.length == 0)
            return false;

        if(res.results[0].EndDate == null)
            return false;

        if(new Date() > new Date(res.results[0].EndDate))
            return false;
        return true;
    } catch (error) {
        throw error;
    }
};

export const getSubscriptionDetailsbyUserid = async (userEmail: string) => {
    try {
        const res = await httpRequest<{ results: any[] }>('/api/subscriptions?user=' + userEmail, {
            method: HttpMethod.GET,
        });
        return res
    } catch (error) {
        throw error;
    }
};