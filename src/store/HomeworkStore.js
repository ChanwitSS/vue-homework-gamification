import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import Auth from '../services/auth'

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
    },
    find(state, res) {
      console.log(res)
      state.data = res.data
    },
  },
  actions: {
    async fetch({ commit }) {
      let res = await Axios.get(apiUrl + '/homeworks', Auth.getApiHeader)
      commit("fetch", res)
    },
    async add({ commit }, payload) {
      let body = {
        homework_name: payload.homework_name,
        description: payload.description,
        due_date: payload.due_date,
        subject: payload.subject
      }
      //add homework
      let res = await Axios.post(apiUrl + '/homeworks', body, Auth.getApiHeader)
      if (res.status === 200) {
        commit("add", res)
      } else {
        console.error(res)
      }
      //get students by subject_id
      let students_res = await Axios.get(apiUrl + `/users?role=5&subjects=${body.subject}`, Auth.getApiHeader)
      console.log(student_res)
      //set homework to each student
      for (let i=0; i<students_res.data.length; i++) {
        let student_homework_body = {
          users_permissions_user: students_res.data[i].id,
          homework: body,
          is_check: false,
          is_sent: false
        }
        let res = await Axios.post(apiUrl + `/student-homeworks`, student_homework_body, Auth.getApiHeader)
      }
  },
  async find({ commit },id) {
    let res = await Axios.get(apiUrl + '/homeworks/'+ id, Auth.getApiHeader)
    console.log(res)
    commit("find", res)
  },
    async edit({ commit }, payload) {
      let body = {
          id: payload.id,
          homework_name: payload.homework_name,
          description: payload.description,
          point: payload.point,
          //subject: payload.subject[0].id
      }
      let res = await Axios.put(apiUrl + '/homeworks/' + payload.id, body, Auth.getApiHeader)
      commit("edit", payload.index, res.data )
    }
  },
  modules: {
  }
})
