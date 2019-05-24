const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');

module.exports = webpackMerge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map'
})
