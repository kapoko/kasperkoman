module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        client: "mongo",
        host: env("DATABASE_HOST" || "localhost"),
        port: env("DATABASE_PORT" || 27017),
        srv: env("DATABASE_SRV" || false),
        database: env("DATABASE_NAME" || "strapi"),
        username: env("DATABASE_USERNAME" || ""),
        password: env("DATABASE_PASSWORD" || ""),
      },
      options: {
        authenticationDatabase: "strapi",
        ssl: false,
      },
    },
  },
});
