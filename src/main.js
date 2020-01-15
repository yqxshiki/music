import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(store)
// axios
import axios from 'axios'
Vue.prototype.axios = axios;
// axios.defaults.baseURL = "xxxxx";  //这里使用自己下载的网易云接口地址
axios.defaults.baseURL = process.env.NODE_ENV == "production" ? "/" : "http://localhost:5000/";

// 引入Vant
import Vant from 'vant'
import 'vant/lib/index.css';
// import { Lazyload } from 'vant';
Vue.use(Vant)
// Vue.use(Lazyload);

// 懒加载
import Vuelazyload from 'vue-lazyload'
Vue.use(Vuelazyload, {
  error: require("./assets/error.jpg"),
  loading: require("./assets/loading.gif")
});

// animation动画库
import animate from 'animate.css'
Vue.use(animate);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
