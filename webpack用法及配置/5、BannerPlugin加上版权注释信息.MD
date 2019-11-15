# BannerPlugin

> 是一个webpack内置插件、用于给打包的js文件加上版权注释信息

`webpack.config.js配置`

```js
const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.BannerPlugin('龙葵的版权信息')
  ]
}
```