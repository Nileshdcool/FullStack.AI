import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchData } from '@/utility/apiService';

const SuccessPage = () => {
    debugger;
    const router = useRouter();
    const { session_id } = router.query; // Get session_id from the URL query params
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

    useEffect(() => {
        const verifyPayment = async () => {
            if (session_id) {
                try {
                    // Optionally verify the session with Stripe to confirm successful payment
                    const session: any = await fetchData(`/api/verify-session/${session_id}`, {
                        method: 'GET',
                    });
                    
                    if (session.payment_status === 'paid') {
                        setPaymentStatus('success');
                    } else {
                        setPaymentStatus('failed');
                    }
                } catch (error) {
                    setPaymentStatus('error');
                }
            }
        };

        verifyPayment();
    }, [session_id]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg">
                {paymentStatus === 'success' ? (
                    <>
                        <h1 className="text-3xl font-bold text-green-500 mb-4">Payment Successful!</h1>
                        <p className="text-gray-600 text-lg">Thank you for your subscription! You can now access premium features.</p>
                    </>
                ) : paymentStatus === 'failed' ? (
                    <>
                        <h1 className="text-3xl font-bold text-red-500 mb-4">Payment Failed</h1>
                        <p className="text-gray-600 text-lg">Unfortunately, your payment could not be completed. Please try again or contact support.</p>
                    </>
                ) : paymentStatus === 'error' ? (
                    <>
                        <h1 className="text-3xl font-bold text-red-500 mb-4">Error</h1>
                        <p className="text-gray-600 text-lg">An error occurred while verifying your payment. Please try again later.</p>
                    </>
                ) : (
                    <p className="text-gray-500 text-lg mb-4">Verifying payment...</p>
                )}
            </div>
        </div>
    );
};

export default SuccessPage;
