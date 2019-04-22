// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
import ElementUI from 'element-ui'
// ESLint 规范要求，import需要在文件最前面设置
Vue.use(ElementUI)
// Vue.config.productionTip = false

/* eslint-disable no-new */

// axios配置请求公共根地址
axios.defaults.baseURL = 'http://127.0.0.1:11333/api/private/v1/'
// 给axios配置成为Vue的成员
Vue.prototype.$http = axios
new Vue({
  el: '#app',
  router,
  // components: {
  //   App
  // },
  // template: '<App/>'
  render: h => h(App)
})
