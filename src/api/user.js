import request from '@/utils/request.js'

// 获取用户基本资料
export const getUserProfileAPI = () => request({
  url: '/v1_0/user',
  method: 'GET'
})

// 获取用户个人简介
export const getUserInfoAPI = () => request({
  url: '/v1_0/user/profile',
  method: 'GET'
})

// 更新头像
export const updateUserPhotoAPI = (fdObj) => request({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  data: fdObj
})

// 更新用户个人简介
export const updateInfoAPI = (obj) => request({
  url: '/v1_0/user/profile',
  method: 'PATCH',
  data: obj
})
