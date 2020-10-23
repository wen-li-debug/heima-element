import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('@/views/login/index.vue')
const Home = () => import('@/views/home/index.vue')
const Layout = () => import('@/views/layout/index.vue')
const Article = () => import('@/views/article')
const Publish = () => import('@/views/publish')
const Fans = () => import('@/views/fans')
const Image = () => import('@/views/image')
const Comment = () => import('@/views/comment')

const routes = [
  {
    path: '/',
    redirect: '/home'
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
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      },
      {
        path: '/fans',
        name: 'fans',
        component: Fans
      },
      {
        path: '/image',
        name: 'image',
        component: Image
      },
      {
        path: '/comment',
        name: 'comment',
        component: Comment
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 获取本地用户信息
  const user = JSON.parse(localStorage.getItem('user'))

  // 判断path
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
