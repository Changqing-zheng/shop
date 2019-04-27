import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

//全部引入
// import Vue from 'vue';
// import Vant from 'vant';
// import 'vant/lib/index.css';
//
// Vue.use(Vant);

// 按需引入
// import {Button} from 'vant';
// Vue.use(Button);

import {NavBar, Icon, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload } from 'vant';
Vue.use(NavBar).use(Icon).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem).use(Lazyload);

import '@/assets/css/reset.css'
import '@/assets/js/rem.js'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');