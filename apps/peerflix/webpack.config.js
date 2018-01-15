const path = require('path');

module.exports = {
  entry: './public/client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'react', 
              ["env", {
                "targets": {
                  "browsers": ["last 2 versions"]
                }
              }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  // cache: true,
};