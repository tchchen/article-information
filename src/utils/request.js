import axios from 'axios'
import router from '@/router'
import { getToken, delToken } from '@/utils/token'
import { Notify } from 'vant'

const instans = axios.create({
  baseURL: 'http://geek.itheima.net',
  timeout: 25000
})

// 请求拦截器
instans.interceptors.request.use(config => {
  if (getToken()?.length && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, error => {
  // 发请求失败做点什么
  return error
})

// 响应拦截器
instans.interceptors.response.use(response => {
  // 请求成功做点什么
  return response
}, async error => {
  console.dir(error)
  // 身份过期，跳转到登录页
  if (error.response.status === 401) {
    Notify({ type: 'warning', message: '身份已过期，请重新登录' })
    // 清除token
    delToken()
    // token过期解决方式
    // 方式1：强制跳转到登录页，用户有感知
    router.replace(`/login?path=${router.currentRoute.fullPath}`)
  }
  // 方式2：用 用来刷新token，来重新请求新的token回来
  // 获取refresh_token
  // const res = await getNewTokenAPI()
  // 保存新的token
  // setToken(res.data.data.token)
  // 本次请求失败的请求头里添加新的 token
  // error.config.headers.Authorization = `Bearer ${res.data.token}`
  // 未完成这次请求，再发一次
  // err.config就是上次请求的配置对象
  // 结果要return 回原本逻辑页面调用的地方，且是成功的promise对象，然后返回到逻辑页面
  // return axios(error.config)
  // } else if (error.response.status === 500 && error.config.url === '/v1_0/authorizations' && error.config.method === 'put') {
  // 如果连刷新的token也失效了，就重新登录
  // 清空所有localStorage的值
  // localStorage.clear()
  // 会话存储的值
  // sessionStorage.clear()
  // router.replace('/login')
  // Notify({ type: 'warning', message: '身份已过期，请重新登录' })
  // }
  // 请求失败做点什么
  return Promise.reject(error)
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
