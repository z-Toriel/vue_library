import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Arrangement from '@/views/Arrangement.vue'
import Seat from '@/views/Seat.vue'
import UserCenter from '@/views/UserCenter.vue'
import RePassword from '@/views/RePassword.vue'
import Details from '@/views/details.vue'
import Category from '@/views/Category.vue'
import BooksList from '@/views/BooksList.vue'
import AuthorList from '@/views/AuthorList.vue'
import BorrowList from '@/views/BorrowList.vue'
import EvaluateList from '@/views/EvaluateList.vue'
import UserInfo from '@/views/UserInfo.vue'
import EdituserInfo from '@/views/EdituserInfo.vue'

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
  },
  {
    name: 'Details',
    path: '/details',
    component: Details
  },
  {
    name: 'Category',
    path: '/category',
    component: Category,
  },
  {
    name: 'BooksList',
    path: '/booksList',
    component: BooksList,
  },
  {
    name: 'AuthorList',
    path: '/authorList',
    component: AuthorList,
  },
  {
    name: 'BorrowList',
    path: '/borrowList',
    component: BorrowList,
  },
  {
    name: 'EvaluateList',
    path: '/evaluateList',
    component: EvaluateList,
  },
  {
    name: 'UserInfo',
    path: '/userInfo',
    component: UserInfo,
  },
  {
    name: 'EdituserInfo',
    path: '/edituserInfo',
    component: EdituserInfo,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
