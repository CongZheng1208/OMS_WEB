// ConditionMonitoringHttp.js
import axios from 'axios';

const ConditionMonitoringHttp = axios.create({
  baseURL: 'https://api.centralman.example.com'
});

// 请求拦截器
ConditionMonitoringHttp.interceptors.request.use(config => {
  // 在发送请求之前对 ConditionMonitoringHttp 实例的请求进行拦截处理
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
ConditionMonitoringHttp.interceptors.response.use(response => {
  // 对响应数据做些什么
  return response.data;
}, error => {
  return Promise.reject(error);
});

export default ConditionMonitoringHttp;
