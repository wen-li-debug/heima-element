import request from './request'

// 登录请求
export function login (users) {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data: users
  })
}

// 获取用户信息请求
export function getUserProfile () {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}
