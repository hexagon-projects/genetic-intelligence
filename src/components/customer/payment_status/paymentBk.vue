<template>
<div v-if="loading" class="preloader-overlay">
    <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
</div>

<div v-else-if="!loading && isSuccess !== null">
    <div v-if="isSuccess == true" class="block">
        <div id="img-login" class="flex flex-col lg:flex-row items-center justify-center lg:gap-4 h-screen">
            <div class="bg-white flex flex-col shadow-lg rounded-lg p-6 mx-4 md:mx-auto">
                <a class="animate-bounce mb-4 mx-auto bg-success px-6 py-6 rounded-full"><PhCheck size="38" fill="white"/></a>
                <div class="text-center">
                    <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Pembayaran Berhasil!</h3>
                    <p class="text-gray-600 my-2">Terimakasih telah melakukan pembayaran, kamu bisa lanjut sekarang.</p>
                    <!-- <p> A!  </p> -->
                    <div v-if="paymentReservasiCheck" class="pb-4 pt-6 text-center">
                        <button @click="kembali" class="rounded-lg font-myFont px-12 bg-biru hover:bg-opacity-75 hover:shadow-lg text-white font-medium py-3">
                        Kembali 
                        </button>
                    </div>

                    <div v-else class="pb-4 pt-6 text-center">
                        <button @click="toDashboard" class="rounded-lg font-myFont px-12 bg-biru hover:bg-opacity-75 hover:shadow-lg text-white font-medium py-3">
                        Kembali 
                        </button>
                    </div>
                </div>
    
                <!-- <div>
                </div> -->
            </div>
    
            <!-- <div v-else class="bg-white flex flex-col shadow-lg rounded-lg p-6 mx-4 md:mx-auto">
                <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
            </div> -->
        </div>
    
        <!-- <div v-else>
            <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
        </div> -->
    </div>
    
    <div v-else-if="isSuccess == false" class="block">
        <div id="img-login" class="flex flex-col lg:flex-row items-center justify-center lg:gap-4 h-screen">
            <div class="mx-4 bg-white flex flex-col shadow-lg rounded-lg p-6 md:mx-auto">
            
            <a class="animate-wiggle mb-4 mx-auto bg-danger px-6 py-6 rounded-full"><PhX size="38" fill="white"/></a>
            <div class="text-center">
                <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Pembayaran Belum Berhasil</h3>
                <p class="text-gray-600 my-2">Sayang sekali pembayaran kamu belum berhasil, cek ulang yuk.</p>
                <!-- <p> A!  </p> -->
                <div class="pb-4 pt-6 text-center">
                    <button @click="checkUlang" class="mr-2 rounded-lg font-myFont px-12 bg-biru hover:bg-opacity-75 hover:shadow-lg text-white font-medium py-3">
                        Cek Ulang
                    </button>
                    <button @click="toDashboard" class="rounded-lg font-myFont px-12 border bg-white hover:bg-opacity-75 hover:shadow-lg text-dark font-medium py-3">
                        Kembali
                    </button>
                </div>
            </div>
    
            <!-- <div v-else>
                <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-screen m-auto"></span>
            </div> -->
        </div>
        </div>
    </div>
    
</div>

<div v-else-if="!loading && isSuccess == null" class="block">
    <div id="img-login" class="flex flex-col lg:flex-row items-center justify-center lg:gap-4 h-screen">
        <div class="mx-4 bg-white flex flex-col shadow-lg rounded-lg p-6 md:mx-auto">
            <h1 class="font-myFont mb-2">Tidak ada Pembayaran yang sedang di proses</h1>
            <button @click="toLogin" class="rounded-lg font-myFont px-12 bg-biru hover:bg-opacity-75 hover:shadow-lg text-white font-medium py-3">
                Kembali
            </button>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { PhX, PhCheck } from '@phosphor-icons/vue'
import initAPI from '../../../api/api'
import { useRouter, useRoute } from 'vue-router'
import qs from 'qs'
import Cookies from 'js-cookie'

// Ambil parameter dari URL
const route = useRoute()
const router = useRouter()

const merchantOrderId = route.query.merchantOrderId
const resultCode = route.query.resultCode
const reference = route.query.reference

console.log({ merchantOrderId, resultCode, reference })

// State
const loading = ref(false)
const isSuccess = ref(null)
const dataCheckUlang = ref(null)
const paymentReservasiCheck = ref(null)

onBeforeMount(async () => {
  loading.value = true

  if (JSON.parse(localStorage.getItem('bayarReservasi'))) {
    paymentReservasiCheck.value = true
  }

  if (merchantOrderId) {
    const token = Cookies.get('token')
    try {
      const check = await initAPI('get', 'v2/payment/bk/check?merchant_order_id=' + merchantOrderId, null, token)
      console.log(`check status pembayaran`, check.data)
      // Uncomment jika ingin atur hasil ke isSuccess
      if (check.data.success === true) {
        isSuccess.value = true
      } else {
        isSuccess.value = false
        dataCheckUlang.value = check.data
      }
    } catch (error) {
      console.error('Error checking payment status:', error)
    }
  }

  loading.value = false
})

// Fungsi navigasi
const toLogin = () => {
  localStorage.removeItem('merchantId')
  router.push('/login')
}

const toDashboard = async () => {
  localStorage.removeItem('merchantId')

  const token = Cookies.get('token')
  const formData = new FormData()
  formData.append('refresh_user', 'true')

  try {
    const response = await initAPI('post', 'login', formData, token)
    if (response.data.success) {
      localStorage.setItem('userData', JSON.stringify(response.data.customer))
      router.push('/')
    }
  } catch (error) {
    console.error('Login refresh failed:', error)
  }
}

const kembali = () => {
  localStorage.removeItem('merchantId')
  localStorage.removeItem('bayarReservasi')
  router.push({ name: 'user.views.reservasi' })
}

const checkUlang = async () => {
  try {
    const token = Cookies.get('token')
    const response = await initAPI(
      'post',
      dataCheckUlang.value.check_url,
      qs.stringify(dataCheckUlang.value.body),
      token
    )

    isSuccess.value = response.data.success
  } catch (error) {
    console.error('Error in checkUlang:', error)
  }
}
</script>


<style scoped>
#img-login {
  min-height:100%;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url("../../../assets/img/bg-login2-compress.jpg");
  /* background:linear-gradient(0deg, rgba(255, 0, 150, 0.3), rgba(38, 173, 197, 0.3)), url("../../../assets/img/bg-login2.jpg"); */
  background-repeat: no-repeat;
    background-size: 100% 100%;
      /* background:linear-gradient(0deg, rgba(255, 0, 150, 0.3), rgba(38, 173, 197, 0.3)), url("../../../assets/img/bg-login.jpg");
      background-size:cover; */
}

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
</style>