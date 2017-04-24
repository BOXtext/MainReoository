import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/countAns',
      name: 'countAns',
      component: require('../components/commons/countAns.vue')
    },{
    	 path: '/',
      name: 'Home',
      component: require('../components/Home.vue')
    },{
      path: '/dataBrower',
      name: 'dataBrower',
      component: require('../components/commons/countAns/dataBrower.vue')
    },{
      path: '/tableAns',
      name: 'tableAns',
      component: require('../components/commons/tableAns.vue')
    },{
      path: '/chart',
      name: 'chart',
      component: require('../components/commons/tableAns/chart.vue')
    }
  ]
})
