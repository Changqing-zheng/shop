import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      userName: "未登录"
    }
    //   userName: ""
  },
  getters: {//类似vue的computed

  },
  mutations: {
    changeLogin(state, status){
      state.userInfo = status;
    },
    logout(state, status){
      state.userInfo.userName = "未登录";
    }
  },
  actions: {
    loginAction({commit}, user){
      commit("changeLogin", user)
    },
    logoutAction({commit}, user){
      commit("logout", user)
    }
  }
})
