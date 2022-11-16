// 全局自定义指令
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
export default directiveObj
