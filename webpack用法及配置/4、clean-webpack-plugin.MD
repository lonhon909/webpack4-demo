# clean-webpack-plugin -清理dist

> <font color="red">**注意：该插件可以用于自动清除dist目录后重新生成，在 npm run build 的时候非常有用**</font>

> <a href="https://www.npmjs.com/package/clean-webpack-plugin">clean-webpack-plugin</a>

`安装`

```js
// By default, this plugin will remove all files inside webpack's output.path directory, as well as all unused webpack assets after every successful rebuild.
// 默认情况下，每次构建都会移除 output.path文件下所有的文件，以及webpack没有使用到的资源文件
npm i -D clean-webpack-plugin
```

`webpack.config.js配置`

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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