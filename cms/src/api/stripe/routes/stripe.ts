const commonConfig = {
    policies: ['global::firebaseAuth'],
    middlewares: [],
    auth: false,
};

export default {
    routes: [
        {
            method: 'POST',
            path: '/stripe/create-payment-intent',
            handler: 'stripe.createPaymentIntent',
            config: commonConfig, // Apply common configuration
        },
        {
            method: 'POST',
            path: '/stripe/create-checkout-session',
            handler: 'stripe.createCheckoutSession',
            config: commonConfig, // Apply common configuration
        },
        {
            method: 'GET',  
            path: '/stripe/verify-session/:session_id',
            handler: 'stripe.verifySession',
            config: commonConfig, // Apply common configuration
        },
        {
            method: 'POST',
            path: '/stripe/webhook',
            handler: 'stripe.handleStripeWebhook',
            config: {
                policies: [], // You can override or leave empty if not needed
                middlewares: [],
            },
        },
    ],
};
