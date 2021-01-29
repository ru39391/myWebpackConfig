const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin'); // PUG loader
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

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
        },
        // SVG sprite loader. Any .svg can be imported as JS object
        {
          test: /\.svg$/,
          use: [
            { loader: 'svg-sprite-loader', options: {
              extract: true,
              publicPath: '/'
            } }
          ]
        },
        {
          test: /\.pug$/,
          // include: path.join(__dirname, '../src/pug/'),
          oneOf: [{
            resourceQuery: /^\?pug/,
            use: ["pug-plain-loader"]
          }, {
            use: [
              "html-loader",
              "pug-html-loader"
            ]
          }]
          // loader: 'pug-html-loader'
          // use: [
          //   "file-loader?name=[path][name].html",
          //   'extract-loader',
          //   'html-loader',
          //   'pug-html-loader'
          // ]
        }
      ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '/src/pug/index.pug'),
      minify: false
    }),
    // also generate a test page
    new HtmlWebpackPlugin({
      filename: 'test',
      template: path.resolve(__dirname, '/src/pug/test.pug'),
      minify: false
    }),
    new SpriteLoaderPlugin()
  ]  
};
