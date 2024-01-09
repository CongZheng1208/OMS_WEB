// ConditionMonitoringitoringHttp.js
import axios from 'axios';

const ConditionMonitoringitoringHttp = axios.create({
  baseURL: 'https://api.centralman.example.com'
});

// 请求拦截器
ConditionMonitoringitoringHttp.interceptors.request.use(config => {
  // 在发送请求之前对 ConditionMonitoringitoringHttp 实例的请求进行拦截处理
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
ConditionMonitoringitoringHttp.interceptors.response.use(response => {
  // 对响应数据做些什么
  return response.data;
}, error => {
  return Promise.reject(error);
});

export default ConditionMonitoringitoringHttp;
