const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/js/main.js'),
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
          template: path.resolve(__dirname, 'index.html'),
          inject: 'body'
      })
  ],
  devServer: {
      contentBase: path.resolve(__dirname, 'src'),
      openPage: 'http://localhost:8000',
  } 
};