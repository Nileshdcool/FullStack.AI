/**
 * login-history router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::login-history.login-history', {
    config: {
      // Define routes and their configurations
      find: {
        auth: false, // Disable Strapi's default authentication for this route
        policies: ['global::firebaseAuth'], // Apply Firebase auth policy
      },
      findOne: {
        auth: false, // Disable Strapi's default authentication for this route
        policies: ['global::firebaseAuth'], // Apply Firebase auth policy
      },
      create: {
        auth: false, // Disable Strapi's default authentication for this route
        policies: ['global::firebaseAuth'], // Apply Firebase auth policy
      },
      update: {
        auth: false, // Disable Strapi's default authentication for this route
        policies: ['global::firebaseAuth'], // Apply Firebase auth policy
      },
      delete: {
        auth: false, // Disable Strapi's default authentication for this route
        policies: ['global::firebaseAuth'], // Apply Firebase auth policy
      },
    },
  });
  