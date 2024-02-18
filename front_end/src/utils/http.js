// 封装axios请求

import axios from "axios"

// 请求基本设置
const instance = axios.create({
  baseURL: 'http://localhost:8888/oms/php/',
  timeout: 5000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // TBD
    // 判断token，后续用户登录做起来以后要加上
    const token = window.sessionStorage.getItem('token')
    if(token)
      config.headers.Authorization = `${token}`
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
instance.interceptors.response.use(
  // 响应成功，状态码2xx
  response => Promise.resolve(response),
  // 响应失败
  error => {
    const { response, message} = error
    // 后续可以考虑根据message作进一步提示
    console.log(response, message)
    return Promise.reject(error)
  }
)

// 封装请求
export const http = (options) => {
  return new Promise((resolve, reject) => {
    instance(options)
    // 请求成功
    .then(res => {
      if(res&&res.data) resolve(res.data) //只返回data字段就行
    })
    // 请求失败
    .catch(error => reject(error))
  })
}
