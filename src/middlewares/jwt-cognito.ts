/**
 * `jwt-cognito` middleware
 */

import { Strapi } from "@strapi/strapi";
import { CognitoJwtVerifier } from "aws-jwt-verify";

export default (_config, { strapi }: { strapi: Strapi }) => {
  const verifier = CognitoJwtVerifier.create({
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
    } catch {
      return ctx.unauthorized("Invalid access token");
    }
  };
};
