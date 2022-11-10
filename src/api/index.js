import request from '@/utils/request.js'

// 用户登录和注册请求
export const loginAPI = ({ mobile, code }) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data: {
      mobile: mobile,
      code: code
    }
  })
}

// 获取所有频道
export const getAllChannelAPI = () => {
  return request({
    url: '/v1_0/channels',
    method: 'get'
  })
}

// 获取用户选择的频道
export const getUserChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'get'
  })
}

// 获取频道对应的文章列表
export const getArticleListAPI = ({ channelId, timestamp }) => {
  return request({
    url: '/v1_0/articles',
    method: 'get',
    params: {
      channel_id: channelId,
      timestamp: timestamp
    }
  })
}
