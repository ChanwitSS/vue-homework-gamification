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
    users: (state) => state.data
  },
  mutations: {
    fetch(state, res) {
      state.data = res.data
    },
    edit(state,{payload}){
      console.log("edit");
      state.data[payload.index] = payload
    }
  },
  actions: {
    async fetch({ commit }) {
      let res = await Axios.get(apiUrl + '/users',)
      commit("fetch", res)
    },
    /*async find({ commit },id) {
      // console.log("here");
      console.log(apiUrl + '/teachers/'+id);
      let res = await Axios.get(apiUrl + '/teachers/'+id)
      console.log(res)
      commit("find", res)
    },
    async add({ commit }, payload) {
      let body = {
        id: payload.id,
        homework: payload.homework,
        subjects: payload.subjects,
        user: payload.user,
        
    }
      console.log(body)
      let res = await Axios.post(apiUrl + '/teachers', body)
      console.log(res)
      if (res.status === 200) {
          commit("add", res)
      } else {
          console.error(res)
      }*/
  // },
    async edit({ commit }, payload) {
        let body = {
          id: payload.id,
          total_point: payload.total_point,
          left_point: payload.left_point,
          used_point: payload.used_point,
        //subject: payload.subject[0].id
        }
        console.log(body)
        let res = await Axios.put(apiUrl + '/users/' + payload.id, body)
        console.log(res)
        commit("edit", payload.index, res.data )
      }
    },
  modules: {
  }
})
