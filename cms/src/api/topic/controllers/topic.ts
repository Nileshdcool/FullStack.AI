import { factories } from '@strapi/strapi';

interface TopicWithQuestions {
  questions: Array<{
    id: number;
    content: string;
    answers?: Array<{ id: number; content: string }>;
    question_level: { level_name: string };
  }>;
}

export default factories.createCoreController('api::topic.topic', ({ strapi }) => ({
  async getQuestionsByTopic(ctx) {
    const { id } = ctx.params;
    const isSubscribed = ctx.request.headers['x-user-subscribed'] === 'true';


    try {

      // Fetch topic with questions and respective answers
      const topicWithQuestions = (await strapi.entityService.findOne('api::topic.topic', id, {
        populate: {
          questions: {
            populate: {
              answers: true,
              question_level: {
                fields: ['level_name'], // Only fetch level_name
              },
            },
          },
        },
      })) as unknown as TopicWithQuestions; // First cast to 'unknown', then to 'TopicWithQuestions'

      // If topic is not found, return 404 error
      if (!topicWithQuestions) {
        return ctx.notFound('Topic not found');
      }

      // Modify questions based on subscription status
      if (!isSubscribed && topicWithQuestions.questions && topicWithQuestions.questions.length > 1) {
        topicWithQuestions.questions = topicWithQuestions.questions.map((question, index) => {
          if (index === 0) {
            return question; // Keep the first question with answers
          } else {
            return { ...question, answers: [] }; // Omit answers for other questions
          }
        });
      }

      ctx.send(topicWithQuestions);

    } catch (error) {
      ctx.throw(500, `Failed to fetch questions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
}));
