// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入echarts 统计图
import echarts from 'echarts';
export * from 'echarts/src/echarts';
//引入时间格式过滤器
import Moment from 'moment'

// 定义全局时间戳过滤器
Vue.filter('formatMonth', function(value) {
  return Moment(value).format('DD/MM/YYYY')
})
Vue.filter('formatSec', function(value) {
  return Moment(value).format('HH:mm:ss')
})


Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
