import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

let apiUrl = process.env.VUE_APP_API_HOST;

export default new Vuex.Store({
  state: {
    data: []
  },
  getters: {
    rewards: (state) => state.data
  },
  mutations: {
    fetch(state, res) {
      state.data = res.data;
    },
    find(state, res) {
      state.data = res.data
    },
    delete(state, res) {
      let new_data = [];
      for (let i = 0; i < state.data.length; i++) {
        if (!(state.data[i].id === res.data.id)) {
          new_data.push(state.data[i]);
        }
      }
      state.data = new_data;
    },
    add(state, res) {
      state.data.push(res.data);
      console.log(state.data);
    },
    edit(state,{ index, res }){
      console.log(res)
      state.data[index] = res.data
    },
  },
  actions: {
    async fetch({ commit }) {
      // console.log("here");
      let res = await Axios.get(apiUrl + '/rewards')
      commit("fetch", res)
    },
    async find({ commit },id) {
      let res = await Axios.get(apiUrl + '/rewards/'+id)
      console.log(id)
      commit("find", res)
    },
    /*async add({ commit }, payload) {
      let body = {
        id: payload.id,
        reward_name: payload.reward_name,
        reward_point: payload.reward_point,
        reward_remain: payload.reward_remain,
        students: payload.students
        
    }
      let res = await Axios.post(apiUrl + '/rewards', body)
      if (res.status === 200) {
          commit("add", res)
      } else {
          console.error(res)
      }
    },*/
    async edit({ commit }, payload) {
      let body = {
        id: payload.id,
        reward_name: payload.reward_name,
        reward_point: payload.reward_point,
        reward_remain: payload.reward_remain,
        users: payload.users
        //subject: payload.subject[0].id
      }
      let res = await Axios.put(apiUrl + '/rewards/' + payload.id, body)
      commit("edit", { index: payload.index, res })
    },
    async addRecord({ commit }, { userPayload, rewardPayload }) {
      let rewardBody = {
        id: rewardPayload.id,
        reward_name: rewardPayload.reward_name,
        reward_point: rewardPayload.reward_point,
        reward_remain: rewardPayload.reward_remain,
        users: rewardPayload.users
      }
      let body = {
        users_permissions_user: userPayload,
        reward: rewardBody.id,
        point: rewardBody.reward_point
      }
      let res = await Axios.post(apiUrl + `/student-rewards`, body)
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
    async addReward({ commit }, payload) {
      let res = await Axios.post(apiUrl + "/rewards/", payload);
      commit("add", res.data);
    },
  },
  modules: {},
});
