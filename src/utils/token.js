// 管理本地token的方法
const key = 'token'
// 获取token
export function getToken() {
  return localStorage.getItem(key)
}
// 设置token
export function setToken(token) {
  return localStorage.setItem(key, token)
}
// 删除token
export function delToken() {
  return localStorage.removeItem(key)
}
