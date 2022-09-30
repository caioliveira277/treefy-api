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
