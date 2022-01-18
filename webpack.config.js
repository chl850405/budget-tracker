const WebpackPwaManifest = require("webpack-pwa-manifest");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const webpack = require("webpack");

module.exports = {
  //The entry point is the root of the bundle and the beginning of the dependency graph, so give it the relative path to the client's code
  entry: {
    app: "./public/js/index.js",
    indexedDB: "./public/js/idb.js"
  },
  //bundled code to a folder that we specify. It is common and best practice to put your bundled code into a folder named dist
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        test: /\.jpg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name(file) {
                return "[path][name].[ext]";
              },
              publicPath: function (url) {
                return url.replace("../", "/public/");
              },
            },
          },
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    //must tell webpack to make exceptions for these variables
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder
    }),
    new WebpackPwaManifest({
      name: "Budget Tracker",
      short_name: "Budget",
      description: "An app that allows you to view your budget.",
      start_url: "../public/index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [
        {
          src: path.resolve("public/icons/icon-512x512.png"),
          sizes: [72,96, 128, 144, 152,192, 384, 512],
          destination: path.join("public", "icons"),
        },
      ],
    }),
  ],
  //in which we want webpack to run. By default, webpack wants to run in production mode
  mode: "development",
};
