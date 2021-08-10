import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import Auth from '../services/auth'
Vue.use(Vuex);

let apiUrl = process.env.VUE_APP_API_HOST;

export default new Vuex.Store({
  state: {
    data: [],
  },
  getters: {
    users: (state) => state.data,
  },
  mutations: {
    fetch(state, res) {

      state.data = res.data;
    },
    fetchSelect(state, res) {
      state.data = res
    },
    edit(state, { index, res }) {
      state.data[index] = res.data;
    },
    find(state, res) {
      state.data = res.data;
    },
    delete(state, res) {
      let new_data = [];
      for (let i = 0; i < state.data.length; i++) {
        if (!(state.data[i].id === res.data.id)) {
          new_data.push(state.data[i]);
        }
      }
      state.data = new_data;
    },
    add(state, res) {
      state.data.push(res.data);
    },
  },
  actions: {
    async fetch({ commit }) {
      let res = await Axios.get(apiUrl + '/users', Auth.getApiHeader)
      commit("fetch", res)
      let res = await Axios.get(apiUrl + "/users");
      commit("fetch", res.data);
    },
    async fetchSelect({ commit }) {
      let tableData = [];
      let res = await Axios.get(apiUrl + "/users");
      console.log(res);
      for (let index = 0; index < res.data.length; index++) {
        if (res.data[index].role.name !== "Admin") {
          tableData.push(res.data[index]);
        }
      }
      commit("fetchSelect", tableData);
    },
    async find({ commit }, id) {
      // console.log("here");
      commit("fetch", tableData);
    },
    async find({ commit }, id) {
      // console.log("here");
      let res = await Axios.get(apiUrl + '/users/'+ id, Auth.getApiHeader)
      commit("find", res)
      let res = await Axios.get(apiUrl + "/users/" + id);
      commit("find", res);
    },
    /*async add({ commit }, payload) {
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

      }
      let res = await Axios.put(apiUrl + '/users/' + payload.id, body, Auth.getApiHeader)
      commit("edit", { index: payload.index, res })
    },
    async addSub({ commit }, payload) {
      let body = {
        id: payload.id,
        subject:[{
          id: payload.subject_id
        }]
      //subject: payload.subject[0].id
      }
      let res = await Axios.put(apiUrl + '/users/' + payload.id, body, Auth.getApiHeader)
      commit("edit", { index: payload.index, res })
    },
    async editUser({ commit }, payload) {
      let body = {
        username: payload.username,
        password: payload.password,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        role: payload.role,
        id: payload.id,
        //subject: payload.subject[0].id
      };
      console.log(body);
      let res = await Axios.put(apiUrl + "/users/" + payload.id, body, Auth.getApiHeader);
      commit("edit", { index: payload.index, res });
    },
    async delete({ commit }, payload) {
      let res = await Axios.delete(apiUrl + "/users/" + payload.id, Auth.getApiHeader);
      console.log(res);
      commit("delete", res);
    },
    async addUser({ commit }, payload) {
      let res = await Axios.post(apiUrl + "/users", payload, Auth.getApiHeader);

      };
      let res = await Axios.put(apiUrl + "/users/" + payload.id, body);
      console.log(res);
      commit("edit", { index: payload.index, res });
    },
    async editUser({ commit }, payload) {
      let body = {
        username: payload.username,
        password: payload.password,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        role: payload.role,
        id: payload.id,
        //subject: payload.subject[0].id
      };
      console.log(body);
      let res = await Axios.put(apiUrl + "/users/" + payload.id, body);
      commit("edit", { index: payload.index, res });
    },
    async delete({ commit }, payload) {
      let res = await Axios.delete(apiUrl + "/users/" + payload.id);
      console.log(res);
      commit("delete", res);
    },
    async addUser({ commit }, payload) {
      let res = await Axios.post(apiUrl + "/users", payload);
      commit("add", res);
    },
  },
  modules: {},
});
