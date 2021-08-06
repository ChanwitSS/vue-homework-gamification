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
    homeworks: (state) => state.data
  },
  mutations: {
    fetch(state, res) {
      state.data = res.data
    },
    add(state, res) {
      state.data.push(res.data)
    }
  },
  actions: {
    async fetch({ commit }) {
      let res = await Axios.get(apiUrl + '/homeworks')
      commit("fetch", res)
    },
    async add({ commit }, payload) {
      let body = {
        homework_name: payload.homework_name,
        description: payload.description,
        point: payload.point,
        due_date: payload.due_date,
        subjects: 
          [{
            subject_name: payload.subjects,
            id: payload.subject_ID,
          }],
        teachers:
          [{
            id: payload.teacher_ID
          }],  
        students:[{
            id:payload.student_ID
        }]

    }
      let res = await Axios.post(apiUrl + '/homeworks', body)
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
      let res = await Axiost.put(apiUrl + '/homeworks/' + payload.id, body)
      commit("edit", payload.index, res.data )
    }
  },
  modules: {
  }
})
