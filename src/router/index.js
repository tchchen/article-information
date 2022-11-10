import Vue from 'vue'
import VueRouter from 'vue-router'
// import { getToken } from '@/utils/token.js'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/layout' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/layout',
    component: () => import('@/views/Layout'),
    redirect: '/layout/home',
    children: [
      { path: 'home', component: () => import('@/views/Home') },
      { path: 'user', component: () => import('@/views/User') }
    ]
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (getToken('token')) {
//     // console.log(to)
//     // next()
//   } else {
//     // console.log(to)
//     // to.path('/')
//   }
// })

export default router
