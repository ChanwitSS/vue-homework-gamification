import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import Auth from '../services/auth'

Vue.use(Vuex);

let apiUrl = process.env.VUE_APP_API_HOST

export default new Vuex.Store({
  state: {
    data: [],
  },
  getters: {
    subjects: (state) => state.data,
  },
  mutations: {
    fetch(state, res) {
      state.data = res.data;
    },
    add(state, res) {
      state.data.push(res.data);
    },
    find(state, res) {
      console.log(res)
      state.data = res.data
    },
  },
  actions: {
    async fetch({ commit }) {
      let res = await Axios.get(apiUrl + "/subjects", Auth.getApiHeader);
      commit("fetch",res)
    },
    async find({ commit },id) {
      // console.log("here");
      console.log(apiUrl + '/subjects/'+id);
      let res = await Axios.get(apiUrl + '/subjects/'+ id, Auth.getApiHeader)
      console.log(res)
      commit("find", res)
    },
    /*async add({commit},payload){
      let body = {
        id: payload.id,
        point: payload.total_point,
        user: payload.user
      }
      let res = await Axios.post(apiUrl + '/subjects',body)
      if(res.status === 200){
        commit("add",res)
      }
      else{
        console.error(res)
      }
    }*/
  },
  modules: {},
});
