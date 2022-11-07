import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入移动适配的插件
import 'amfe-flexible'

import { Button, Form, Field, NavBar } from 'vant'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
