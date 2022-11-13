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
  },
  { path: '/search', component: () => import('@/views/Search') },
  { path: '/search_rsulte', component: () => import('@/views/Search/SearchResult') },
  { path: '/articel_detail', component: () => import('@/views/ArticelDetail') },
  { path: '/edit_profile', component: () => import('@/views/User/UserEdit') }
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
