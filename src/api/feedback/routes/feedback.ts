/**
 * feedback router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::feedback.feedback", {
  config: {
    create: {
      middlewares: ["global::jwt-cognito"],
    },
  },
  only: ["create"],
});
