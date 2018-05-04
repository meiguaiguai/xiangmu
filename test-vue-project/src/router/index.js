import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/pages/Home'
import LoginPage from '@/pages/Login'
import Indexone from '@/pages/Indexone'
import Ymlogin from '@/components/Ymlogin'
import Article from '@/components/articleManagement'
import Userset from '@/components/userSet'
import Newarticle from '@/components/newArticle'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/ymlogin'
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage,
      meta: {
        auth: undefined,
      }
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
      meta: {
        auth: false,
      }
    },
    {
      path: '/ymlogin',
      name: 'Ymlogin',
      component: Ymlogin,
    },
    {
      path:'/index',
      name:'Indexone',
      component:Indexone,
      children:[
        {path:'/',component:Article},
        {path:'article',component:Article},
        {path:'userset',component:Userset},
        {path:'newarticle',component:Newarticle}

      ]
    }


  ]
})
