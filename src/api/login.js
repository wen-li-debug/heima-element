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

// 修改用户头像信息
export function updataImg (data) {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}
/**
 * 修改用户信息
 */
export function updataUser (data) {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}
