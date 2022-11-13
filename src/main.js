import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入移动适配的插件
import 'amfe-flexible'

import { Button, Form, Field, NavBar, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search, Image as VanImage, Divider, Tag, CellGroup, Dialog, DatetimePicker } from 'vant'

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
Vue.use(ActionSheet)
Vue.use(Popup)
Vue.use(Badge)
Vue.use(Col)
Vue.use(Row)
Vue.use(Search)
Vue.use(VanImage)
Vue.use(Divider)
Vue.use(Tag)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(DatetimePicker)

// 封装中间件函数插件
const directiveObj = {
  install(Vue) {
    // 全局自定义指令
    Vue.directive('focus', {
      inserted(el) {
        // 使用该自定义指令的，不是原生的dom
        const input = el.querySelector('input')
        if (input) {
          input.focus()
        } else {
          el.focus()
        }
      }
    })
  }
}

// use会执行对象里的install方法并传入Vue类
Vue.use(directiveObj)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
