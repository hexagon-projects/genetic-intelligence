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
      isUnderstand: false,
      showContohSoalIQ: false,
      isInstruksi: true,
      bookingProcess: {
        consultantId: null,
        selectedDate: null,
        selectedSlot: null,
        selectedPackage: null,
        medicalAnswers: {},
        counselingAnswers: {},
        termsAccepted: false
      }
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
    },
    setContohSoalIQ(state, status){
      state.showContohSoalIQ = status
    },
    setIsInstruksi(state, status){
      state.isInstruksi = status
    },
    SET_BOOKING_DATA(state, payload) {
      state.bookingProcess = {
        ...state.bookingProcess,
        ...payload
      }
    },
    SET_MEDICAL_ANSWERS(state, answers) {
      state.bookingProcess.medicalAnswers = answers
    },
    SET_COUNSELING_ANSWERS(state, answers) {
      state.bookingProcess.counselingAnswers = answers
    },
    ACCEPT_TERMS(state) {
      state.bookingProcess.termsAccepted = true
    },
    RESET_BOOKING_PROCESS(state) {
      state.bookingProcess = {
        consultantId: null,
        selectedDate: null,
        selectedSlot: null,
        selectedPackage: null,
        medicalAnswers: {},
        counselingAnswers: {},
        termsAccepted: false
      }
    }
  },
  actions: {
    async submitBooking({ state, commit }) {
      try {
        const bookingData = {
          consultant_id: state.bookingProcess.consultantId,
          date: format(state.bookingProcess.selectedDate, 'yyyy-MM-dd'),
          slot_id: state.bookingProcess.selectedSlot.id,
          package_id: state.bookingProcess.selectedPackage.id,
          medical_answers: Object.entries(state.bookingProcess.medicalAnswers)
            .map(([questionId, answer]) => ({
              question_id: parseInt(questionId),
              answer
            })),
          counseling_answers: Object.entries(state.bookingProcess.counselingAnswers)
            .map(([questionId, answer]) => ({
              question_id: parseInt(questionId),
              answer
            }))
        }

        const token = Cookies.get('token')
        const response = await initAPI('post', 'user/bookings', bookingData, token)
        
        commit('RESET_BOOKING_PROCESS')
        return response.data
      } catch (error) {
        console.error('Booking submission failed:', error)
        throw error
      }
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
    getIsUnderstand: (state) => state.isUnderstand,
    getStatusContohSoalIQ: (state) => state.showContohSoalIQ,
    getStatusIsInstruksi: (state) => state.isInstruksi,
    getBookingProcess: (state) => state.bookingProcess,
    getMedicalAnswers: (state) => state.bookingProcess.medicalAnswers,
    getCounselingAnswers: (state) => state.bookingProcess.counselingAnswers
  },
})