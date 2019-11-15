# JS代码分割

<a href="https://juejin.im/post/5d372851f265da1ba915bf78">JS优化，分割代码</a>

> code splitting 是webpack打包时用到的重要的优化特性之一、此特性能够把代码分离到不同的bundle中，然后可以按需加载或者并行加载这些文件，代码分离可以用于获取更小的bundle，以及控制资源加载优先级，如果能够合理的使用能够极大影响加载时间

---

* 三种常见的代码分离方法
  + 入口起点：使用entry配置，手动的分离代码
  + 放置重复：使用 SplitChunksPlugin 去重和分离 chunk
  + 动态导入：通过模块的内联函数调用来分离代码

### 1、手动配置多入口

* 手动配置多入口会存在一些问题
 + 如果入口chunks之间包含重复的模块，哪些重复的模块都会被引入到各个打包后的js文件中
 + 方法不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码

##### 1. 在webpack配置文件中配置多个入口

```js
entry: {
	main: './src/main.js',
	other: './src/other.js'
}
```

##### 2. 在main.js 和 other.js 中都共同引入一个模块， 并使用其功能

> <font color="red">**注意：打包文件，可以看到 main 和 other 打包的文件中都加载的了 jquery**</font>

```js
// main.js
import $ from 'jquery'
$('<div></div>').html('main').appendTo('body')

// other.js
import $ from 'jquery'
$('<div></div>').html('other').appendTo('body')
```

---

### 2、抽取公共代码

> webpack4 以上使用的插件为 SplitChunksPlugin，webpack4 之前的使用的 CommonChunkPlugin已经被移除，最新版本的webpack中只需要在配置文件中的optimization节点下添加一个splitChunks属性即可进行相关配置

* 1、修改配置文件

```js
optimization
  splitChunks:{
    chunks: "all"
  }
}
```

* 2、打包查看文件

> 打包之后会将各自的入口文件进行打包，额外会再生产一份js文件，此文件中就是各个chunk中所引用的公共部分

* 3、splitChunksPlugin 配置参数

> SplitChunksPlugin 的配置只需要在 optimization 节点下的 splitChunks 进行修改即可，如果没有任何修改，则会使用默认设置

> 默认的 SplitChunksPlugin 配置适用于绝大多数用户

  + webpack 会基于如下默认原则自动分割代码
    - 公用代码块或者来自 node_modules 文件夹的组件模块
    - 打包的代码块大小超过30kb，最小化压缩之前的
    - 按需加载代码块时，同时发送的请求最大数量不应该超过5
    - 页面初始化时，同时发送的请求最大数量不应该超过3

  + SplitChunksPlugin 默认配置

```js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'async', // 只对异步加载的模块进行拆分，import('jquery').then()就是典型的异步加载，可选项还有 all | initial
      minSize: 30000, // 模块最少大于 30kb 才会拆分
      maxSize: 0, // 为0时模块大小无上限，只要大于 30kb 都会拆分。若是非0，超过了maxSize的值，会进一步拆分
      minChunks: 1, // 模块最少引用一次才会拆分
      maxAsyncRequests: 5, // 异步加载时同时发送的请求数量最大不能超过5，超过5的部分不拆分
      maxInitialRequests: 3, // 页面初始化时，同时发送的请求数量最大不能超过3，超过3的不跟不拆分
      automaticNameDelimiter: '~', // 默认的连接符
      name: true, // 拆分的chunk名，设置为true表示根据模块名和CacheGroup的key来自动生成，使用上面的连接符连接
      cacheGroups: { // 缓存组配置，上面配置读取完成后进行拆分，如果需要把多个模块拆分到一个文件，就需要缓存，所以命名为缓存组
        vendors: { // 自定义缓存组名
          test: /[\\/]node_modules[\\/]/, // 检查 node_modules 目录，只要模块在该目录下就使用上面配置拆分到这个组
          priority: -10, // 权重为-10，决定了那个组优先匹配，假如node_modules下面有个模块要拆分，同时满足vendors和default组，此时就会分到 priority 值比较大的组，因为 -10 > -20 所以分到 vendors 组
          filename:'vendoes.js'
        },
        default: { // 默认缓存组名
          minChunks: 2, // 最少引用两次才会被拆分
          priority: -20, // 权重 -20
          reuseExistingChunk: true // 如果主入口中引入了两个模块，其中一个正好也引用了后一个，就会直接复用，无需引用两次
        }
      }
    }
  }
};
```