import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 引入移动适配的插件
import directiveObj from '@/utils/directive.js' // 获取焦点指令的
import './VantComponent.js' // 分离出的vant组件，让main.js文件清晰点
import 'highlight.js/styles/default.css' // 代码高亮的样式

Vue.config.productionTip = false

// use会执行对象里的install方法并传入Vue类
Vue.use(directiveObj)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
