const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle file name
  },
  mode: 'development', // Use 'development' mode for easier debugging
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Path to your HTML template
    }),
  ],
};
