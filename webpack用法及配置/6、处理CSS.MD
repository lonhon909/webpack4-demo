# 处理CSS

`安装`

```js
// 按需求选择
npm i -D css-loader style-loader
npm i -D less less-loader
npm i -D sass-loader node-sass
// 自动添加兼容前缀
npm i -D postcss-loader autoprefixer
```

`webpack.config.js配置`
```js
module.exports = {
  module: {
    rules: [
      {
        // 配置的是用来解析.css文件的loader，css-loader、style-loader
        // loader的顺序 默认是从右往左，从上到下
        // css-loader 解析 @import 这种语法的
        // style-loader 将css引入html的head中 style标签
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'] // webpack底层调用这些loader的顺序是从右向左
      },
      {
        // npm i -D less less-loader
        test: /\.less$/,
        use: ['style-loader', 'css-loader','postcss-loader', 'less-loader']
      },
      {
        // npm i -D sass-loader node-sass
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  }
}
```

`根目录下新增postcss.config.js文件`
```js
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        // 加这个后可以出现额外的兼容性前缀
        "defaults",
        "not ie < 11",
        "last 2 versions",
        "> 1%",
        "iOS 7",
        "last 3 iOS versions"
      ]
    })
  ]
}
// ⚠️上述配置可能会报警告（**直接将browsers入参字段改为overrideBrowserslist即可去除警告**）
// Replace Autoprefixer browsers option to Browserslist config.
// Use browserslist key in package.json or .browserslistrc file.

// 推荐的做法是
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
// 在 package.json 添加browserslist
{
  ...
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```