"use strict";
/**
 * `jwt-cognito` middleware
 */
Object.defineProperty(exports, "__esModule", { value: true });
const aws_jwt_verify_1 = require("aws-jwt-verify");
exports.default = (_config, { strapi }) => {
    const verifier = aws_jwt_verify_1.CognitoJwtVerifier.create({
        userPoolId: process.env.USERPOOLID,
        tokenUse: "id",
        clientId: process.env.USERPOOLWEBCLIENTID,
    });
    return async (ctx, next) => {
        strapi.log.info("In jwt-cognito middleware.");
        try {
            const cognitoAccessToken = ctx.request.header.authorization;
            const payload = await verifier.verify(cognitoAccessToken);
            ctx.response.set({
                authenticatedUserId: payload["cognito:username"],
            });
            await next();
        }
        catch {
            return ctx.unauthorized("Invalid access token");
        }
    };
};
