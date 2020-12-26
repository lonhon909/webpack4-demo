# 在引入一些第三方模块时，例如Vue、React等，

> 这些框架的文件一般都是不会修改的，而每次打包都需要去解析他们，也会影响打包速度，就算是做了拆分，也只是提高了上线后的用户访问速度，并不会提高构建速度，所以如果需要提高构建速度，应该使用动态链接库的方式，类似windows的dll文件，借助DLLPlugin插件实现将这些框架作为一个个的动态链接库，只构建一次，以后的每次构建都只会生成自己的业务代码，可以很好的提高构建效率，主要思想在于，将一些不做修改的依赖文件，提前打包，这样我们开发代码发布的时候就不需要再对这些代码进行打包，从而节省了打包时间，主要使用两个插件: DLLPlugin和DLLReferencePlugin，需要注意的是，若是使用的DLLPlugin，CleanWebpackPlugin插件会存在冲突，需要移除CleanWebpackPlugin插件


`配置dll打包`

`webpack.dll.js`

```js
// package.json
script: {
  "dll": "webpack --config config/webpack.dll.js"
}
```

```js
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    vue: ['vue', 'vue-router']
  },
  // webpack.vue.js 只是用来打包生成 [name]_dd.js 文件和 manifest.json文件的，是不需要参与到业务代码打包的，因为只会在每一次修改了需要生成dll文件的时间才会执行一次，否则不需要参与到打包
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]_dll.js',
    // 最终会在全局暴露出一个[name]_dll的对象
    library: '[name]_dll'
  },
  plugins: [
    // 这个看情况自己配置，npm run build命令时不能清空dist，所以在这里配置
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '[name]_dll',
      path: path.resolve(__dirname, '../dist/manifest.json'),
    })
  ]
}
```

```js
// 需安装 add-asset-html-webpack-plugin
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  ...
  plugins: [
    ...
    // new HtmlWebpackPlugin(),
    // 配置插件自动添加script标签到HTML中，需要注意的是，必须在HtmlWebpackPlugin后面引入，因为HtmlWebpackPlugin是生产一个html文件，AddAssetHtmlWebpackPlugin是在已有的html中注入一个script，否则会被覆盖
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dist/manifest.json'),
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dist/vue_dll.js')
    })
  ]
}

```

```js
npm run dll // 生成vue库文件

npm run build // 构建时直接引用上面生成的库文件，不用重复构建

```