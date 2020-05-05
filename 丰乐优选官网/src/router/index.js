import Vue from 'vue'
import Router from 'vue-router'
import PcHome from '@/pcView/pcHome/pcHome'
import PcShop from '@/pcView/pcShop/pcShop'
import pcProvider from '@/pcView/pcProvider/pcProvider'

import mpHome from '@/mpView/mpHome/mpHome'
import mpProvider from '@/mpView/mpProvider/mpProvider'
import mpShop from '@/mpView/mpShop/mpShop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/pchome'
    },
    {
      path: "/pchome", // pc端首页
      name: PcHome,
      component: PcHome
    },
    {
      path: '/pcshop',
      name: 'PcShop',
      component: PcShop
    },
    {
      path: '/pcprovider',
      name: 'pcProvider',
      component: pcProvider
    },
    {
      path: '/mphome', // 手机端首页
      name: mpHome,
      component: mpHome
    },
    {
      path: '/mpprovider', 
      name: mpProvider,
      component: mpProvider
    },
    {
      path: '/mpshop', 
      name: mpShop,
      component: mpShop
    },
  ]
})
