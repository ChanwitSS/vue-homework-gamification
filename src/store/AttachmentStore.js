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
    attachments: (state) => state.data,
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
      let res = await Axios.get(apiUrl + "/attachments", Auth.getApiHeader);
      commit("fetch",res)
    },
    async add({commit}, { homework, user, attachments }){
      let attachment_body = {
        point: homework.id,
        user: user.id
      }
      let attachment_res = await Axios.post(apiUrl + '/attachments', attachment_body, Auth.getApiHeader)
      commit("add", attachment_res)

      /*for (let i=0; i<attachments.length; i++) {
        let file_body = {
          files: attachments[i].raw,
          refId: attachment_res.data.id,
          ref: 'attachment',
          field: 'attachment_file'
        }
        let file_res = await Axios.post(apiUrl + '/upload', file_body, Auth.getApiHeader)
      }*/
    }
  },
  modules: {},
});
