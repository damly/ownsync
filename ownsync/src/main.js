// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  console.log('store.getters.token', store.getters.token, to)
  if (store.getters.token) {
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach((to, from, next) => {
})

Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
