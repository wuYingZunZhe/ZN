// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery';
import my_ui from'./my_ui'
import axios from 'axios';
import VueAxios from 'vue-axios';
// import 'animate.css';
import animate from 'animate.css'

 
Vue.use(VueAxios, axios)


//Vue.use(axios);


//Vue.prototype.$axios = axios;
//axios.defaults.baseURL = 'https://exbuy.double.com.cn/';
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
