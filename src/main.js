import Vue from 'vue';
import App from './App.vue';
// import './registerServiceWorker';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';
import VueParticles from 'vue-particles';
import './assets/icon/iconfont.css';
import echarts from 'echarts';
import VueAnimateNumber from 'vue-animate-number';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import { read, utils } from "xlsx";
import './css/common.less';
import './css/variables.less';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import './utils/rem.js'

Vue.use(VueDOMPurifyHTML)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
//Vue.use(ElementUI);
Vue.use(ElementUI, { locale });
Vue.use(VueParticles);
Vue.use(VueAnimateNumber);
new Vue({
  router,
  store,
  render: (h) => {
    return h(App);
  }
}).$mount('#app');
AOS.init();
// const VUE_APP_VERSION = require('../package.json').version;
// //尝试使用时间戳来对比
// let version = (new Date().getMonth()+1).toString() + (new Date().getDate()).toString() + (new Date().getHours()).toString() + (new Date().getMinutes()).toString();

// const vers = window.localStorage.getItem("appVersion");
// if(version != vers){
//   localStorage.removeItem("appVersion");
//   window.localStorage.setItem("appVersion", version);
//   location.reload()
// }
