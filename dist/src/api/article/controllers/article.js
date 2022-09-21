"use strict";
/**
 * article controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const handleFormatArticle = async (articles, ctx) => {
    var _a;
    const fieldsToRemove = ((_a = new URLSearchParams(ctx.request.url).get("!fields")) === null || _a === void 0 ? void 0 : _a.split(",")) || [];
    let formatedArticles = articles;
    // custom parameter to remove selected fields from the response
    // example: http://...?page=1&!fields=content,title
    formatedArticles = articles.map((item) => {
        Object.keys(item.attributes).forEach((key) => {
            fieldsToRemove.includes(key) ? delete item.attributes[key] : null;
        });
        return item;
    });
    const feedbacks = await strapi.entityService.findMany("api::feedback.feedback", {
        select: ["rating"],
        populate: {
            article: {
                fields: ["id"],
                where: {
                    $in: articles.map((article) => article.id),
                },
            },
        },
    });
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
                averageRatings: totalRatings === null ? null : totalRatings / quantity,
            },
        };
    });
    return formatedArticles;
};
exports.default = strapi_1.factories.createCoreController("api::article.article", () => ({
    async findOne(ctx) {
        const { data: article, meta } = await super.findOne(ctx);
        const formatedArticles = await handleFormatArticle([article], ctx);
        return { data: formatedArticles[0], meta };
    },
    async find(ctx) {
        const { data: articles, meta } = await super.find(ctx);
        const formatedArticles = await handleFormatArticle(articles, ctx);
        return { data: formatedArticles, meta };
    },
}));
