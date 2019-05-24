const webpack = require('webpack');
const { join, resolve } = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;

let webpackConfig = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        filename: '[name]_[chunkhash].js',
        path: join(__dirname, './dist'),
        publicPath: '/dist',
        chunkFilename: '[name]_[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue/,
                use: [
                    {
                         loader: 'vue-loader'
                    }
                ]
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    env !== 'production'
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader']
            },
            {
                test: /\.css$/,
                use: [
                    env !== 'production'
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
                use: [{
                  loader: 'url-loader',
                  options: {
                    limit: 1000,
                    name: '[hash:8].[name].[ext]'
                  }
                }]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: '/index.html',
            inject: true
        })
    ]
}
if (env === 'production') {
    webpackConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename: '[name]_[chunkhash].css'
        })
    )
}

module.exports = webpackConfig;

