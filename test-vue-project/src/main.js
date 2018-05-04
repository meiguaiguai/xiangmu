// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '../src/router/index'
import store from './store'

import axios from 'axios'
import api from './api'

import VueAuth from '@websanova/vue-auth'
import VueAxios from 'vue-axios'
import vueQuillEditor from 'vue-quill-editor'
import iView from 'iview'
import './theme.less'
import './styles/reset.css'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

axios.defaults.baseURL = '//fakeUrl.com:8887'
axios.defaults.timeout = 6000

Vue.http = Vue.prototype.$http = axios
Vue.use(iView)
Vue.use(VueAxios, axios)
Vue.use(vueQuillEditor)
Vue.use(api, {
  errorFunction(res) {
    // console.log('通用业务逻辑错误函数')
  },
  successFunction(res) {
    // console.log('通用成功函数')
  },
  apiErrorFunction(res) {
    // console.log('通用接口错误函数')
  }
})

Vue.config.productionTip = false
Vue.router = router
Vue.use(VueAuth, {
  auth: require('./packages/vue-auth/drivers/custom-bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  tokenName: 'access-token',
  refreshData: { url: 'auth/refresh', method: 'GET', enabled: false, interval: 0 },
  notFoundRedirect: '/home',
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
