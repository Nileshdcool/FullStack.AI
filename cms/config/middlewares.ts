module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      cors: {
        enabled: true,
        origin: [
          process.env.FRONTEND_URL || 'http://localhost:3000', // Fallback to localhost:3000 if FRONTEND_URL is not defined
          process.env.BACKEND_URL || 'http://localhost:1337', // Fallback to localhost:1337 if BACKEND_URL is not defined
        ],
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
