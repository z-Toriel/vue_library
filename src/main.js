import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

/*导入 common.js工具类  */
import {
  getCurDate,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from './common.js'

//使用ElementUI
Vue.use(ElementUI)

Vue.config.productionTip = false

// 设置基础路径
axios.defaults.baseURL = "http://localhost:10003/"
// 设置每次请求前都要将token带上
axios.interceptors.request.use(config =>{
  config.headers['token'] = getSessionStorage('token')
  return config
})

//将axios挂载vue上
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$getCurDate = getCurDate
Vue.prototype.$setSessionStorage = setSessionStorage
Vue.prototype.$getSessionStorage = getSessionStorage
Vue.prototype.$removeSessionStorage = removeSessionStorage
Vue.prototype.$setLocalStorage = setLocalStorage
Vue.prototype.$getLocalStorage = getLocalStorage
Vue.prototype.$removeLocalStorage = removeLocalStorage

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
