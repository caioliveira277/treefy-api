/**
 * viewed-article controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::viewed-article.viewed-article",
  () => ({
    async create(ctx) {
      try {
        const userId = ctx.response.get("authenticateduserid");
        ctx.request.body.data.userId = userId;

        if (!ctx.request.body.data.article) throw new Error();

        const { data: viewedArticles, meta } = await super.create(ctx);
        return { data: viewedArticles, meta };
      } catch {
        return ctx.badRequest("Bad request");
      }
    },
    async find(ctx) {
      try {
        const userId = ctx.response.get("authenticateduserid");
        const articleId = ctx.request.query.filters.article;

        ctx.request.query.filters = {
          $and: [{ userId }, { article: articleId }],
        };

        const { data: feedback, meta } = await super.find(ctx);
        return { data: feedback, meta };
      } catch (error) {
        console.log(error);
        return ctx.badRequest("Bad request");
      }
    },
  })
);
