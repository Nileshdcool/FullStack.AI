// src/api/topic/routes/topic.ts

export default {
  routes: [
    {
      method: 'GET',
      path: '/topics/:id/questions',
      handler: 'topic.getQuestionsByTopic', // Ensure this matches the function in the controller
      config: {
        auth: false, // Disable Strapi's default authentication for this route
          policies: ['global::firebaseAuth'], // Apply Firebase auth policy
      },
    },  
  ],
};
