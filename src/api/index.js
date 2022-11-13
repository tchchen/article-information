import request from '@/utils/request.js'

// 获取用户的基本资料
import * as user from './user.js'

// 用户登录和注册请求
export const loginAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'post',
  data: {
    mobile: mobile,
    code: code
  }
})

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

// 获取频道对应的文章列表
export const getArticleListAPI = ({ channelId, timestamp }) => request({
  url: '/v1_0/articles',
  method: 'get',
  params: {
    channel_id: channelId,
    timestamp: timestamp
  }
})

// 对文章不感兴趣
export const dislikesAPI = (articleId) => request({
  url: '/v1_0/article/dislikes',
  method: 'post',
  data: {
    target: articleId
  }
})

// 对文章举报不包括不感兴趣
export const reportArecleAPI = (target, type, remark) => request({
  url: '/v1_0/article/reports',
  method: 'post',
  data: {
    target,
    type,
    remark
  }
})

// 获取文章详情
export const getArticleDetailsAPI = (articleId) => request({
  url: `/v1_0/articles/${articleId}`,
  method: 'get'
})

// 在文章详情中取消关注
export const cancelFollowAPI = (articleId) => request({
  url: `/v1_0/user/followings/${articleId}`,
  method: 'delete'
})

// 在文章详情中关注作者
export const followAuthorAPI = (articleId) => request({
  url: '/v1_0/user/followings',
  method: 'post',
  data: {
    target: articleId
  }
})

// 在文章详情中，点赞文章
export const likeArticleAPI = (articleId) => request({
  url: '/v1_0/article/likings',
  method: 'post',
  data: {
    target: articleId
  }
})

// 在文章详情中，取消点赞文章
export const dislikeArticleAPI = (articleId) => request({
  url: `/v1_0/article/likings/${articleId}`,
  method: 'delete'
})

// 获取文章评论列表
export const getArticleCommentAPI = ({ id, offset = null, limit = 5 }) => request({
  url: '/v1_0/comments',
  method: 'get',
  params: {
    type: 'a',
    source: id,
    offset,
    limit
  }
})

// 给评论点赞
export const likeArticleCommentAPI = (comId) => request({
  url: '/v1_0/comment/likings',
  method: 'post',
  data: {
    target: comId
  }
})

// 不给评论点赞
export const dislikeArticleCommentAPI = (comId) => request({
  url: `/v1_0/comment/likings/${comId}`,
  method: 'delete'
})

// 增加文章评论
export const addArticleCommentAPI = ({ target, content, artId }) => request({
  url: '/v1_0/comments',
  method: 'post',
  data: {
    target,
    content,
    art_id: artId
  }
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

// 搜索联想建议
export const suggestListAPI = ({ keywords }) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q: keywords
    }
  })
}

// 搜索结果
export const searchResultAPI = ({ pages, prePages, keywords }) => request({
  url: '/v1_0/search',
  method: 'get',
  params: {
    page: pages,
    pre_page: prePages,
    q: keywords
  }
})

export default {
  user
}
