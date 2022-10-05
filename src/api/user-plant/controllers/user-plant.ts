/**
 * user-plant controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::user-plant.user-plant",
  () => ({
    async create(ctx) {
      const userId = ctx.response.get("authenticateduserid");
      ctx.request.body.data.userId = userId;

      const { data: userPlants, meta } = await super.create(ctx);
      return { data: userPlants, meta };
    },
    async update(ctx) {
      const userId = ctx.response.get("authenticateduserid");
      const userPlantId = ctx.request.params.id;

      if (!userPlantId) throw new Error();

      const userPlant = await strapi.db
        .query("api::user-plant.user-plant")
        .update({
          populate: {
            species: {
              fields: ["id", "name"],
            },
          },
          where: {
            id: userPlantId,
            userId: userId,
          },
          data: ctx.request.body.data,
        });

      userPlant.species = {
        data: userPlant.species
          ? { id: userPlant.species.id, attributes: userPlant.species }
          : null,
      };

      return { data: { id: userPlantId, attributes: userPlant }, meta: {} };
    },
    async delete(ctx) {
      const userId = ctx.response.get("authenticateduserid");
      const userPlantId = ctx.request.params.id;

      if (!userPlantId) throw new Error();

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
  })
);
