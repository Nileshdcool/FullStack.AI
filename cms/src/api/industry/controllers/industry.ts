import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::industry.industry', ({ strapi }) => ({
  async findWithSectionsAndTopics(ctx) {
    try {
      const industries = await strapi.entityService.findMany('api::industry.industry', {
        populate: {
          sections: {
            populate: 'topics',
          },
        },
      });
      ctx.send(industries);
    } catch (error) {
      ctx.throw(500, error instanceof Error ? error.message : String(error));
    }
  },
}));
