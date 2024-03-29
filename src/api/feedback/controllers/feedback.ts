/**
 * feedback controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::feedback.feedback", () => ({
  async create(ctx) {
    try {
      const userId = ctx.response.get("authenticateduserid");
      ctx.request.body.data.userId = userId;

      if (!ctx.request.body.data.article) throw new Error();

      const { data: feedback, meta } = await super.create(ctx);
      return { data: feedback, meta };
    } catch {
      return ctx.badRequest("Bad request");
    }
  },
  async find(ctx) {
    try {
      const userId = ctx.response.get("authenticateduserid");
      const articleId = ctx.request.query.filters?.article;

      ctx.request.query.filters = {
        $and: [{ userId }],
      };

      if (articleId) {
        ctx.request.query.filters.$and.push({ article: articleId });
      }

      const { data: feedback, meta } = await super.find(ctx);
      return { data: feedback, meta };
    } catch (error) {
      return ctx.badRequest("Bad request");
    }
  },
}));
