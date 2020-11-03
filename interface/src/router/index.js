import Vue from 'vue'
import VueRouter from 'vue-router'
import Country from '../views/Country.vue'

import AuthApp from '../views/AuthApp.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/feed',
    name: 'Feed',
    component: AuthApp
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/countries',
    name: 'Country',
    component: Country
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
