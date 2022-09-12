/**
 * article controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::article.article", () => ({
  async find(ctx) {
    const fieldsToRemove =
      new URLSearchParams(ctx.request.url).get("!fields").split(",") || [];
    const { data, meta } = await super.find(ctx);

    //TODO: custom parameter to remove selected fields from the response
    //TODO: example: http://...?page=1&!fields=content,title
    const result = data.map((item) => {
      Object.keys(item.attributes).forEach((key) => {
        fieldsToRemove.includes(key) ? delete item.attributes[key] : null;
      });
      return item;
    });

    return { data: result, meta };
  },
}));
