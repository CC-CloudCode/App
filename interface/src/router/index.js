import Vue from 'vue'
import VueRouter from 'vue-router'
import Bets from '../views/Bets.vue'

import AuthApp from '../views/AuthApp.vue'
import MyProfile from '../views/MyProfile.vue'
import Profile from '../views/Profile.vue'
import EditProfile from '../views/EditProfile.vue'
import MyBets from '../views/MyBets.vue'
import Feed from '../views/Feed.vue'
import Grupo from '../views/Grupo.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/feed',
    name: 'Feed',
    component: Feed
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
    path: '/bets',
    name: 'Bets',
    component: Bets
  },
  {
    path: '/myProfile',
    name: 'Meu Perfil',
    component: MyProfile
  },
  {
    path: '/editProfile',
    name: 'Editar Perfil',
    component: EditProfile
  },
  {
    path: '/profile/:id',
    name: 'Perfil',
    component: Profile
  },
  {
    path: '/myBets',
    name: 'Suas Apostas',
    component: MyBets
  },
  {
    path: '/grupo/:id',
    name: 'Grupo',
    component: Grupo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
