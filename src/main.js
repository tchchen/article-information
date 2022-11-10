import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入移动适配的插件
import 'amfe-flexible'

import { Button, Form, Field, NavBar, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh } from 'vant'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Cell)
Vue.use(List)
Vue.use(PullRefresh)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
