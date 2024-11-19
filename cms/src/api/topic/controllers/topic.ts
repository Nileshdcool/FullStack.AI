import { factories } from '@strapi/strapi';

interface TopicWithQuestions {
  questions: Array<{
    id: number;
    content: string;
    answers?: Array<{ id: number; content: string }>;
    question_level: { level_name: string };
    readStatus?: boolean | null; // Allow null
    statusId?: string | null; // Add statusId field as optional
  }>;
}

export default factories.createCoreController('api::topic.topic', ({ strapi }) => ({
  async getQuestionsByTopic(ctx) {
    const { id } = ctx.params;
    const isSubscribed = ctx.request.headers['x-user-subscribed'] === 'true';
    const userEmail = Array.isArray(ctx.request.headers['x-user-email']) 
      ? ctx.request.headers['x-user-email'][0] 
      : ctx.request.headers['x-user-email'];
    console.log("User Email:", userEmail);

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
      })) as unknown as TopicWithQuestions;

      // If topic is not found, return 404 error
      if (!topicWithQuestions) {
        return ctx.notFound('Topic not found');
      }

      // Filter out questions without answers
      topicWithQuestions.questions = topicWithQuestions.questions.filter(
        (question) => question.answers && question.answers.length > 0
      );

      // Fetch question read statuses for the user based on question id and user email
      const readStatuses = await strapi.entityService.findMany('api::question-read-status.question-read-status', {
        filters: { UserEmail: userEmail },
      });

      // Map read status to questions
      topicWithQuestions.questions = topicWithQuestions.questions.map((question) => {
        const readStatus = readStatuses.find((status) => status.QuestionId == String(question.id) && status.UserEmail === userEmail);
        return {
          ...question,
          readStatus: readStatus ? readStatus.ReadStatus : false, // Set read status (false if not found)
          statusId: readStatus ? readStatus.documentId : null, // Use null if readStatus is undefined
        };
      });

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
