// src/api/industry/routes/custom-routes.ts


export default {
  routes: [
    {
      method: 'GET',
      path: '/industries-with-sections-and-topics',
      handler: 'industry.findWithSectionsAndTopics',
      config: {
        auth: false,
        policies: ['global::firebaseAuth'],
      },
    },
  ],
};
