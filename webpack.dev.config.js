var webpack = require('webpack');
var path    = require('path');
var config  = require('./webpack.config');

config.output = {
  filename: '[name].bundle.js',
  publicPath: '/',
  path: path.resolve(__dirname, 'src')
};

config.plugins = config.plugins.concat([

  // Have webpack return the development environment for imports from 'environment'
  new webpack.NormalModuleReplacementPlugin(
    /environment/,
    path.resolve('./src/environments/environment.js')
  ),

  // Adds webpack HMR support. It act's like livereload,
  // reloading page after webpack rebuilt modules.
  // It also updates stylesheets and inline assets without page reloading.
  new webpack.HotModuleReplacementPlugin()
]);

module.exports = config;
