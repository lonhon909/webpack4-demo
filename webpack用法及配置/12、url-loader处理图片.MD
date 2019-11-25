# url-loader

`安装`
```js
// url-loader 封装了file-loader
npm i -S url-loader

```

`webpack.config.js`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              publicPath: 'static',
              outputPath: 'static',
              limit: 10000
            }
          }
        ]
      }
    ]
  }
}
```