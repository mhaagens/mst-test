import ExtractTextPlugin from "extract-text-webpack-plugin";
import { resolve } from "path";

// Define env
const isProduction = process.env.NODE_ENV === "production";

export const eslint = () => {
  return {
    enforce: "pre",
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "eslint-loader"
  };
};

// JS loader
export const js = () => {
  if (isProduction) {
    return {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: [["env", { modules: false }], "react", "stage-2"]
        }
      }
    };
  } else {
    return {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: [["env", { modules: false }], "react", "stage-2"],
          plugins: ["react-hot-loader/babel"]
        }
      }
    };
  }
};

// Style loader
export const styles = () => {
  if (isProduction) {
    return {
      test: /\.css|scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      })
    };
  } else {
    return {
      test: /\.css|scss$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true
          }
        },
        "resolve-url-loader",
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }
      ]
    };
  }
};

// Image loader
export const images = () => {
  return {
    test: /\.(jpe?g|png|gif|svg)$/i,
    exclude: resolve(__dirname, "src", "webfonts"),
    use: [
      {
        loader: "image-webpack-loader",
        options: {
          mozjpeg: {
            progressive: true
          },
          gifsicle: {
            interlaced: false
          },
          optipng: {
            optimizationLevel: 4
          },
          pngquant: {
            quality: "75-90",
            speed: 4
          }
        }
      }
    ]
  };
};

// Webfont loader
export const webfonts = () => {
  return {
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    use: ["file-loader?name=[name].[hash].[ext]"]
  };
};
