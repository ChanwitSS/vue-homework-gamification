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
    teachers: (state) => state.data
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
    }
  },
  actions: {
    async fetch({ commit }) {
      // console.log("here");
      let res = await Axios.get(apiUrl + '/teachers')
      console.log(res)
      commit("fetch", res)
    },
    async find({ commit },id) {
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
      }
  },
  async edit({ commit }, payload) {
    let body = {
        id: payload.id,
        homework_name: payload.homework_name,
        description: payload.description,
        point: payload.point,
        //subject: payload.subject[0].id
    }
    console.log(body)
    let res = await Axiost.put(apiUrl + '/teachers/' + payload.id, body)
    console.log(res)
    commit("edit", payload.index, res.data )
  }
  },
  modules: {
  }
})
