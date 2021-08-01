import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Homework from '../views/Homework.vue'
import Home from '../views/Home.vue'
import Form from '../views/Form.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/l',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/homework',
    name: 'Homework',
    component: Homework
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: Login
  },
  {
    path: '/form',
    name: 'Form',
    component: Form
  },

]

const router = new VueRouter({
  routes
})

export default router
