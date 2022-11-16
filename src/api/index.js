import request from '@/utils/request.js'
// 获取用户的基本资料
import * as user from './user.js'

// 刷新token
export const getNewTokenAPI = () => request({
  url: '/v1_0/authorizations',
  method: 'put',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('refresh_token')
  }
})

// 用户登录和注册请求
export const loginAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'post',
  data: {
    mobile: mobile,
    code: code
  }
})

export * from './articel.js'
export * from './channel.js'
export * from './search.js'

export default {
  user
}
