const path = require("path");
const webpack = require("webpack");
const WebpackNotifierPlugin = require("webpack-notifier");
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css', 'json'];
const tsImportPluginFactory = require('ts-import-plugin');
process.env.VUE_APP_TIME  = new Date().valueOf();

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    // lintOnSave: true,
    publicPath: "./",
    transpileDependencies: [
        'vue-echarts',
        'resize-detector',
        /iview.src.(?!utils.date\.js\b).+js$/
    ],
    chainWebpack: config => {
        // config.resolve.alias.set("@", resolve("src"));
    },
    devServer: {
        proxy: {
            "/api/": {
                // target: "http://172.18.61.192:8098",
                target: "http://218.108.6.126:8888", //线上
                // target: "https://www.fastmock.site/mock/bcf4a1b0eda8059aaab99794676b49e9", //mock
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
    configureWebpack: {
        // devtool: false,
        optimization: {
            splitChunks: {
                chunks: 'async',
                minSize: 1000,
                minChunks: 1,
                maxAsyncRequests: 10,
                maxInitialRequests: 5,
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                    },
                    default: {
                        minChunks: 1,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                    dll: {
                        test: /[\\/]node_modules[\\/](vue|vue-router|vuex|iview)[\\/]/,
                        name: 'dll',
                        chunks: 'all',
                    },
                },
            },
        },
        plugins: [
            new CompressionWebpackPlugin({
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                deleteOriginalAssets: false
            }),
            new WebpackNotifierPlugin({alwaysNotify: true}),
            // new BundleAnalyzerPlugin({
            //     analyzerPort: 6543
            // })
        ]
    },
};
