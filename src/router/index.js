import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
// import HelloWorld from '@/components/HelloWorld'
import IndexPage from '@/pages/Index'

Vue.use(Router)
Vue.use(Vuex)

export default new Router({
  // 使用history模式
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    }
  ]
})
