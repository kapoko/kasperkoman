const withSass = require('@zeit/next-sass')

module.exports = withSass({
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        }, {
            test: /\._variables\.scss$/,
            loader: 'sass-extract-loader'
        });

        return config;
    },
    publicRuntimeConfig: { // Will be available on both server and client
        API_URL: 'http://localhost:1337',
        API_URL_SERVER: 'http://localhost:1337'
    },
    exportPathMap: function() {
        return {
            '/': { page: '/' },
            '/releases': { page: '/releases' },
            '/bookings': { page: '/bookings' },
        };
    }
})