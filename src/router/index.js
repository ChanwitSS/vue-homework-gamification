import Vue from "vue";
import VueRouter from "vue-router";
import Homework from "../views/Homework.vue";
import Leaderboard from "../views/Leaderboard.vue";
import Form from "../views/Form.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: "/homework",
    name: "Homework",
    component: Homework,
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    component: Leaderboard,
  },
  {
    path: "/form",
    name: "Form",
    component: Form,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
