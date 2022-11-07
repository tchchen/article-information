import request from '@/utils/request.js'

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
