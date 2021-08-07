import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
Vue.use(Vuex);

let apiUrl = process.env.VUE_APP_API_HOST;

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
      console.log(state.data);
    },
    delete(state, res) {
      let new_data = [];
      for (let i = 0; i < state.data.length; i++) {
        if (!(state.data[i].id === res.data.id)) {
          new_data.push(state.data[i]);
        }
      }
      console.log(new_data);
      state.data = new_data;
      console.log(state);
    },
    add(state, res) {
      state.data.push(res.data);
      console.log(state.data);
    },
    editR(state, data) {
      // for (let i = 0; i < state.data.length; i++) {
      //   if (state.data[i].id === res.data.id) {
      //     state.data[i] = res.data;
      //   }
      // }
      // console.log(state.data);
      console.log(data.res.data);
      state.data[data.index] = data.res.data;
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
      };
      let res = await Axiost.post(apiUrl + "/rewards", body);
      if (res.status === 200) {
        commit("add", res);
      } else {
        console.error(res);
      }
    },
    async editReward({ commit }, payload) {
      let body = {
        id: payload.id,
        reward_name: payload.reward_name,
        reward_remain: payload.reward_remain,
        users: payload.users,
        reward_point: payload.reward_point,
      };
      console.log(body);
      let res = await Axios.put(apiUrl + "/rewards/" + payload.id, body);
      let index = payload.index;
      console.log(res.data);
      console.log(payload.index);
      commit("editR", { res, index });
    },
    async delete({ commit }, payload) {
      let res = await Axios.delete(apiUrl + "/rewards/" + payload.id);
      commit("delete", res);
    },
    async add({ commit }, payload) {
      let res = await Axios.post(apiUrl + "/rewards/", payload);
      commit("add", res.data);
    },
  },
  modules: {},
});
