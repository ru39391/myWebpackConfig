const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: __dirname + '/src/js/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
      rules: [ 
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: __dirname + '/index.html',
          inject: 'body'
      })
  ],
  devServer: {
      contentBase: '/static'
  } 
};