import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home/home'
import Join from '@/view/join/join'
import Idea from '@/view/idea/idea'
import Down from '@/view/down/down'
import League from '@/view/form/league'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },{
      path: '/home',
      name: 'home',
      component: Home
    },{
      path: '/join',
      name: 'join',
      component: Join
    },{
      path: '/idea',
      name: 'idea',
      component: Idea
    },{
      path: '/down',
      name: 'down',
      component: Down
    },{
      path: '/league',
      name: 'league',
      component: League
    }
  ]
})
