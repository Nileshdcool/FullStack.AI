export default [
    'strapi::errors',
    {
        name: 'strapi::security',
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'script-src': ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
                    'img-src': ["'self'", 'data:', 'blob:', 'cdn.jsdelivr.net'],
                    'connect-src': ["'self'", 'http:'], // Adjust based on your backend setup
                },
            },
        },
    },
    {
        name: 'strapi::cors',
        config: {
            enabled: true,
            origin: [
                process.env.FRONTEND_URL || 'http://localhost:3000', // Frontend origin
                process.env.BACKEND_URL || 'http://localhost:1337', // Backend origin
            ],
            methods: ["GET", "POST", "PUT"],
            headers: '*', // Allow all headers
        },
    },
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    {
        name: 'strapi::body',
        config: {
            includeUnparsed: true,
            patchKoa: true,
            formLimit: '56kb',
            jsonLimit: '1mb',
            formidable: {
                maxFileSize: 200 * 1024 * 1024, // 200 MB limit
            },
            onRouteMatch: (ctx) => ctx.path === '/stripe/webhook',
        },
    },
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
];
