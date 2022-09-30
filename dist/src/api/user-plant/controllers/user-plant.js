"use strict";
/**
 * user-plant controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::user-plant.user-plant", () => ({
    async create(ctx) {
        const userId = ctx.response.get("authenticateduserid");
        ctx.request.body.data.userId = userId;
        const { data: userPlants, meta } = await super.create(ctx);
        return { data: userPlants, meta };
    },
    async find(ctx) {
        const userId = ctx.response.get("authenticateduserid");
        ctx.request.query.filters = {
            userId: { $eq: userId },
        };
        const { data: userPlants, meta } = await super.find(ctx);
        return { data: userPlants, meta };
    },
}));
