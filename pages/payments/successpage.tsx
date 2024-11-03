import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { addSubscription, verifySession, getSubscriptionByPaymentID } from '../../services/stripeService'; // Import the new function
import { AppContext } from '@/context/AppContext'; // Import your context
import Link from 'next/link';


const SuccessPage = () => {
    const router = useRouter();
    const { session_id } = router.query; // Get session_id from the URL query params
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const { setIsSubscribedFlag } = useContext(AppContext); // Access the context


    const calculateEndDate = (subscriptionType: string): string => {
        let endDate: string = "";
        if (subscriptionType === 'Days7') {
            endDate = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0]; // 7 days later
        } else if (subscriptionType === 'Days20') {
            endDate = new Date(new Date().setDate(new Date().getDate() + 20)).toISOString().split('T')[0]; // 20 days later
        } else if (subscriptionType === 'Lifetime') {
            endDate = ""; // Lifetime subscription
        }
        return endDate;
    };

    useEffect(() => {
        const verifyPayment = async () => {
            if (session_id) {
                try {
                    // Call the verifySession function to verify the payment session
                    const session = await verifySession(session_id as string);
debugger;
                    if (session.payment_status === 'paid') {
                        const userEmail = session.metadata.user_email; 
                        const subscriptionType = session.metadata.plan_name; 
                        const endDate = calculateEndDate(subscriptionType);
                        const stripePaymentID = session.invoice;

                        if(stripePaymentID !=null){
                        // Check if a subscription with this StripePaymentID already exists
                        const existingSubscription = await getSubscriptionByPaymentID(stripePaymentID);

                        // If no existing subscription, add a new one
                        if (!existingSubscription) {
                            console.log("calculateEndDate",calculateEndDate(session.metadata.plan_name));
                            const subscriptionData = {
                                User: userEmail, // Update with actual user data
                                SubscriptionType: subscriptionType,
                                StartDate: new Date().toISOString().split('T')[0], // Current date
                                EndDate: endDate,
                                StripePaymentID: stripePaymentID,
                                StripeSubscriptionID: session.id,
                                PaymentStatus: session.payment_status,
                                SubscriptionDetails:session
                            };
                            console.log("subscriptionData", subscriptionData);
                            await addSubscription(subscriptionData);
                            setIsSubscribedFlag(true);
                        }
                    }

                        setPaymentStatus('success');
                    } else {
                        setPaymentStatus('failed');
                    }
                } catch (error) {
                    console.log(error);
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
                        <Link legacyBehavior href="/">
                        <a className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                         Go back home
                        </a>
                        </Link>
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
