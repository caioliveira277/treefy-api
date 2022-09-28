"use strict";
/**
 * viewed-article router
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreRouter("api::viewed-article.viewed-article", {
    config: {
        create: {
            middlewares: ["global::jwt-cognito"],
        },
        find: {
            middlewares: ["global::jwt-cognito"],
        },
    },
    only: ["create", "find"],
});
