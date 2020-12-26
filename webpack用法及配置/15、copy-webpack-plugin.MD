```js
const { CopyWebpackPlugin } = require('copy-webpack-plugin');

module.exports = {
  ...
  plugins: [
    new CopyWebpackPlugin([
      // 数组，接收多个对象
      { 
        from: path.join(rootPath, 'static'),
        to: path.join(rootPath, 'dist/static'),
        // 忽略某些文件
        ignore: ['c.js']
      }
    ])
  ]
}
```