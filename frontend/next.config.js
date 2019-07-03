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
    // cssModules: true,
    // cssLoaderOptions: {
    //   importLoaders: 1,
    //   localIdentName: "__[hash:base64:5]",
    // },
    publicRuntimeConfig: { // Will be available on both server and client
        API_URL: 'http://localhost:1337',
        API_URL_SERVER: 'http://api:1337'
    }
})