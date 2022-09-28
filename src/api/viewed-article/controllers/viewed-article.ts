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
        const articleId = ctx.request.body.data?.article;
        ctx.request.body.data.userId = userId;

        if (!articleId) throw new Error();

        const viewed = await strapi.entityService.findMany(
          "api::viewed-article.viewed-article",
          {
            fields: ["id"],
            filters: {
              $and: [
                {
                  userId,
                },
                {
                  article: articleId,
                },
              ],
            },
            limit: 1,
          }
        );

        if (viewed.length > 0) {
          return ctx.send(
            {
              message: "not modified",
            },
            200
          );
        }

        const { data: viewedArticles, meta } = await super.create(ctx);
        return { data: viewedArticles, meta };
      } catch {
        return ctx.badRequest("Bad request");
      }
    },
    async find(ctx) {
      try {
        const userId = ctx.response.get("authenticateduserid");

        ctx.request.query.filters = {
          userId: { $eq: userId },
        };

        const { data: feedback, meta } = await super.find(ctx);
        return { data: feedback, meta };
      } catch (error) {
        return ctx.badRequest("Bad request");
      }
    },
  })
);
