const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode : process.env.NODE_ENV || 'development',
  devtool: 'source-map',
  entry: resolve('./src/main.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(css|styl)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          {
            loader: "stylus-loader",
            options: {
              sourceMap: true
            }
          }
        ],
        include: /\/components\/.*\.(css|styl)$/
      },
      {
        test: /\.(css|styl)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: "stylus-loader",
            options: {
              sourceMap: true
            }
          }
        ],
        exclude: /\/components\/.*\.(css|styl)$/
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.styl']
  },
  output: {
    path: resolve('./dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template : resolve('./src/index.html')
    }),
    new MiniCssExtractPlugin()
  ],
  devServer: {
    contentBase: resolve('./dist'),
  },
};

function resolve(dir) {
  return path.resolve(__dirname, dir);
}
