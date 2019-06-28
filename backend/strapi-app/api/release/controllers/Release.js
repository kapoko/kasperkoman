'use strict';

/**
 * Release.js controller
 *
 * @description: A set of functions called "actions" for managing `Release`.
 */

module.exports = {

  /**
   * Retrieve release records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.release.search(ctx.query);
    } else {
      return strapi.services.release.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a release record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.release.fetch(ctx.params);
  },

  /**
   * Count release records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.release.count(ctx.query);
  },

  /**
   * Create a/an release record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.release.add(ctx.request.body);
  },

  /**
   * Update a/an release record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.release.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an release record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.release.remove(ctx.params);
  }
};
