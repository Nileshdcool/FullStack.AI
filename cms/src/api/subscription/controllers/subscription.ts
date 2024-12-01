// ./api/subscription/controllers/subscription.ts

import { factories } from '@strapi/strapi';
import { Context } from 'koa';

export default factories.createCoreController('api::subscription.subscription', ({ strapi }) => ({
    async find(ctx: Context) {
        // Extract query parameters for filtering
        const { user, SubscriptionType, StripePaymentID } = ctx.query;

        const filters: any = {};

        // Apply filters based on query parameters
        if (user) {
            filters.User = user; // Assuming 'user' is the field name for user email
        }
        if (SubscriptionType) {
            filters.SubscriptionType = SubscriptionType; // Assuming this is the field name for the subscription type
        }
        if (SubscriptionType) {
            filters.SubscriptionType = SubscriptionType; // Assuming this is the field name for the subscription type
        }

        if (StripePaymentID) {
            filters.StripePaymentID = StripePaymentID; // Assuming this is the field name for the subscription type
        }

        const sort = [{ EndDate: 'desc' }];

        // Call the default find method with filters
        const subscriptions = await strapi.service('api::subscription.subscription').find({ filters,
            sort });

        return subscriptions;
    },
}));
