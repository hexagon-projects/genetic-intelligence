import { createStore } from "vuex";

export const store = createStore({
  state(){
    return {
      userRole: null,
      userEmail: null,
      userDatas: null,
      userResultDetect: null,
      reviewImage: null,
      reservasi: null,
      reviewDetail: null,
      isUnderstand: false
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
    },
    reviewImage(state, fileImage){
      state.reviewImage = fileImage
    },
    setReservasi(state, jadwal){
      state.reservasi = jadwal
    },
    reviewGrafologi(state, data){
      state.reviewDetail = data
    },
    setIsUnderstand(state, understand){
      state.isUnderstand = understand
    }
  },
  getters: {
    getUserData: (state) => state.userDatas,
    getUserRole: (state) => state.userRole,
    getUserEmail: (state) => state.userEmail,
    getUserResultDetect: (state) => state.userResultDetect,
    getReviewImage: (state) => state.reviewImage,
    getReservasi: (state) => state.reservasi,
    getReviewDetail: (state) => state.reviewDetail,
    getIsUnderstand: (state) => state.isUnderstand
  },
})