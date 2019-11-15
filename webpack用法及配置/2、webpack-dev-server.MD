# webpack-dev-server

```js
npm i -D webpack-dev-server
```

> <font color="red">**注意：webpack-dev-server输出的文件只存在于内存中,不输出真实的文件！**</font>

`配置package.json`

```js
"dev": "webpack-dev-server  --contentBase dist --compress --hot --open --port 8888"

// --contentBase dist 是以dist为根目录， 否则以项目为根目录
// --open 自动打开
// --port 端口号
// --hot 热模块更新
// --compress 利用express开启gzip压缩

```

`webpack.config.js`

```js
module.exports = {
  ...
  devServer: {
    contentBase: 'dist', // 它指定了服务器资源的根目录，如果不写入contentBase的值，那么contentBase默认是项目的目录
    hot: true,
    open: true,
    port: 3001,
    compress: true,
  }
  ...
}
```