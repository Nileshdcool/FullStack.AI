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
            console.log("called createCheckoutSession");

            console.log("ctx.request.body",ctx.request.body);
            const { amount, userEmail, selectedPlanName } = ctx.request.body; // Get amount from the request body
            console.log(amount, userEmail, selectedPlanName);

            let sessionData: any = {
                payment_method_types: ['card'],  // Only card payment methods
                customer_email: userEmail,
                success_url: `${baseUrl}/payments/successpage?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${baseUrl}/payments/cancel`,
                metadata: {
                    plan_name: selectedPlanName,  // Pass plan details
                    user_email: userEmail,        // Pass user email if needed
                },
            };
    
            if (selectedPlanName === 'Lifetime') {
                // Logic for lifetime subscription (one-time payment)
                sessionData.mode = 'payment'; // Single payment (one-time)
                sessionData.line_items = [
                    {
                        price_data: {
                            currency: 'usd',             // Payment currency
                            product_data: {
                                name: 'Subscription Plan', // Customize the product name
                            },
                            unit_amount: amount,         // Amount in cents (1000 = $10.00)
                        },
                        quantity: 1,
                    },
                ];
            } else {
                // Logic for recurring subscription (7 days or 30 days)
                const priceId = selectedPlanName === 'Days7' 
                    ? process.env.STRIPE_PRICE_7DAYS 
                    : process.env.STRIPE_PRICE_20DAYS;
                
                sessionData.mode = 'subscription'; // Recurring subscription
                sessionData.line_items = [
                    {
                        price: priceId, // Stripe price ID for 7 days or 30 days
                        quantity: 1,
                    },
                ];
            }
    
            // Create the checkout session
            const session = await stripe.checkout.sessions.create(sessionData);
    
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

    async handleStripeWebhook(ctx: Context) {
        console.log("handleStripeWebhook called");
        const rawBody = ctx.request.body[Symbol.for('unparsedBody')];
        const sig = ctx.request.headers['stripe-signature']; // Get the signature from the headers
        try {
            // Verify the event by constructing it with the raw body and signature
            const event = stripe.webhooks.constructEvent(
                rawBody, // Use the request body
                sig,
                process.env.STRIPE_WEBHOOK_SECRET // Your webhook secret
            );
    
            // Handle the event based on its type
            if (event.type === 'invoice.payment_succeeded') {
                const invoice = event.data.object;
                console.log("event.data.object", event.data.object);
                const customerEmail = invoice.customer_email ;
    
                const stripePaymentId = typeof invoice.payment_intent === 'string' 
                    ? invoice.payment_intent 
                    : invoice.payment_intent?.id;
    
                const stripeSubscriptionId = typeof invoice.subscription === 'string' 
                    ? invoice.subscription 
                    : invoice.subscription?.id;
    
                const subscriptionStatus = invoice.status;
                const startDate = new Date(invoice.period_start * 1000).toISOString().split('T')[0]; // Convert UNIX timestamp to date
                const endDate = new Date(invoice.period_end * 1000).toISOString().split('T')[0];     // Convert UNIX timestamp to date

                // Create the subscription entry in the Strapi database
                await strapi.entityService.create('api::subscription.subscription', {
                    data: {
                        User: customerEmail,             // Use the actual customer email from the event
                        SubscriptionType: "Days7",       // You may want to map this based on actual event data
                        StartDate: startDate,            // Actual subscription start date
                        EndDate: endDate,                // Actual subscription end date
                        StripePaymentID: stripePaymentId,   // Actual Stripe payment ID
                        StripeSubscriptionID: stripeSubscriptionId, // Actual Stripe subscription ID
                        PaymentStatus: subscriptionStatus,  // Actual payment status from the event
                        // status: 'active',  // Optionally mark the subscription as active
                        SubscriptionDetails:ctx.request.body
                    },
                });
    
                console.log("Subscription data inserted successfully.");
            } else {
                console.log(`Unhandled event type: ${event.type}`);
            }
    
            ctx.body = { received: true };
        } catch (err) {
            console.error('Error processing webhook:', err);
            ctx.throw(400, `Webhook Error: ${err.message}`);
        }
    }
    
    
};

export default stripeController;
