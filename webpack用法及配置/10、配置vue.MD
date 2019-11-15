# 配置使用vue

`安装`

```js
npm i -S vue
npm i -D vue-loader
// 
npm i -D vue-template-compiler
// 与style-loader类似效果，vue文件中的css热更新
npm i -D vue-style-loader
```

`webpack.config.js`

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块
    new VueLoaderPlugin()
  ]
}
```