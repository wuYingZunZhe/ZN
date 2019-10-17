import Vue from 'vue'
import Router from 'vue-router'
import drug from '@/views/drug/drug'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'drug',
      component: drug
    }
  ]
})
