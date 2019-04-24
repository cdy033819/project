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

axios.interceptors.request.use(function (config) {
  //config ：axios的配置对象，具体是axios大对象内部的的子级成员
  //把token绑定到axios的身上（通过请求头的方式体现）
  var token = window.sessionStorage.getItem('token')
  config.headers.Authorization = token
  return config
}, function (error) {
  return Promise.reject(error)
})
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
