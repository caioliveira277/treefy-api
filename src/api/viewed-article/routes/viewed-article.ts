/**
 * viewed-article router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::viewed-article.viewed-article",
  {
    config: {
      create: {
        middlewares: ["global::jwt-cognito"],
      },
      find: {
        middlewares: ["global::jwt-cognito"],
      },
    },
    only: ["create", "find"],
  }
);
