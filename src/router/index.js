import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:'Recommend',
    component:()=>import('@/views/recommend')
  },
  {
    path:"/hot",
    name:'Hot',
    component:()=>import('@/views/hot')
  },
  {
    path:"/search",
    name:'Search',
    component:()=>import('@/views/search')
  },
  {
    path:"/playlist/:id",
    name:'PlayList',
    component:()=>import('@/views/playList')
  },
  {
    path:"/songer",
    name:'PlayList',
    component:()=>import('@/views/songer')
  },
  {
    path:"/SongerList/:id",
    name:"SongerList",
    component:()=>import('@/views/SongerList')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass:'ex-active'
})

export default router
