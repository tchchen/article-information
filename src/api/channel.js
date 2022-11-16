import request from '@/utils/request.js'

// 获取所有频道
export const getAllChannelAPI = () => request({
  url: '/v1_0/channels',
  method: 'get'
})

// 获取用户选择的频道
export const getUserChannelAPI = () => request({
  url: '/v1_0/user/channels',
  method: 'get'
})

// 更新频道
export const updateChannelAPI = ({ channels }) => request({
  url: '/v1_0/user/channels',
  method: 'PUT',
  data: {
    channels
  }
})

// 删除频道
export const removeChannelAPI = (channelId) => request({
  url: `/v1_0/user/channels/${channelId}`,
  method: 'DELETE'
})
