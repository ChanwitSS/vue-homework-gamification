import Vue from "vue";
import VueRouter from "vue-router";
import Homework from "../views/Homework.vue";
import Leaderboard from "../views/Leaderboard.vue";
import Form from "../views/Form.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Reward from "../views/Reward.vue"
import RewardHistory from "../views/RewardHis"


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: "/homeworks",
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
    path: "/rewards",
    name: "Reward",
    component: Reward,
  },
  {
    path: "/rewardsHistory",
    name: "RewardsHistory",
    component: RewardHistory,
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
