<template>
  <div class="app">
    Apppppp
    <div class="container">
      <img src="../static/300.jpg" alt="">
      <img :src="src" alt="">
    </div>

  </div>
</template>

<script>
import img from '../static/300.jpg';

export default {
  data() {
    return {
      src: img
    }
  }
}
</script>

<style lang="less" scoped>
@import './app.less';
.app {
  color: yellow;
  font-size: 20px;
  background: url('../static/300.jpg');
}
.container {
  width: 200px;
  height: 200px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
