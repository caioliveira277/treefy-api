"use strict";
/**
 * feedback controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::feedback.feedback", () => ({
    async create(ctx) {
        try {
            const userId = ctx.response.get("authenticateduserid");
            ctx.request.body.data.userId = userId;
            if (!ctx.request.body.data.article)
                throw new Error();
            const { data: feedback, meta } = await super.create(ctx);
            return { data: feedback, meta };
        }
        catch {
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
        }
        catch (error) {
            console.log(error);
            return ctx.badRequest("Bad request");
        }
    },
}));
