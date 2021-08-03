import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Homework from "../views/Homework.vue";
import Form from "../views/Form.vue";
import Leaderboard from "@/views/Leaderboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
