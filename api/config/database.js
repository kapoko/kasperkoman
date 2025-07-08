module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        database: "strapi",
        username: "strapi",
        password: "strapi",
        port: 5432,
        host: "localhost",
      },
      options: {},
    },
  },
});
