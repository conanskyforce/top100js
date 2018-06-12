import Vue from 'vue'
import App from './App.vue'
import Plu from './plu'


Vue.use(Plu);
// console.log(Plu);

new Vue({
  el: '#app',
  render: h => h(App)
})
