// path/to/your/main/config/file

import { FRONTEND_URL, BACKEND_URL, FORM_LIMIT, JSON_LIMIT, MAX_FILE_SIZE } from "./constants";

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
                FRONTEND_URL,  
                BACKEND_URL,  
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
            formLimit: FORM_LIMIT, 
            jsonLimit: JSON_LIMIT, 
            formidable: {
                maxFileSize: MAX_FILE_SIZE, 
            },
            onRouteMatch: (ctx:any) => ctx.path === '/stripe/webhook',
        },
    },
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
];
