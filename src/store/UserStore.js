import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
  },
  getters: {
    account: (state) => state.data,
  },
  mutations: {
    fetch(state, { res }) {
      state.data = res.data;
    },
  },
  actions: {
    fetchAccount({ commit }) {
      let res = require("@/data/Userdata");
      commit("fetch", { res });
    },
  },
  modules: {},
});
