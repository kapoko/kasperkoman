'use strict';

const axios = require('axios');

/**
 * Lifecycle callbacks for the `Release` model.
 */

module.exports = {
  afterCreate: async (entry) => {
    axios.post(strapi.config.frontendBuildUrl, entry)
      .catch(() => {
          // Ignore
        }
    );
  },

  // For now these hooks are set in extensions/content-manager/services/ContentManager.js
  // because these hooks don't work 
  //
  // afterUpdate: async (entry) => {
  //   axios.post(strapi.config.frontendBuildUrl, entry)
  //     .catch(() => {
  //         // Ignore
  //       }
  //   );
  // },

  // afterDestroy: async (entry) => {
  //   axios.post(strapi.config.frontendBuildUrl, entry)
  //     .catch(() => {
  //         // Ignore
  //       }
  //   );
  // }

  // Before saving a value.
  // Fired before an `insert` or `update` query.
  // beforeSave: async (model) => {},

  // After saving a value.
  // Fired after an `insert` or `update` query.
  // afterSave: async (model, result) => {},

  // Before fetching all values.
  // Fired before a `fetchAll` operation.
  // beforeFetchAll: async (model) => {},

  // After fetching all values.
  // Fired after a `fetchAll` operation.
  // afterFetchAll: async (model, results) => {},

  // Fired before a `fetch` operation.
  // beforeFetch: async (model) => {},

  // After fetching a value.
  // Fired after a `fetch` operation.
  // afterFetch: async (model, result) => {},

  // Before creating a value.
  // Fired before an `insert` query.
  // beforeCreate: async (model) => {},

  // After creating a value.
  // Fired after an `insert` query.
  // afterCreate: async (model, result) => {},

  // Before updating a value.
  // Fired before an `update` query.
  // beforeUpdate: async (model) => {},

  // After updating a value.
  // Fired after an `update` query.
  // afterUpdate: async (model, result) => {},

  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model) => {},

  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, result) => {}
};
