import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('@/views/login/index.vue')
const Home = () => import('@/views/home/index.vue')
const Layout = () => import('@/views/layout/index.vue')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
