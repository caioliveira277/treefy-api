"use strict";
/**
 * feedback router
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreRouter("api::feedback.feedback", {
    config: {
        create: {
            middlewares: ["global::jwt-cognito"],
        },
    },
    only: ["create"],
});
