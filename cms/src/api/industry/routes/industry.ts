// src/api/industry/routes/industry.ts

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::industry.industry', {
  config: {
    find: {
      auth: false,
      policies: ['global::firebaseAuth'],
    },
    findOne: {
      auth: false,
      policies: ['global::firebaseAuth'],
    },
    create: {
      auth: false,
      policies: ['global::firebaseAuth'],
    },
    update: {
      auth: false,
      policies: ['global::firebaseAuth'],
    },
    delete: {
      auth: false,
      policies: ['global::firebaseAuth'],
    },
  },
});
