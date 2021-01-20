const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/js/main.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        { 
          test: /\.css$/, 
          use: [{
            loader: MiniCssExtractPlugin.loader,
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          }] 
        },
        {
          test: /\.(sass|scss)$/,
          use: [{            
            loader: MiniCssExtractPlugin.loader,
          }, {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }]
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/images',
        }
      ]
  },
  plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'index.html'),
          inject: 'body'
      })
  ],
  devServer: {
      contentBase: path.resolve(__dirname, 'src'),
      open: true,
  } 
};