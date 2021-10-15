import axios from 'axios'

let baseURL = 'http://127.0.0.1:8888/'
// 创建axios，赋给变量service
const service = axios.create(
  {
    baseURL: baseURL
  }
)

// 添加请求拦截器
service.interceptors.request.use( (config) => {
  // 再发送请求前做什么
  return config
}, (error) => {
  // 对错误请求做什么
  return Promise.reject(error)
})

// 创建响应拦截器
service.interceptors.request.use( (response) => {
  // 对响应数据做什么
  return response
}, (error) => {
  // 对响应错误做什么
  return Promise.reject(error)
})


export default service