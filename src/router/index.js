import Vue from "vue";
import VueRouter from "vue-router";
import CreateHomework from "../views/CreateHomework.vue";
import HomeworkList from "../views/HomeworkList.vue";
import Leaderboard from "../views/Leaderboard.vue";
import ManageRewards from "../views/ManageRewards.vue";
import ManageUsers from "../views/ManageUsers.vue";
//import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import CreateUsers from "@/views/CreateUser.vue";
import RewardHistory from "../views/RewardHis";
import RedeemRewards from "../views/RedeemRewards.vue";
import CreateRewards from "../views/CreateReward.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/homework/create",
    name: "CreateHomework",
    component: CreateHomework,
  },
  {
    path: "/homeworks",
    name: "HomeworkList",
    component: HomeworkList,
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    component: Leaderboard,
  },

  {
    path: "/rewardsHistory",
    name: "RewardsHistory",
    component: RewardHistory,
  },

  /*{
    path: "/home",
    name: "Home",
    component: Home,
  },*/
  {
    path: "/users/manage",
    name: "ManageUsers",
    component: ManageUsers,
  },
  {
    path: "/rewards/manage",
    name: "ManageReward",
    component: ManageRewards,
  },
  {
    path: "/rewards/create",
    name: "CreateReward",
    component: CreateRewards,
  },
  {
    path: "/users/create",
    name: "CreateUser",
    component: CreateUsers,
  },
  {
    path: "/rewards/redeem",
    name: "RedeemReward",
    component: RedeemRewards,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
