import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/home'
    },

    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [{
        path: '/welcome',
        component: Welcome
      }]
    }
  ]
})
//设置路由守卫
router.beforeEach((to, from, next) => {
  // /home路由需要token的存在支持（表示用户处于登录状态）
  var token = window.sessionStorage.getItem('token')
  //用户处于“非登录状态”，就禁止访问除登录页面意外的其他页面
  if (token === null && to.path !== '/login') {
    //强制去登录页面
    return next('/login')
  }
  next() //继续执行当前路由
})
export default router
