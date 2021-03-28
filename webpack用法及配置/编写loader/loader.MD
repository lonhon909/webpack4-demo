# loader

所谓 `loader` 只是一个导出为函数的 `JavaScript` 模块。`loader runner` 会调用这个函数，然后把上一个 `loader` 产生的结果或者资源文件(`resource file`)传入进去。函数的 `this` 上下文将由 `webpack` 填充，并且 `loader runner` 具有一些有用方法，可以使 `loader` 改变为异步调用方式，或者获取 `query` 参数。