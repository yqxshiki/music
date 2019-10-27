import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(store)
// axios
import axios from 'axios'
Vue.prototype.axios = axios;
axios.defaults.baseURL = "http://localhost:3000";

// 引入Vant
import Vant from 'vant'
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
Vue.use(Vant)
Vue.use(Lazyload);

// animation动画库
import animate from 'animate.css'
Vue.use(animate);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
