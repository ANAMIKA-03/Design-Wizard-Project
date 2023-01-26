const CracoLessPlugin = require("craco-less");
const path = require("path");
const webpack = require("webpack");
//var Buffer = require('buffer/').Buffer
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  eslint: {
    enable: false,
  },
  webpack: {
    alias: {
      react: path.resolve("./node_modules/react"),
    },
    plugins: {
      // new webpack.ProvidePlugin({
      //     Buffer: [require.resolve("buffer/"), "Buffer"],
      // }),
      add: [
        new webpack.DefinePlugin({
          process: { env: {} },
        }),
      ],
    },
  },
};
