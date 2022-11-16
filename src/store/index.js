import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userImg: ''
  },
  mutations: {
    // 用户头像
    SET_USERPHOTO(state, value) {
      state.userImg = value
    }
  },
  actions: {
  },
  modules: {
  }
})
