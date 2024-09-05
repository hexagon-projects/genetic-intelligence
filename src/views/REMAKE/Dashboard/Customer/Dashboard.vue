<template>
  <div v-if="loading" class="preloader-overlay">
    <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
  </div>

  <div v-if="!loading && userDatas">
    <Layout>
      <!-- Identitas -->
      <section class="py-[57px] bg-white">
          <Identitas :userDatas="userDatas" :propsGIM="propsGIM"/>
      </section>
  
      <!-- Progres Tes -->
      <section class="bg-[#F0F7FD] py-[67px]">
          <ProgressTest :userData="userDatas"/>
      </section>
  
      <!-- Resume GIM -->
      <section v-if="isTestedGIM" class="bg-white py-[60px] mb-[180px] md:mb-0">
          <ResumeGim :propsGIM="propsGIM"/>
      </section>
  
      <!-- Resume assesmen & IQ -->
      <section v-if="isTestedIQ || isAssessment" class="bg-white py-[50px]">
          <ResumeIQAssessment :propsIq="propsIq" :propsAssessment="propsAssessment"/>
      </section>
  
      <!-- Reservasi -->
      <section class="bg-white py-[46px]">
          <Reservasi/>
      </section>
    </Layout>
    <!-- <div v-if="newRole == 'admin'">
        <DashboardAdmin/>
    </div>
  
    <div v-if="newRole == 'consultant'">
        <DashboardConsultant/>
    </div>
  
    <div v-if="newRole == 'customer'">
      <DashboardCustomer :userData="userData"/>
    </div> -->
  </div>

</template>

<script setup>
import Layout from '@/Layout/Customer/Layout.vue';
// import DashboardCustomer from '@/components/REMAKE/Dashboard/Customer/DashboardCustomer.vue';
// import DashboardConsultant from '@/components/consultant/dashboard/dashboard.vue'
// import DashboardAdmin from '@/components//admin/dashboard/dashboard.vue'
// import DashboardStaff from '../staffs/dashboard/dashboard.vue'
import Identitas from '@/components/REMAKE/Dashboard/Section/Identitas.vue';
import ProgressTest from '@/components/REMAKE/Dashboard/Section/Progress.vue';
import ResumeGim from '@/components/REMAKE/Dashboard/Section/ResumeGim.vue';
import ResumeIQAssessment from '@/components/REMAKE/Dashboard/Section/ResumeIQAssessment.vue';
import Reservasi from '@/components/REMAKE/ReservasiFooter/Reservasi.vue';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { ref, onMounted, computed, onBeforeMount } from 'vue';
import initAPI from '../../../../api/api';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"
import cekDataProfile from '@/components/cekProfile';

const router = useRouter()
const loading = ref(true);
const store = useStore()
const userDatas = ref(null)
// const userData = computed(() => store.getters.getUserData)
const userRole = computed(() => store.getters.getUserRole)
const userResultDetect = computed(() => store.getters.getUserResultDetect);
const newRole = ref('')

const dataProfileInclomplete = ref(false)

const isTestedGIM = ref(false)
const propsGIM = ref('')

const isTestedIQ = ref(false)
const propsIq = ref('')

const isAssessment = ref(false)
const propsAssessment = ref('')

const isTestedCPM = ref(false)
const propsCPM = ref('')

const token = Cookies.get('token')

const getAssessmentResult = async(userId) => {
  try {
    const response = await initAPI('get', `customers/assessments?customer_id=${userId}`, null, token)
    console.log(`respon assessment`, response.data)
    propsAssessment.value = response.data.data
  } catch (error) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Terjadi error saat mengambil data Assessment user.',
        showConfirmButton: false,
        timer: 2000
    });
  }
}

const getGIMResult = async(userId) => {
  try {
    const response = await initAPI('get', 'customers/gim-result/'+userId, null, token)
    console.log(`respon gim`, response.data)
    if(response.data.is_detected == true){
      propsGIM.value = response.data
        // console.log('aya ajig')
        // store.commit('userResultDetect', response.data)
      localStorage.setItem('userResult', JSON.stringify(response.data))
        // console.log(userResultDetect.value)
    }
  } catch (error) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Terjadi error saat mengambil data GIM user.',
        showConfirmButton: false,
        timer: 2000
    });
  }
}

const getUserData = async() => {
  try {
    const formData = new FormData()
    formData.append('refresh_user', 'true')
    const userData = await initAPI('post', 'login', formData, token)
    userDatas.value = userData.data
    store.commit('user', userData.data.customer)
    localStorage.setItem('userData', JSON.stringify(userData.data.customer))

    console.log(`data nih`, userData.data.customer)
    if(userData.data.customer.is_detected == 'Selesai Terdeteksi') isTestedGIM.value = true
      // store.commit('userResultDetect', userData.data.customer.customers_results)
      // propsGIM.value = userData.data.customer.customers_results

    if(userData.data.customer.customers_iq !== null) isTestedIQ.value = true
      // propsIq.value = userData.data.customer.customers_iq

    if(userData.data.customer.customers_assessments !== null) isAssessment.value = true
      // propsAssessment.value = userData.data.customer.customers_assessments

    if(userData.data.customer.customers_cpm !== null) isTestedCPM.value = true
      // propsCPM.value = userData.data.customer.customers_cpm

      await Promise.all([
        getGIMResult(userData.data.customer.id),
        getAssessmentResult(userData.data.customer.id)
      ]);
  } catch (error) {
    console.log(`error ie`, error)
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Terjadi error saat mengambil data user.',
        showConfirmButton: false,
        timer: 2000
    });
  } finally {
    loading.value = false
  }
}


onBeforeMount(() => {
  getUserData()
})

onMounted(() => {
  // loading.value = false
  dataProfileInclomplete.value = cekDataProfile()
  //cek aya token teu
  if(token){
      const decodedToken = jwtDecode(token)
      if(decodedToken && decodedToken.role) {
        newRole.value = decodedToken.role
      }
  } else {
      localStorage.clear()
      router.push('/login')
  }

  // if(!userData.value){
      // const localStorageUserData = localStorage.getItem('userData')
      // const parsedUserData = JSON.parse(localStorageUserData)
      // store.commit('user', parsedUserData)
  // }

  // if(newRole.value == 'customer'){
  //   // const token = Cookies.get('token')
  //   const customerId = userData.value.id

  //   try {
  //     //get gim result
  //     const response = await initAPI('get', 'customers/gim-result/'+customerId, null, token)
  //     if(response.data.is_detected == true){
  //         // console.log('aya ajig')
  //         store.commit('userResultDetect', response.data)
  //         localStorage.setItem('userResult', JSON.stringify(response.data))
  //         // console.log(userResultDetect.value)
  //     } else {
  //         store.commit('userResultDetect', response.data)
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'Terjadi error saat mengambil data GIM user.',
  //         showConfirmButton: false,
  //         timer: 2000
  //     });
  //   }

  //   try {
  //     //get iq result
  //     const userId = JSON.parse(localStorage.getItem('userData')).id
  //     const responseIq = await initAPI('get', `customers?id=${userId}`, null, token)
  //     // console.log(responseIq.data.data[0])
  
  //     isTestedIQ.value = responseIq.data.data[0].customer_iq !== null ? true : false
  
  //     if(responseIq.data.data[0].customer_iq !== null){
  //         propsIq.value = responseIq.data.data
  //     }    
  //   } catch (error) {
  //     Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'Terjadi error saat mengambil data IQ user.',
  //         showConfirmButton: false,
  //         timer: 2000
  //     });
  //   }

  //   try {
      
  //   } catch (error) {
      
  //   }
    //get assessment result
    // const responseAssessment = await initAPI('get', `customers/assessments?customer_id=${userId}`, null, token)
    // if(responseAssessment.data.data.length > 0){
    //     isAssessment.value = true
    //     propsAssessment.value = responseAssessment.data.data
    // }
  // }
})
</script>

<style scoped>
.preloader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 100%;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease, height 0.5s ease;
}
.preloader-overlay.hidden {
    opacity: 0;
    height: 0;
    overflow: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>