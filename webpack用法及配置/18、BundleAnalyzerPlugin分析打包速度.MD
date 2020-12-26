# BundleAnalyzerPlugin

```js
npm i -D webpack-bundle-analyzer

```

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  ...
  plugins: [
    ...
    new BundleAnalyzerPlugin()
  ]
}
```