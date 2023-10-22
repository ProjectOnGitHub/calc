const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const PugPlugin = require('pug-plugin');

module.exports = {
  entry: { index: './src/index.pug' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: './',
    clean: true,
  },
  devtool: 'source-map',
  mode: 'development',
  optimization: {
    minimize: false,
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.svg$/,
        use: ['svg-sprite-loader', 'svg-transform-loader', 'svgo-loader'],
        generator: {
          filename: 'images/svg/[name][ext]',
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      // use alias to avoid relative paths like `./../../images/`
      Images: path.join(__dirname, './src/images/'),
      Fonts: path.join(__dirname, './src/vendor/fonts'),
      Styles: path.join(__dirname, './src/styles'),
      Vendor: path.join(__dirname, './src/vendor'),
    },
  },
  plugins: [
    new PugPlugin({
      pretty: true, // formatting HTML, useful for development mode
      js: {
        // output filename of extracted JS file from source script
        filename: 'scripts/[name].js',
      },
      css: {
        // output filename of extracted CSS file from source style
        filename: 'styles/[name].css',
      },
    }),
    new MiniCssExtractPlugin(),
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
  ],
};
