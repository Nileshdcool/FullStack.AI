import Stripe from 'stripe';
import { Context } from 'koa'; // Import the context type from Koa

// Your Stripe Secret Key
const secretKey = process.env.REACT_APP_STRIPE_SECRET_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

// Ensure the secret key is defined
if (!secretKey) {
    throw new Error('Stripe secret key is not defined in the environment variables.');
}

// Initialize Stripe with the provided secret key
const stripe = new Stripe(secretKey, {
    apiVersion: '2022-11-15' as any, // Specify the Stripe API version
});

const stripeController = {
    // Create a Payment Intent for processing payments
    async createPaymentIntent(ctx: Context) {
        try {
            const { amount } = ctx.request.body; // Get amount from the request body

            // Create a PaymentIntent with the specified amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount,                  // Amount in cents (1000 = $10.00)
                currency: 'usd',          // Currency for the payment
            });

            // Send the clientSecret back to the client for further payment processing
            ctx.send({ clientSecret: paymentIntent.client_secret });
        } catch (err) {
            // Check if err is an instance of Error
            if (err instanceof Error) {
                ctx.throw(400, err.message); // Access the message safely
            } else {
                ctx.throw(400, 'An unknown error occurred'); // Handle unexpected errors
            }
        }
    },

    // Create a Checkout Session for managing the checkout flow
    async createCheckoutSession(ctx: Context) {
        try {
            const { amount, userEmail, selectedPlanName } = ctx.request.body; // Get amount from the request body

            // Create the checkout session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],  // Only card payment methods
                mode: 'payment',                 // Single payment (one-time)
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',             // Payment currency
                            product_data: {
                                name: 'Subscription Plan', // Customize the product name
                            },
                            unit_amount: amount,         // Amount in cents (1000 = $10.00)
                        },
                        quantity: 1,                   // Quantity of the item
                    },
                ],
                success_url: `${baseUrl}/payments/successpage?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${baseUrl}/payments/cancel`,
                metadata: {
                    plan_name: selectedPlanName,  // Pass plan details
                    user_email: userEmail,        // Pass user email if needed
                },
            });

            // Send the session object back to the client
            ctx.send(session);
        } catch (err) {
            // Check if err is an instance of Error
            if (err instanceof Error) {
                ctx.throw(400, err.message); // Access the message safely
            } else {
                ctx.throw(400, 'An unknown error occurred'); // Handle unexpected errors
            }
        }
    },

    // Verify the Stripe checkout session by session_id
    async verifySession(ctx: Context) {
        const { session_id } = ctx.params; // Get session ID from request params
        try {
            // Retrieve the checkout session from Stripe
            const session = await stripe.checkout.sessions.retrieve(session_id);
            ctx.send(session); // Send session details back to the client
        } catch (err) {
            // Check if err is an instance of Error
            if (err instanceof Error) {
                ctx.throw(400, err.message); // Access the message safely
            } else {
                ctx.throw(400, 'An unknown error occurred'); // Handle unexpected errors
            }
        }
    },
};

export default stripeController;
