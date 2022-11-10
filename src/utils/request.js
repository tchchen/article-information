import axios from 'axios'
import { getToken } from '@/utils/token'

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
  // 请求失败做点什么
  return err
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
