"use strict";
/**
 * user-plant router
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreRouter("api::user-plant.user-plant", {
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
    },
    only: ["create", "find", "update"],
});
