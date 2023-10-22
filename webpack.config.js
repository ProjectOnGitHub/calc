const path = require('path');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const PugPlugin = require('pug-plugin');

module.exports = {
  entry: { index: './src/index.pug' },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'index.html',
    publicPath: '',
    clean: true,
  },
  devtool: 'source-map',
  mode: 'development',
  optimization: {
    minimize: false,
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist/'),
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
      Images: path.join(__dirname, './src/images/'),
      Fonts: path.join(__dirname, './src/vendor/fonts'),
      Styles: path.join(__dirname, './src/styles'),
      Vendor: path.join(__dirname, './src/vendor'),
    },
  },
  plugins: [
    new PugPlugin({
      pretty: true,
      js: {
        filename: 'scripts/[name].js',
      },
      css: {
        filename: 'styles/[name].css',
      },
    }),
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
  ],
};
