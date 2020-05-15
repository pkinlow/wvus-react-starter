const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mode = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === "production" ? "production" : "development";
const useAnalyzer = (process.env.USE_ANALYZER && process.env.USE_ANALYZER.toLowerCase() == "true") === true;
const appName = require("./package.json").name;
const version = require("./package.json").version;
const output_filename = `${appName}.js`;
const isProduction = mode === "production";
const plugins = [];
let devtool = "source-map";
const entries = [];

if (useAnalyzer === true) {
  plugins.push(new BundleAnalyzerPlugin());
}

if (isProduction) {
  // Include Bundle Analyzer On Prod Build
  plugins.push(new MiniCssExtractPlugin({
    filename: `${appName}.main.min.css`,
    ignoreOrder: false
  }));
} else if (mode === "development") {
  devtool = "inline-source-map";
  // entries.push('./src/helpers/devInjection.js');

  plugins.push(new MiniCssExtractPlugin({
    filename: `${appName}.main.min.css`,
    ignoreOrder: false
  }));
}

module.exports = {
  mode: mode,
  entry: entries.concat(['./src/index.js']),
  output: {
    path: path.resolve(__dirname, 'dist/v'+version +'/'),
    filename: output_filename
  },
  devtool: devtool,
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        loader: [ "eslint-loader" ]
      },
      {
        test: /\.(js|jsx)$/,
        // exclude: /node_modules/,
        exclude: /node_modules\/(?!(slide-ui.*)\/).*/,
        loader: ['babel-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      { 
        test: /\.less$/, // .less and .css
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')({
                    'overrideBrowserslist': ['last 2 versions']
                  }),
                  require('cssnano')({
                    preset: 'default',
                  })
                ],
              }
            },
            'less-loader'
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2|jpg|jpeg|png|gif|mp3|svg)$/,
        loaders: ['file-loader']
      }
    ]
  },
  plugins: plugins
};
