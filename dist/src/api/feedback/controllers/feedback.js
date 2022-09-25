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
            const { data: feedback, meta } = await super.create(ctx);
            return { data: feedback, meta };
        }
        catch (error) {
            return ctx.badRequest("Bad request");
        }
    },
}));
