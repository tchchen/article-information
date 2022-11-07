import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') }
]

const router = new VueRouter({
  routes
})

// router.beforeEach(to, from,next) => {
//   if('/'){
//     to.path('/login')
//   }
// }

export default router
