import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/toCount',
      name: 'toCount',
      component: require('../components/toCount')
    }
  ]
})
