import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let apiUrl = process.env.VUE_APP_API_HOST

export default new Vuex.Store({
  state: {
    data: []
  },
  getters: {
    rewards: (state) => state.data
  },
  mutations: {
    fetch(state, res) {
      console.log(res)
      state.data = res.data
    },
    find(state, res) {
      console.log(res)
      state.data = res.data
    },
    add(state, res) {
      console.log(res)
      state.data.push(res.data)
    },
    // delete(state, res) {
    //   console.log(res)
    //   state.data.pop(res.data)
    // },
    edit(state,{payload}){
      console.log("edit");
      state.data[payload.index] = payload
    }
  },
  actions: {
    async fetch({ commit }) {
      // console.log("here");
      let res = await Axios.get(apiUrl + '/rewards')
      console.log(res)
      commit("fetch", res)
    },
    async find({ commit },id) {
      console.log(apiUrl + '/rewards/'+id);
      let res = await Axios.get(apiUrl + '/rewards/'+id)
      console.log(res)
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
      console.log(body)
      let res = await Axios.post(apiUrl + '/rewards', body)
      console.log(res)
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
    console.log(body)
    let res = await Axios.put(apiUrl + '/rewards/' + payload.id, body)
    console.log(res)
    commit("edit", payload.index, res.data )
  },
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
  modules: {
  }
})
