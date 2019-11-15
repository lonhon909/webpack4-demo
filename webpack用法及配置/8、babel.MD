# babel

`安装`
```js
npm i -D babel-loader @babel/core @babel/preset-env
// class语法
npm i -D @babel/plugin-proposal-class-properties 
npm i -D @babel/plugin-transform-runtime 
npm i -S @babel/runtime
// 如果需要使用 genetator，无法直接使用 babel 进行转换，因为会将 generator 转换为一个 regeneratorRuntime
npm i -D @babel/plugin-transform-runtime 
npm i -S @babel/runtime
// 如果需要使用 ES6/7 中对象原型提供的新方法，babel 默认情况无法转换，即使用了 plugin-transform-runtime 的插件也不支持转换原型上的方法，需要使用 polyfill
npm i -S @babel/polyfill

```

`webpack.config.js`
```js
module.exports = {
  module: {
    rules: [
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        // 官方推荐在.babelrc中配置
        options: {
          presets: ['@babel/env'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      },
      exclude: /node_modules/
    ]
  }
}
```

`.babelrc`

```js
{
	"presets": ["@babel/env"],
	"plugins": ["@babel/plugin-proposal-class-properties"]
}
```

```js
// 如果需要使用 genetator，无法直接使用 babel 进行转换，因为会将 generator 转换为一个 regeneratorRuntime
{
	"presets": ["@babel/env"],
	"plugins": [
    "@babel/plugin-proposal-class-properties",
	  "@babel/plugin-transform-runtime"
  ]
}
```

```js
// 在需要使用该模块的地方直接引入
import '@babel/polyfill'
```