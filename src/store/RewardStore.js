<<<<<<< HEAD
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
=======
import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
Vue.use(Vuex);
>>>>>>> origin/Jerry

let apiUrl = process.env.VUE_APP_API_HOST;

export default new Vuex.Store({
  state: {
<<<<<<< HEAD
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


=======
    data: [],
  },
  getters: {
    rewards: (state) => state.data,
  },
  mutations: {
    fetch(state, res) {
      state.data = res.data;
    },
    add(state, res) {
      state.data.push(res.data);
    },
    editR(state, data) {
      // for (let i = 0; i < state.data.length; i++) {
      //   if (state.data[i].id === res.data.id) {
      //     state.data[i] = res.data;
      //   }
      // }
      // console.log(state.data);
      console.log(data.res.data);
      state.data[data.index] = data.res.data;
    },
  },
  actions: {
    async fetch({ commit }) {
      let res = await Axios.get(apiUrl + "/rewards");
      commit("fetch", res);
>>>>>>> origin/Jerry
    },
    async add({ commit }, payload) {
      let body = {
        id: payload.id,
        reward_name: payload.reward_name,
<<<<<<< HEAD
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
=======
        reward_remain: payload.reward_remain,
      };
      let res = await Axiost.post(apiUrl + "/rewards", body);
      if (res.status === 200) {
        commit("add", res);
      } else {
        console.error(res);
      }
    },
    async editReward({ commit }, payload) {
      let body = {
        id: payload.id,
        reward_name: payload.reward_name,
        reward_remain: payload.reward_remain,
        users: payload.users,
        reward_point: payload.reward_point,
      };
      console.log(body);
      let res = await Axios.put(apiUrl + "/rewards/" + payload.id, body);
      let index = payload.index;
      console.log(res.data);
      console.log(payload.index);
      commit("editR", { res, index });
    },
    async delete({ commit }, payload) {
      let res = await Axios.delete(apiUrl + "/rewards/" + payload.id);
    },
    async add({ commit }, payload) {
      let res = await Axios.post(apiUrl + "/rewards/", payload);
    },
>>>>>>> origin/Jerry
  },
  modules: {},
});
