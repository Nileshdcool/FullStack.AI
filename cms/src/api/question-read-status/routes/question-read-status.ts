/**
 * question-read-status router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::question-read-status.question-read-status', {
  config: {
    // Define routes and their configurations
    find: {
      auth: false, // Disable Strapi's default authentication for this route
      policies: ['global::firebaseAuth'], // Apply Firebase auth policy
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
