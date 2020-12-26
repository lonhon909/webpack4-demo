# externals

> 防止将某些 `import` 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。

<a href="https://juejin.cn/post/6844903822452621326">查看externals文章</a>

```html
<head>
  <!-- html模板中通过CND引入 -->
  <script src="https://lib.baomitu.com/jquery/3.5.1/jquery.js"></script>
</head>
```

```js
// webpack.config.js

module.exports = {
  ...
  externals: {
    jquery: 'jQuery',
    lodash: '_'
  },
  ...
}
```

```js
// 这样就不会将jquery和lodash打包进bundle中了
import $ from 'jquery';
import _ from 'lodash';

$('.app').html(_.join('aaaaaa'.split(''), '/'));
```