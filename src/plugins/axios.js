// axios.js
import axios from 'axios';

const instance = axios.create({
  // 配置axios实例
});

export default {
  install(Vue) {
    Vue.prototype.$axios = instance;
  }
};
