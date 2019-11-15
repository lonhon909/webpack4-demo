// import '@babel/polyfill'
import $ from 'jquery'
import Vue from 'vue'
import App from './App.vue'
console.log($('div'))
console.log(101001010, __isIphone__)
import './index.css';
import './a.less';
import './b.scss'

class Person {
  constructor() {}
}

class Son extends Person {
  constructor() {
    super()
  }
}

console.log(App)
console.log(App instanceof Vue)

new Vue({
  el: '#app',
  render: h => h(App)
})