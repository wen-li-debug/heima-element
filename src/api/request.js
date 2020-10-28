import axios from 'axios'
import jsonBig from 'json-bigint'
import router from '@/router'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',

  // 使用json-bigint包来转化那些int超出范围的数据
  transformResponse: [function (data) {
    try {
      return jsonBig.parse(data)
    } catch (err) {
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
},
(error) => {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (config) {
  config = config.data
  return config
}, function (err) {
  const status = err.response.status
  if (err.response) {
    if (status === 401) {
      router.push('/login')
      localStorage.removeItem('user')
      Message.error('登录无效，请重新登录')
    } else if (status === 403) {
      // token 无效或过期
      Message({
        type: 'warning',
        message: '没有操作权限'
      })
    } else if (status === 400) {
      Message('客户端参数错误')
    } else if (status >= 500) {
      Message('服务器异常，请稍后尝试')
    }
  }
  return Promise.reject(err)
})

export default request
