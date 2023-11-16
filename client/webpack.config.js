const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
// const { babel } = require('babel-loader');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      hot: true,
      open: true,
      port: 8081,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'J.A.T.E.',
        template: './index.html',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
        filename: 'manifest.json',
        publicPath: '/',
        name: 'The J.A.T.E text editor',
        short_name: 'JATE',
        description: 'Have the ability to take notes',
        start_url: '/',
        display: 'standalone',
        inject: true,
        fingerprints: false,
        orientation: 'portrait',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        crossorigin: 'use-credentials',
        icons: [
          {
            src: './src/images/logo.png',
            sizes: [96, 128, 144, 152, 192, 256, 384, 512],
            destination: './assets/icons',
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/transform-runtime',
              ],
            },
          },
        },
      ],
    },
  };
};