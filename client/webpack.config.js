const path = require('path');
const webpack = require('webpack');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ArcGISPlugin = require("@arcgis/webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

module.exports = {
    entry: {
        index: ["@dojo/framework/shim/Promise", './src/config.ts', "./src/index.tsx"]
    },

    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                terserOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: false }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "resolve-url-loader",
                        options: {
                            includeRoot: true,
                            includePaths: ['node_modules']
                        }
                    }
                ]
            },
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin([
            { from: 'public/static', to: 'static' },
            { from: 'public/manifest.json', },
            { from: './public/.htaccess', }
        ]),
        new ArcGISPlugin({
            features: {
                "3d": false
            }
        }),

        new HtmlWebpackPlugin({
            title: "ArcGIS Template Application",
            template: "./public/index.html",
            filename: "./index.html",
            //favicon: "./src/assets/favicon.ico",
            chunksSortMode: "none",
            inlineSource: ".(css)$"
        }),

        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].css",
            chunkFilename: "[id].css"
        })
    ],

    resolve: {
        modules: ['src', 'node_modules'],
        extensions: [".ts", ".tsx", ".js", ".scss", ".css"]
    },
    node: {
        process: false,
        global: false,
        fs: "empty"
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        open: true,
        historyApiFallback: true,
    },
};