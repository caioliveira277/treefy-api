/**
 * article controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::article.article", () => ({
  async find(ctx) {
    const fieldsToRemove =
      new URLSearchParams(ctx.request.url).get("!fields")?.split(",") || [];
    const { data: articles, meta } = await super.find(ctx);

    let formatedArticles = articles;

    // custom parameter to remove selected fields from the response
    // example: http://...?page=1&!fields=content,title
    formatedArticles = articles.map((item) => {
      Object.keys(item.attributes).forEach((key) => {
        fieldsToRemove.includes(key) ? delete item.attributes[key] : null;
      });
      return item;
    });

    const feedbacks = await strapi.entityService.findMany(
      "api::feedback.feedback",
      {
        select: ["rating"],
        populate: {
          article: {
            fields: ["id"],
            where: {
              $in: articles.map((article) => article.id),
            },
          },
        },
      }
    );

    formatedArticles = formatedArticles.map((article) => {
      let totalRatings = null;
      let quantity = 0;
      feedbacks.forEach((feedback) => {
        if (feedback.article.id === article.id) {
          totalRatings += feedback.ratingPoints;
          quantity += 1;
        }
      });

      return {
        ...article,
        feedbacks: {
          averageRatings:
            totalRatings === null ? null : totalRatings / quantity,
        },
      };
    });

    return { data: formatedArticles, meta };
  },
}));
