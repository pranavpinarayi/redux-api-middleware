var webpack = require('webpack');
var path = require('path');

const { NODE_ENV } = process.env;
module.exports = {
  context: path.join(__dirname),
  entry: [
          './src/index',
         ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [
                    'es2016',
                   ],
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
  ],
};
