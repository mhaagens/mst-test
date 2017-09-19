import webpack from "webpack";
import { resolve } from "path";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import PreloadWebpackPlugin from "preload-webpack-plugin";
import { eslint, js, styles, images, webfonts } from "./webpack.rules";

// Get env
const isProduction = process.env.NODE_ENV === "production";

// Define chunks to prefetch
const prefetchChunks = ["home"];

// Dev server config
const devServer = {
  hot: true,
  contentBase: resolve(__dirname, "dist"),
  port: 9000,
  host: '0.0.0.0',
  historyApiFallback: true,
  publicPath: "/",
  headers: { 'Access-Control-Allow-Origin': '*' }
};

// Base config
const getBase = () => {
  let base = {};
  base.devtool = isProduction ? "source-map" : "eval";
  base.resolve = {
    alias: {
      components: resolve(__dirname, "src/components"),
      stores: resolve(__dirname, "src/stores"),
      utils: resolve(__dirname, "src/utils/utils.js"),
      styles: resolve(__dirname, "src/styles")
    },
    extensions: [".js", ".jsx", ".scss", ".css", "*"]
  };
  if (!isProduction) {
    base.devServer = devServer;
  }
  return base;
};

// Entry
const getEntry = () => {
  let entry;
  if (isProduction) {
    entry = {
      main: ["./src/index"],
      vendor: ["react", "react-dom"]
    };
  } else {
    entry = [
      "react-hot-loader/patch",
      "webpack-dev-server/client?http://localhost:9000",
      "webpack/hot/only-dev-server",
      "./src/index"
    ];
  }

  return entry;
};

// Output
const getOutput = () => {
  let output = {
    filename: isProduction ? "assets/js/[name].[chunkhash].app.js" : "assets/js/[name].app.js",
    chunkFilename: isProduction ? "assets/js/[name].[chunkhash].app.js" : "assets/js/[name].app.js",
    path: resolve(__dirname, "dist"),
    publicPath: "/"
  };

  return output;
};

// Rules & Loaders
const getRules = () => {
  const rules = [];
  rules.push(eslint());
  rules.push(js());
  rules.push(styles());
  rules.push(images());
  rules.push(webfonts());

  return rules;
};

// Plugins
const getPlugins = () => {
  const plugins = [];
  if (isProduction) {
    plugins.push(new webpack.HashedModuleIdsPlugin());
    plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: ["vendor"],
        filename: "assets/js/[name].[hash].js"
      })
    );
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        minimize: true,
        compress: { warnings: false, drop_console: true, screw_ie8: true },
        output: { comments: false }
      })
    );
    plugins.push(
      new ExtractTextPlugin({
        filename: "assets/css/styles.[contenthash].css",
        allChunks: true
      })
    );
    plugins.push(
      new HtmlWebpackPlugin({
        inject: true,
        filename: "index.[chunkhash].html",
        template: resolve(__dirname, "src", "index.html"),
        chunksSortMode: "dependency"
      })
    );
    plugins.push(new PreloadWebpackPlugin({
      rel: "prefetch",
      include: [...prefetchChunks, "vendor", "main"]
    }));
  } else {
    plugins.push(new webpack.NamedModulesPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(
      new HtmlWebpackPlugin({
        inject: true,
        template: resolve(__dirname, "src", "index.html"),
        chunksSortMode: "dependency"
      })
    );
  }

  return plugins;
};

// All together now...
export default {
  ...getBase(),
  entry: getEntry(),
  module: {
    rules: getRules()
  },
  plugins: getPlugins(),
  output: getOutput()
};
