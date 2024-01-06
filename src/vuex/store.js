import { createStore } from "vuex";

export const store = createStore({
  state(){
    return {
      userRole: null,
      userEmail: null,
      userDatas: null,
      userResultDetect: null
    }
  },
  mutations: {
    user(state, userData){
      state.userDatas = userData
    },
    userRole(state, userRole){
      state.userRole = userRole
    },
    userEmail(state, userEmail){
      state.userEmail = userEmail
    },
    userResultDetect(state, userResultDetect){
      state.userResultDetect = userResultDetect
    }
  },
  getters: {
    getUserData: (state) => state.userDatas,
    getUserRole: (state) => state.userRole,
    getUserEmail: (state) => state.userEmail,
    getUserResultDetect: (state) => state.userResultDetect
  },
})