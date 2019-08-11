const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const sass = require('@zeit/next-sass')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        }, {
            test: /\._variables\.scss$/,
            loader: 'sass-extract-loader'
        });

        if (config.mode === 'production') {
            if (Array.isArray(config.optimization.minimizer)) {
                config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({
                    cssProcessorPluginOptions: {
                        preset: ['default', { discardComments: { removeAll: true } }],
                    }
                }));
            }
        }

        return config;
    },
    publicRuntimeConfig: { // Will be available on both server and client
        API_URL: process.env.API_URL || 'http://localhost:1337',
        API_URL_SERVER: process.env.API_URL_SERVER || 'http://localhost:1337'
    },
    exportPathMap: function() {
        return {
            '/': { page: '/' },
            '/releases': { page: '/releases' },
            '/contact': { page: '/contact' },
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
        optimizeImagesInDev: false,
        webp: {
            preset: 'default',
            quality: 70,
        },
        mozjpeg: {
            quality: 80,
        },
    }]
], nextConfig);