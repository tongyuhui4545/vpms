import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store/index.js';
import router from '@/router';
import config from '../config';
class HttpRequest {
  constructor(baseUrl, timeout = 0) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
    this.queue = {};
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: this.timeout,
      ifModifiedSince: false,
      headers: {}
    };
    return config;
  }
  destroy(url) {
    delete this.queue[url];
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        //如果在非登录页的情况下
        if (url !== '/api/login' && url !== '/api/token/refresh') {
          // 如果没有token，回到登录页
          if (!token) {
            router.push('/');
            return;
          }
          //如果没有异常，就把token带上，发送请求
          config.headers['Authorization'] = `Bearer ${token}`;
          //config.headers['Authorization'] = ``;
        }
        store.dispatch('app/changeLoading', true);
        return config;
      },
      (error) => {
        router.push('/');
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      async (res) => {
        if (!res.data) {
          //除了自定义表头，其他localStorage项目全部清除
          const heads = localStorage.getItem('personal_table_heads');
          localStorage.clear();
          if (heads) {
            localStorage.setItem('personal_table_heads', heads);
          }
          // *************************************
          router.push('/');
          store.dispatch('app/changeLoading', false);
        }

        /**token过期 */
        if (res.data.code === 401) {
          // Message.error(res.data.message);
          //除了自定义表头，其他localStorage项目全部清除
          const heads = localStorage.getItem('personal_table_heads');
          localStorage.clear();
          if (heads) {
            localStorage.setItem('personal_table_heads', heads);
          }
          // *************************************
          router.push('/');
          store.dispatch('app/changeLoading', false);
        } else if (res.status === 500) {
          Message.error('server error');
          store.dispatch('app/changeLoading', false);
          return Promise.reject(res);
        } else if (res.data.code && res.data.code !== 200) {
          // 如果返回的code不是200，就提示错误信息
          Message.error(res.data.message);
          //将Loading取消
          store.dispatch('app/changeLoading', false);
          return Promise.reject(res);
        } else {
          this.destroy(url);
          store.dispatch('app/changeLoading', false);
          return res.data;
        }
      },
      (error) => {
        this.destroy(url);
        let errorInfo = error.response;
        Message.error(errorInfo.data.message);
        store.dispatch('app/changeLoading', false);
        if (!errorInfo) {
          const {
            request: { statusText, status },
            config
          } = JSON.parse(JSON.stringify(error));
          errorInfo = {
            statusText,
            status,
            request: { responseURL: config.url }
          };
        }
        return Promise.reject(error);
      }
    );
  }
  request(options) {
    const instance = axios.create();
    const modifiedOptions = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, modifiedOptions.url);
    return instance(modifiedOptions);
  }
  get(url, data = {}, header = {}, options = {}, baseURL = config.baseUrl) {
    options.url = url;
    options.params = data;
    options.headers = header;
    options.method = 'GET';
    options.baseURL = baseURL;
    return this.request(options);
  }
  post(url, data = {}, header = {}, options = {}, baseURL = config.baseUrl) {
    options.url = url;
    // data = qs.stringify(data);
    options.data = data;
    options.method = 'POST';
    options.headers = header;
    options.timeout = 900000;
    options.baseURL = baseURL;
    return this.request(options);
  }
}
export default HttpRequest;
