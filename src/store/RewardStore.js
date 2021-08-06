import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import { add } from "lodash";
Vue.use(Vuex);
let apiUrl = process.env.POKEDEX_ENDPOINT || "http://localhost:1337";
export default new Vuex.Store({
  state: {
    data: [],
  },
  getters: {
    rewards: (state) => state.data,
  },
  mutations: {
    fetch(state, res) {
      state.data = res.data;
    },
    add(state, res) {
      state.data.push(res.data);
    },
  },
  actions: {
    async fetch({ commit }) {
      let res = await Axios.get(apiUrl + "/rewards");
      commit("fetch", res);
    },
    async add({ commit }, payload) {
      let body = {
        id: payload.id,
        reward_name: payload.reward_name,
        reward_remain: payload.reward_remain,
        created_at: payload.created_at,
        updated_at: payload.updated_at,
      };
      let res = await Axiost.post(apiUrl + "/rewards", body);
      if (res.status === 200) {
        commit("add", res);
      } else {
        console.error(res);
      }
    },
  },
  modules: {},
});
