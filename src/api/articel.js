import request from '@/utils/request.js'
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

// 获取用户阅读历史
export const getReadHistoryAPI = ({ page, limit }) => request({
  url: '/v1_0/user/histories',
  method: 'get',
  params: {
    page: page,
    per_page: limit
  }
})
