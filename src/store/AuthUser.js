import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '@/services/auth.js'
import Axios from 'axios'

Vue.use(Vuex)

let apiUrl = process.env.VUE_APP_API_HOST
let auth = JSON.parse(localStorage.getItem('auth_key'))

const initailState = {
    user: auth ? auth.user: null,
    jwt: auth ? auth.jwt: null,
    isAuthen: auth ? true: false
}

export default new Vuex.Store({
  state: initailState,
  getters: {
      user: (state) => state.user,
      jwt: (state) => state.jwt,
      isAuthen: (state) => state.isAuthen
  },
  mutations: {
    loginSuccess (state, user, jwt) {
        state.user = user
        state.jwt = jwt
        state.isAuthen = true
    },
    logoutSuccess(state) {
        state.user = null,
        state.jwt = null,
        state.isAuthen = false
    },
  },
  actions: {
      async login({ commit }, payload) {
          let res = await AuthService.login(payload)
          if (res.success) {
            commit('loginSuccess', res.user, res.jwt)
          } 
          return res
      },
      async logout({ commit }) {
        let res = await AuthService.logout()
        commit('logoutSuccess')
        return res;
      },
      async register({ commit }, payload) {
        let res = await Axios.post(apiUrl + '/auth/local/register', payload)
        //commit('register', payload)
      },
      async updatePoint({ commit }, user) {
        let res = await Axios.put(apiUrl + '/users/' + user.id, user, )
        commit('updatePoint', res)
      }
  },
  modules: {
  }
})
