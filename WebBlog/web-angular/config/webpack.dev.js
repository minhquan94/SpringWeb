var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('../src/main/resources/static'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  watch: true,
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 5000
  },
  devServer: {
    clientLogLevel: "info",
    historyApiFallback: true,
    port: 9000,
    open: true,
    proxy: {
      "**": {
        target: "http://localhost:8082",
        secure: false
      },
      "/ws-ca": {
        target: "http://localhost:8082",
        auth: "admin:admin",
        ws: true
      }
    }
  }
});