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
      state.data = res.data
    },
    find(state, res) {
      state.data = res.data
    },
    add(state, res) {
      state.data.push(res.data)
    },
    // delete(state, res) {
    //   console.log(res)
    //   state.data.pop(res.data)
    // },
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
    async add({ commit }, payload) {
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
  },
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
  }
  // async delete({ commit }, payload) {
  //   let body = {
  //     id: payload.id,
  //     reward_name: payload.reward_name,
  //     reward_point: payload.reward_point,
  //     reward_remain: payload.reward_remain,
  //     students: payload.students
  //       //subject: payload.subject[0].id
  //   }
  //   console.log(body)
  //   let res = await Axios.delete(apiUrl + '/rewards/' + payload.id, body)
  //   console.log(res)
  //   commit("delete", payload.index, res.data )

  //   // let reset = await Axios.get(apiUrl + '/rewards')
  //   //   console.log(res)
  //   //   commit("fetch", reset)
  // }
  },
  modules: {},
});
