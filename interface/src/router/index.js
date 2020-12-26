import Vue from 'vue'
import VueRouter from 'vue-router'
import Bets from '../views/Bets.vue'

import AuthApp from '../views/AuthApp.vue'
import MyProfile from '../views/MyProfile.vue'
import Profile from '../views/Profile.vue'
import EditProfile from '../views/EditProfile.vue'
import MyBets from '../views/MyBets.vue'
import Drafts from '../views/Drafts.vue'
import Feed from '../views/Feed.vue'
import Grupo from '../views/Grupo.vue'
import FollowRequests from '../views/FollowRequests.vue'
import Deposit from '../views/Deposit.vue'
import Withdraw from '../views/Withdraw.vue'
import CreateGroup from '../views/CreateGroup.vue'
import FindUser from '../views/FindUser.vue'
import Historico from '../views/Historico.vue'
import PostShared from '../views/PostShared.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Feed',
    component: Feed
  },
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
    path: '/followrequests',
    name: 'Pedidos de Seguir',
    component: FollowRequests
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
    path: '/findUser/:username',
    name: 'Find User',
    component: FindUser
  },
  {
    path: '/myDrafts',
    name: 'Seus Rascunhos',
    component: Drafts
  },
  {
    path: '/grupo/:id',
    name: 'Grupo',
    component: Grupo
  },
  {
    path: '/posts/:id',
    name: 'Publicação',
    component: PostShared
  },
  {
    path: '/depositar',
    name: 'Deposit',
    component: Deposit
  },
  {
    path: '/levantar',
    name: 'Withdraw',
    component: Withdraw
  },
  {
    path: "/criarGrupo",
    name: "Criar Grupo",
    component: CreateGroup
  },
  {
    path: "/historico",
    name: "Seu Histórico",
    component: Historico
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
