'use strict';

/**
 * Gig.js controller
 *
 * @description: A set of functions called "actions" for managing `Gig`.
 */

module.exports = {

  /**
   * Retrieve gig records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.gig.search(ctx.query);
    } else {
      return strapi.services.gig.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a gig record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.gig.fetch(ctx.params);
  },

  /**
   * Count gig records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.gig.count(ctx.query);
  },

  /**
   * Create a/an gig record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.gig.add(ctx.request.body);
  },

  /**
   * Update a/an gig record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.gig.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an gig record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.gig.remove(ctx.params);
  }
};
