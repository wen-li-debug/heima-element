import axios from 'axios'
import jsonBig from 'json-bigint'

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

// 相应拦截器
request.interceptors.response.use((config) => {
  config = config.data
  return config
})

export default request
