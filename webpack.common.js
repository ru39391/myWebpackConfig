const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  entry: {
    //main: [path.resolve(__dirname, 'src/js/main.js'), path.resolve(__dirname, 'src/scss/main.scss')],
    main: path.resolve(__dirname, 'src/js/main.js'),
  },
  output: {
    path: path.resolve(__dirname, '..//js/'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
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
          use: [
            { loader: MiniCssExtractPlugin.loader },
            /*
            { loader: MiniCssExtractPlugin.loader, options: {
              publicPath: path.resolve(__dirname, '../static/css/')
            }},
            */
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'postcss-loader', options: {
              postcssOptions: {
                plugins: {
                  'postcss-preset-env': {
                    browsers: 'last 2 versions',
                    stage: 0,
                  }
                }
              }
            }},
            'sass-loader'
          ]
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset',
        }
      ]
  },
  plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].min.css',
      }),
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src/index.html'),
          inject: 'body'
      })
  ]  
};
