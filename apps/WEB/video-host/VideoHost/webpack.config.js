module.exports = {
  entry: './client/scripts/index.js',
  output: {
    filename: 'bundle.js',
    path: './client/dist/scripts',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['latest'],
          plugins: ['inferno'],
        },
      },
    ],
  },
};
