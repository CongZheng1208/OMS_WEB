// CentralMaintenceHttp.js
import axios from "axios";

const CentralMaintenceHttp = axios.create({
  //baseURL: 'http://localhost:8888/oms/php/'
  baseURL: "http://127.0.0.1/oms/php/",
});

// 请求拦截器
CentralMaintenceHttp.interceptors.request.use(
  (config) => {
    // 在发送请求之前对 CentralMaintenceHttp 实例的请求进行拦截处理
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
CentralMaintenceHttp.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default CentralMaintenceHttp;
