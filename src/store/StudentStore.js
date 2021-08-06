import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);
let apiUrl = process.env.POKEDEX_ENDPOINT || "http://localhost:1337";

let apiUrl = process.env.VUE_APP_API_HOST

export default new Vuex.Store({
  state: {
    data: [],
  },
  getters: {
    students: (state) => state.data,
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
      let res = await Axios.get(apiUrl + "/students");
      commit("fetch",res)
    },
    async add({commit},payload){
      let body = {
        id: payload.id,
        point: payload.total_point,
        user: payload.user
      }
      let res = await Axiost.post(apiUrl + '/students',body)
      if(res.status === 200){
        commit("add",res)
      }
      else{
        console.error(res)
      }
    }
    
  },
  modules: {},
});
