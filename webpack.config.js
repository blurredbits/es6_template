const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const nodeEnv = process.env.NODE_ENV || 'production';
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: ["./src/app.js"]
  },
  output: {
    path: path.resolve(__dirname, "_build"),
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        presets: [
          ['es2015', { 'modules': false }]
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
    new DashboardPlugin({ port: 3001 })
  ],
  devServer: {
    quiet: false,
    port: 3001,
  }
};