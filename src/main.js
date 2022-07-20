import Vue from 'vue'
import router from './router'
import Print from 'vue-print-nb'
Vue.config.productionTip = false

/////////elementui///////

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

import axios from 'axios'
//Vue.use(axios)  // 注意 这样的用法是有问题的，axios不支持Vue.use()的声明方式
Vue.prototype.$axios = axios
// 只是import进来是无法使用 axios 命令的。所以我们将 axios 改写为 Vue 的原型属性。那么在其他组件中就能使用$ajax方法了


Vue.use(ElementUI);
Vue.use(Print);
/////////elementui///////


new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

