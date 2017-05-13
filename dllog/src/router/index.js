import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
       path: '/login',
      name: 'login',
      component: require('../components/login.vue')
    },
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
    },{
      path: '/test',
      name: 'test',
      component: require('../components/commons/countAns/test.vue')
    },{
      path: '/test1',
      name: 'test1',
      component: require('../components/commons/tableAns/test1.vue')
    }
  ]
})
