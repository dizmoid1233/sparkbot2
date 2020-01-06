const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'out'),
    filename: 'bundle.js',
    library: 'JSAZLyrics',
    libraryTarget:'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
};
