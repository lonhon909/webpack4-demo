# 配置模块如何解析

```js
module.exports = {
  resolve: {
    alias: {
      utils: path.resolve(__dirname, '../common/js/utils.js'),
    },
    // 后缀名
    extensions: ['.vue', '.js', '.ts', '.json']
  }
}

// 修改前引入方式
import { joins } from '../common/js/utils.js';
// 修改后
import { joins } from 'utils';
```