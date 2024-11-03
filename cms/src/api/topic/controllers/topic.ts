import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::topic.topic', ({ strapi }) => ({
  async getQuestionsByTopic(ctx) {
    const { id } = ctx.params;

    try {
      const topicWithQuestions = await strapi.entityService.findOne('api::topic.topic', id, {
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
      });

      if (!topicWithQuestions) {
        return ctx.notFound('Topic not found');
      }

      ctx.send(topicWithQuestions);
    } catch (error) {
      ctx.throw(500, `Failed to fetch questions: ${error.message}`);
    }
  },
}));
