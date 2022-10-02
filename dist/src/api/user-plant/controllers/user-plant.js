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
    async update(ctx) {
        const userId = ctx.response.get("authenticateduserid");
        const userPlantId = ctx.request.params.id;
        if (!userPlantId)
            throw new Error();
        const userPlants = await strapi.db
            .query("api::user-plant.user-plant")
            .update({
            where: {
                id: userPlantId,
                userId: userId,
            },
            data: ctx.request.body.data,
        });
        return { data: { id: userPlantId, attributes: userPlants }, meta: {} };
    },
    async delete(ctx) {
        const userId = ctx.response.get("authenticateduserid");
        const userPlantId = ctx.request.params.id;
        if (!userPlantId)
            throw new Error();
        const userPlant = await strapi.db
            .query("api::user-plant.user-plant")
            .delete({
            where: {
                id: userPlantId,
                userId: userId,
            },
        });
        return { data: { id: userPlantId, attributes: userPlant }, meta: {} };
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
