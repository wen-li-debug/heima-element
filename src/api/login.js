import request from './request'

// 登录请求
export function login (users) {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data: users
  })
}
