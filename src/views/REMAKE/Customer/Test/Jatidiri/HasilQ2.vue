<template>
    <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>
  
    <Layout v-if="!loading">
        <div class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex">
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Beranda</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Hasil Tes</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Jatidiri</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Q2</div>
        </div>
  
        <BelumTest v-if="!isTested" routeUrl="user.views.test_kebahagiaan" message="Test Jatidiri Q2" 
        subMessage="Tes yang dirancang untuk mengukur kepercayaan diri yang meliputi keyakinan, nilai, tujuan, dan peran sosial."/>
  
        <div v-if="isTested" >
          <section id="penjelasan" class=" h-auto mx-auto p-9 bg-white rounded-3xl shadow flex flex-col gap-14 items-center">
            <div class="flex flex-col items-center gap-14">
              <div class="flex flex-col items-center gap-2 self-stretch justify-center ">
                  <div class="md:w-[200px] md:h-[158.54px] mx-auto">
                      <img src="@/assets/img/logo-jatidiri-hasi-cpm.png">
                  </div>
                  <section class="flex flex-col items-center gap-14">
                    <span class="w-full text-[#0B0B79] text-2xl font-semibold text-center font-['Sora'] leading-[32px]">
                      Hasil Tes Jatidiri Q2
                    </span>
                      <div class="flex flex-col justify-center gap-6 px-6 py-6 rounded-2xl bg-[#3030F8] shadow-lg self-stretch max-w-[1000px]">
                          <div class="flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 leading-[24px] ">
                              <div class="size-[80px] md:size-[100px] flex mx-auto justify-center items-center">
                                  <img src="@/assets/icons/reshot-icon-search-results.svg">
                              </div>
                              <div class="flex flex-col items-start gap-4 w-full">
                                <span class=" text-[#FFF] font-['Roboto'] font-semibold self-stretch leading-8 not-italic text-2xl">
                                  <!-- {{ formattedCategoryHeader }} -->
                                    {{ hasilQ2  }}
                              </span>
                              <span class=" text-[#FFF] text-base font-normal font-['Roboto'] leading-6 mt-2 not-italic">
                                  <!-- {{ formattedCategoryDesc }} -->
                                    {{ descQ2 }}
                              </span>
                              </div>
                          </div>
                      </div> 
                  </section>
              </div>
            </div>
              
          </section>
  
          
          <!-- <VidioHasil :videoUrl="videoResult"/> -->
  
          <section class="bg-white py-[46px]">
              <Reservasi/>
          </section>
      </div>
    </Layout>
  </template>
  
  <script setup>
  import Layout from '@/Layout/Customer/Layout.vue';
  import videojs from 'video.js';
  import 'video.js/dist/video-js.css';
  import '@videojs/http-streaming';
  import Reservasi from '@/components/REMAKE/ReservasiFooter/Reservasi.vue';
  import BelumTest from '@/components/REMAKE/HasilTest/BelumTest/BelumTest.vue';
  import VidioHasil from '@/components/REMAKE/HasilTest/VidioHasil/VidioHasil.vue';
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import Cookies from 'js-cookie';
import initAPI from '@/api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
  
  const loading = ref(true)
  const isTested = ref(true)
  
  const hasilQ2 = ref('')
  const descQ2 = ref('')
  const videoResult = ref('')

  const getTikData = async(userId) => {
  try {
      const token = Cookies.get('token')
      const response = await initAPI('get', `customers/q2?customer_id=${userId}`, null, token)
      // console.log(`data iaa`, response.data)

      console.log(response)
      isTested.value = response.data.data ? true : false
      hasilQ2.value = response.data.data ? response.data.data[0].name : null
      descQ2.value = response.data.data ? response.data.data[0].category : null
      videoResult.value = response.data.data ? response.data.data[0].video : null
  } catch (error) {
      console.log(`error`,error)
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Terjadi error saat mengambil data Test Index Kebahagiaan user',
          showConfirmButton: false,
          timer: 2000
      });
  }
}

const getUserData = async() => {
  try {
      const token = Cookies.get('token')
      const formData = new FormData()
      formData.append('refresh_user', 'true')
      const userData = await initAPI('post', 'login', formData, token)
      // console.log(`data hasil`, userData.data)

      await getTikData(userData.data.customer.id)
  } catch (error) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Terjadi error saat mengambil data user',
          showConfirmButton: false,
          timer: 2000
      });
  } finally {
      // loading.value = false
  }
}
          
  onMounted(async() => {
      await getUserData()
      loading.value = false
  
      const videoId = document.getElementById('example-video')
      if(videoId){
          const player = videojs(videoId);
          player.play();
      
          onBeforeUnmount(() => {
              player.dispose()
          })
      }
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
  
  /* Transition for fade and slide effect */
  .slide-fade-enter-active,
  .slide-fade-leave-active {
  transition: transform 0.3s ease-out;
  }
  
  /* Mengatur elemen saat mulai masuk dan menghilang */
  .slide-fade-enter-from,
  .slide-fade-leave-to {
  transform: translateX(20px); /* Efek geser saat elemen muncul dan menghilang */
  }
  
  /* Mengatur elemen saat masuk ke posisi akhir */
  .slide-fade-enter-to,
  .slide-fade-leave-from {
  transform: translateX(0); /* Posisi akhir elemen */
  }
  </style>  