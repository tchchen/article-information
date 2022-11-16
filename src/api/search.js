import request from '@/utils/request.js'
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
