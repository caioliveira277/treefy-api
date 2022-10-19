/**
 * user-plant router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::user-plant.user-plant", {
  config: {
    create: {
      middlewares: ["global::jwt-cognito"],
    },
    find: {
      middlewares: ["global::jwt-cognito"],
    },
    update: {
      middlewares: ["global::jwt-cognito"],
    },
    delete: {
      middlewares: ["global::jwt-cognito"],
    },
  },
  only: ["create", "find", "update", "delete"],
});
