import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
axios.defaults.baseURL="http://127.0.0.1:8000";
axios.interceptors.request.use(config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    return config
  }, err => {
    // 请求未成功发出
    return Promise.reject(err);
  })
Vue.use(VueAxios, axios);