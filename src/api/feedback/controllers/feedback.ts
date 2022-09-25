/**
 * feedback controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::feedback.feedback", () => ({
  async create(ctx) {
    try {
      const userId = ctx.response.get("authenticateduserid");
      ctx.request.body.data.userId = userId;

      const { data: feedback, meta } = await super.create(ctx);
      return { data: feedback, meta };
    } catch (error) {
      return ctx.badRequest("Bad request");
    }
  },
}));
