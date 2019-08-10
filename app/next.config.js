const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const sass = require('@zeit/next-sass')

const nextConfig = {
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
    postcssLoaderOptions: { 
        parser: true, 
        autoprefixer: true 
    },
    publicRuntimeConfig: { // Will be available on both server and client
        API_URL: process.env.API_URL || 'http://localhost:1337',
        API_URL_SERVER: process.env.API_URL_SERVER || 'http://localhost:1337'
    },
    exportPathMap: function() {
        return {
            '/': { page: '/' },
            '/releases': { page: '/releases' },
            '/bookings': { page: '/bookings' },
        };
    }
};

module.exports = withPlugins([
    [sass, { 
        postcssLoaderOptions: { 
            parser: true, 
            autoprefixer: true 
        },
    }],
    [optimizedImages, {
        imagesFolder: 'images',
        optimizeImagesInDev: true,
        webp: {
            preset: 'default',
            quality: 75,
        },
    }]
], nextConfig);