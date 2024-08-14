// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Output bundle filename
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',  // Injects styles into the DOM
          'css-loader',    // Resolves CSS imports
          'sass-loader'    // Compiles Sass to CSS
        ],
      }
    ]
  },
  mode: 'development', // Use 'production' for production builds
};
