import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
// import HelloWorld from '@/components/HelloWorld'
import IndexPage from '@/pages/Index'
import DetailPage from '@/pages/detail'
import DetailAnaPage from '@/pages/detail/analysis'
import DetailCouPage from '@/pages/detail/count'
import DetailForPage from '@/pages/detail/forecast'
import DetailPubPage from '@/pages/detail/publish'

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
    },
    {
      path: '/detail',
      component: DetailPage,
      redirect: '/detail/analysis',
      // 配置自路由
      children: [
        {
          path: 'analysis',
          component: DetailAnaPage
        },
        {
          path: 'count',
          component: DetailCouPage
        },
        {
          // 自路由path前不加 /
          path: 'forecast',
          component: DetailForPage
        },
        {
          path: 'publish',
          component: DetailPubPage
        }
      ]
    }
  ]
})
