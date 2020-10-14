import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
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
