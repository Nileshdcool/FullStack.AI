export default {
    routes: [
        {
            method: 'POST',
            path: '/stripe/create-payment-intent',
            handler: 'stripe.createPaymentIntent',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/stripe/create-checkout-session',
            handler: 'stripe.createCheckoutSession',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'GET',
            path: '/stripe/verify-session/:session_id',
            handler: 'stripe.verifySession',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
