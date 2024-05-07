/** @type {import('next').NextConfig} */
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const withPlugins = require("next-compose-plugins");

const nextConfig = withPlugins([
  new MonacoWebpackPlugin({
    languages: [],
  }),
]);

module.exports = nextConfig;
