var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'app': './js/main.js',
    'styles': './scss/main.scss'
  },
  output: {
    path: path.dirname(__dirname) + '/assets/static',
    filename: '[name].js'
  },
  devtool: '#cheap-module-source-map',
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/,
        loader: 'babel-loader' },
      { test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader', 'css-loader!postcss-loader!sass-loader') },
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader', 'css-loader!postcss-loader') },
      { test: /\.(woff2?|ttf|eot|svg|png|jpe?g|gif)$/,
        loader: 'file' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader" }
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
    })
  ],
  sassLoader: {
    includePaths: [path.resolve(__dirname, "node_modules")]
  },
  plugins: [
    new ExtractTextPlugin('styles.css', {
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};