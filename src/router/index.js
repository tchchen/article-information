import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/token.js'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/layout' },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login')
  },
  {
    path: '/layout',
    component: () => import(/* webpackChunkName: "Layout" */ '@/views/Layout'),
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home'),
        meta: { scrollTop: 0 }
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "User" */ '@/views/User')
      }
    ]
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "Search" */ '@/views/Search')
  },
  {
    path: '/search_rsulte',
    component: () => import(/* webpackChunkName: "SearchRsulte" */ '@/views/Search/SearchResult')
  },
  {
    path: '/articel_detail',
    component: () => import(/* webpackChunkName: "ArticelDetail" */ '@/views/ArticelDetail')
  },
  {
    path: '/edit_profile',
    component: () => import(/* webpackChunkName: "EditProfile" */ '@/views/User/UserEdit')
  },
  {
    path: '/chat',
    component: () => import(/* webpackChunkName: "Chat" */ '@/views/Chat')
  },
  {
    path: '/read_history',
    component: () => import(/* webpackChunkName: "ReadingHistory" */ '@/views/ReadHistory')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (getToken() && to.path === '/login') {
    // 如果有token即登录了，去登录页，则不给去
    next('/layout/home')
    // 不去登录页就给
  } else {
    next()
  }
})

export default router
