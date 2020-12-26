# env 环境变量 `environment variable`

```js
// package.json
// `webpack` 命令行 环境配置 的 `--env` 参数，可以允许你传入任意数量的环境变量
script: {
  "dev": "webpack --env NODE_ENV=development --config ...",
  "build": "webpack --env NODE_ENV=production --config ..."
}
```

```js
// 要使用 env 环境变量，需要将配置返回成一个函数

module.exports = (env) => {
  console.log(env.NODE_ENV)
  return {
    ...
  };
}
```

<!-- 方法二 -->
```js
npm i -D cross-env

script: {
  "dev": "cross-env NODE_ENV=development webpack --config ...",
  "build": "cross-env NODE_ENV=production webpack --config ..."
}
```

```js
// 此时直接返回对象即可

module.exports = {
  mode: process.env.NODE_ENV
}

```