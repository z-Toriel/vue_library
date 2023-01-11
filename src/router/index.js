import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Arrangement from '@/views/Arrangement.vue'
import Seat from '@/views/Seat.vue'
import UserCenter from '@/views/UserCenter.vue'
import RePassword from '@/views/RePassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Index',
    path: '/index',
    component: Index,
  },
  {
    name: 'Login',
    path: '/',
    component: Login,
  },
  {
    name: 'Arrangement',
    path: '/arrangement',
    component: Arrangement,
  },
  {
    name: 'Seat',
    path: '/seat',
    component: Seat,
  },
  {
    name: 'Register',
    path: '/register',
    component: Register,
  },
  {
    name: 'UserCenter',
    path: '/userCenter',
    component: UserCenter,
  },
  {
    name: 'RePassword',
    path: '/rePassword',
    component: RePassword
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
