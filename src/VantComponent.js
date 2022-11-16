import Vue from 'vue'
import { Button, Form, Field, NavBar, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search, Image as VanImage, Divider, Tag, CellGroup, Dialog, DatetimePicker, Loading, Lazyload } from 'vant'

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
Vue.use(Loading)
Vue.use(Lazyload)

// 如果没找到图片，就用error的路径
Vue.use(Lazyload, {
  perLoad: 0.8,
  error: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.nczwz.com%2Fpublic%2Fkindedit%2Fattached%2Fimage%2F20210914%2F20210914162349_65357.jpeg&refer=http%3A%2F%2Fwww.nczwz.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671077088&t=95595f791d057e2cdc1bd3c35d473639'
})
