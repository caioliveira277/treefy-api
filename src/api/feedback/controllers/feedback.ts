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

      if (ctx.request.query.filters) {
        ctx.request.query.filters.userId = { $eq: userId };
      } else {
        ctx.request.query.filters = { userId: { $eq: userId } };
      }

      const { data: feedback, meta } = await super.find(ctx);
      return { data: feedback, meta };
    } catch (error) {
      console.log(error);
      return ctx.badRequest("Bad request");
    }
  },
}));
