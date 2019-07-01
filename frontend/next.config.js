const withSass = require('@zeit/next-sass')

module.exports = withSass({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  publicRuntimeConfig: { // Will be available on both server and client
    API_URL: 'http://localhost:1337',
    API_URL_SERVER: 'http://api:1337'
  }
})