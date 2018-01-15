const path = require('path');
const webpack = require('webpack');

module.exports = {
  // webpack options
    // webpackMiddleware takes a Compiler object as first parameter
    // which is returned by webpack(...) without callback.
    entry: "./public/editor",
    output: {
        path: path.join('/.dist'),
        filename: "bundle.js",
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['latest'],
            plugins: ['transform-react-jsx'],
          }
        },
        {
          test: /\.scss$/,
          loaders: ["style-loader", "css-loader", "sass-loader"]
        },
         {
          test: /\.css/,
          loaders: ["style-loader", "css-loader"]
        }
      ]
    },
    plugins: [
      /* new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }) */
    ],
    resolve: {
      extensions: [".webpack.js", ".web.js", ".js", ".jsx", ".scss"],
    }
};