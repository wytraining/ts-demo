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
    css: {
        loaderOptions: {
            sass: {
                // sass-loader 版本不同，loaderOptions 中的 additionalData 的键名也不同
                data: `
                    @import "@/styles/variables.scss";
                    @import "@/styles/theme.scss";
                `// v8-
                // prependData: '@import "@/styles/variables.scss"'  //v8
                // additionalData: '@import "@/styles/variables.scss"'   //v10+
            }
        }
    },
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
                target: "https://www.fastmock.site/mock/bcf4a1b0eda8059aaab99794676b49e9", //mock
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            },
            "/api2/": {
                target: "https://www.fastmock.site/mock/a081f9a40cf35cc3b876cf8705dfc249", // mock2
                changeOrigin: true,
                pathRewrite: {
                    "^/api2": ""
                }
            },
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
