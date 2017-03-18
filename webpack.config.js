var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'js/dist');
var APP_DIR = path.resolve(__dirname, 'js/');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.js?/,
        exclude : /node_modules/,
        loader : 'babel-loader'
      }
    ]
  }
};

module.exports = config;