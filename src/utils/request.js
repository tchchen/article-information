import axios from 'axios'
import { getToken } from '@/utils/token'
import { Notify } from 'vant'
import router from '@/router'

const instans = axios.create({
  baseURL: 'http://geek.itheima.net',
  timeout: 25000
})

// 请求拦截器
instans.interceptors.request.use(config => {
  // 发请求前做点什么
  if (getToken()) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, err => {
  // 发请求失败做点什么
  return err
})
// 响应拦截器
instans.interceptors.response.use(response => {
  // 请求成功做点什么
  return response
}, err => {
  console.dir(err)
  // 身份过期，跳转到登录页
  if (err.response.status === 401) {
    router.replace('/login')
    Notify({ type: 'danger', message: '身份已过期，请重新登录' })
  }
  // 请求失败做点什么
  return Promise.reject(err)
})

export default ({ url, method = 'GET', data, params, headers }) => {
  return instans({
    url: url,
    method: method,
    params: params,
    data: data,
    headers: headers
  })
}
