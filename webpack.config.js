const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    //main: [path.resolve(__dirname, 'src/js/main.js'), path.resolve(__dirname, 'src/scss/main.scss')],
    main: path.resolve(__dirname, 'src/js/main.js'),
  },
  output: {
    path: path.resolve(__dirname, 'assets/'),
    filename: 'js/[name].bundle.js',
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
          test: /\.(sass|scss)$/,
          //use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader', 'sass-loader']
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'assets/images',
        }
      ]
  },
  plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].min.css',
      }),
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