# css抽离成单独的文件， 通过link标签引入

`安装`
```js
npm i -D mini-css-extract-plugin
```

> mini-css-extract-plugin 是用于将 CSS 提取为独立的文件的插件，对每个包含css的js文件都会创建一个css文件，支持按需加载css和sourceMap

`webpack.config.js配置`

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  ...
  module: {
    rules: [
      {
        test:/\.css$/,
        // 将原来配置的所有 style-loader 替换为 MiniCssExtractPlugin.loader
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
              // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
              publicPath: './',  
              hmr: process.env.NODE_ENV === 'development', // 仅dev环境启用HMR功能
            },
          },
          'css-loader'
        ]
      },
      {
        test:/\.less$/,
        use:[{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',  
              hmr: process.env.NODE_ENV === 'development', // 仅dev环境启用HMR功能
            },
          }, 'css-loader', 'less-loader']
      },
      {
        test:/\.scss$/,
        use:[{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',  
              hmr: process.env.NODE_ENV === 'development', // 仅dev环境启用HMR功能
            },
          }, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    // 建议选用新的CSS文件提取插件mini-css-extract-plugin
    new MiniCssExtractPlugin({
      // 这里的配置和webpackOptions.output中的配置相似
      // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ]
}
```

## 开启CSS压缩

`安装`
```js
npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin
// terser-webpack-plugin是js压缩插件，因为单独配置压缩css会覆盖掉js的压缩，所以此处需要一起配置
```

> 通过optimize-css-assets-webpack-plugin插件可以对css进行压缩，与此同时，必须指定js压缩插件（例子中使用terser-webpack-plugin插件），否则webpack不再对js文件进行压缩；

```js
module.exports = {
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  }
}
```