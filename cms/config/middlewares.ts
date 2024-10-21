export default [
    'strapi::errors',
    {
        name: 'strapi::security',
        config: {
            cors: {
                enabled: true,
                origin: [
                    process.env.FRONTEND_URL || 'http://localhost:3000',
                    process.env.BACKEND_URL || 'http://localhost:1337',
                ],
            },
        },
    },
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    {
        name: 'strapi::body',
        config: {
            includeUnparsed: true,  // Include raw body for specific routes
            patchKoa: true,         // Ensure the middleware works with Koa body
            formLimit: '56kb',
            jsonLimit: '1mb',
            formidable: {
                maxFileSize: 200 * 1024 * 1024, // Max file upload size
            },
            // Ensure raw body is available for the Stripe webhook route
            onRouteMatch: (ctx) => ctx.path === '/stripe/webhook',
        },
    },
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
];
