// config-overrides.js
const { override, addWebpackPlugin } = require('customize-cra');
const IgnoreNotFoundExportPlugin = require('ignore-not-found-export-webpack-plugin');

module.exports = override(
  (config) => {
    // Add plugin to ignore source map errors for specific files (e.g., react-datepicker)
    config.plugins.push(
      new IgnoreNotFoundExportPlugin({
        checkResource: (resource) => resource.includes('react-datepicker'),
      })
    );
    return config;
  }
);