module.exports = ({ env }) => ({
  url: "http://0.0.0.0:1337",
  proxy: {
    enabled: false,
  },
  cron: {
    enabled: false,
  },
  admin: {
    autoOpen: false,
    url: "/dashboard",
  },
});
