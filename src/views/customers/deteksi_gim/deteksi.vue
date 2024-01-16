<template>
    <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>
    <div v-else>
        <section v-if="userData" class="bg-gray-100 pb-8 text-dark">
            <div class="mx-4 pt-4">
                <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold dark:text-white-dark">
                    <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 text-base">
                        Beranda
                    </RouterLink>
                    <span class="mx-2 text-base">/</span>
                    <RouterLink :to="{name: 'user.views.deteksi'}" class="text-base text-dark hover:text-dark/70">
                        Test GIM
                    </RouterLink>
                </ol>
            </div>
            <div class="flex flex-col lg:flex-row justify-center mx-7 pt-4 gap-4">
                <div v-if="userData.is_detected == 'Belum'" class="bg-white w-full lg:w-full rounded-lg shadow-lg p-7">
                  <div class="mb-6 flex items-center">
                    <h5 class="text-lg font-semibold dark:text-white-light">Tes Pendeteksian Genetic Intelligence Mapping</h5>
                  </div>
                  <hr>
                    <div class="my-6" x-data="{ activeTab: 1}">
                      <div class="inline-block w-full">
                          <div class="relative z-[1]">
                              <div class="bg-biru w-[15%] h-1 absolute ltr:left-0 rtl:right-0 top-[30px] m-auto -z-[1] transition-[width]" :class="{'w-[15%]' : activeTab === 1, 'w-[48%]' : activeTab === 2, 'w-[81%]' : activeTab === 3}"></div>
                              <ul class="mb-5 grid grid-cols-3">
                                  <li class="mx-auto">
                                      <button class="border-[3px] border-[#f3f2ee] bg-white flex justify-center items-center w-16 h-16 rounded-full cursor-default" :class="{'!border-biru !bg-biru text-white': activeTab === 1, 'text-dark': activeTab !== 1}">
                                          <PhVideo :size='25'/>
                                      </button>
                                      <span class="text-center block mt-2" :class="{'text-dark' : activeTab === 1}">Instruksi</span>
                                  </li>
                                  <li class="mx-auto">
                                      <button class="border-[3px] border-[#f3f2ee] bg-white flex justify-center items-center w-16 h-16 rounded-full cursor-default" :class="{'!border-biru !bg-biru text-white': activeTab === 2, 'text-dark': activeTab !== 2}">
                                          <PhFileArrowUp :size='25'/>
                                      </button>
                                      <span class="text-center block mt-2" :class="{'text-dark' : activeTab === 2}">Upload</span>
                                  </li>
                                  <li class="mx-auto">
                                      <button class="border-[3px] border-[#f3f2ee] bg-white flex justify-center items-center w-16 h-16 rounded-full cursor-default" :class="{'!border-biru !bg-biru text-white': activeTab === 3 , 'text-dark': activeTab !== 3}">
                                          <PhCheckFat :size='25'/>
                                      </button>
                                      <span class="text-center block mt-2" :class="{'text-dark' : activeTab === 3}">Submit</span>
                                  </li>
                              </ul>
                          </div>
                          <div>
                              <div v-if="activeTab === 1">
                                  <Instruksi/>
                                  <div class="flex flex-col justify-items-start mb-10 lg:mx-40">
                                      <div class="relative flex">
                                          <div class="flex h-6 items-center">
                                              <input type="checkbox" v-model="checked" id="check-yes" class="h-4 w-4 rounded border-gray-300 text-biru focus:biru" />
                                          </div>
                                          <div class="text-sm leading-6">
                                              <label for="check-yes" class="ml-2 text-sm text-success-600">Saya telah mengikuti instruksi dari video diatas sampai selesai</label>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div v-if="activeTab === 2">
                                  <FormUpload/>
                              </div>
                              <div v-if="activeTab === 3">
                                  <Review/>
                              </div>
                          </div>
                          <div class="flex justify-between">
                              <button type="button" :class="{'opacity-75': activeTab === 1}" class="flex items-center font-myFont px-4 py-2 rounded-lg bg-biru text-white" :disabled="activeTab === 1" @click="activeTab--"><PhCaretLeft weight="bold"/>Kembali</button>
                              <button v-if="activeTab === 3" @click="submitForm()" class="flex items-center font-myFont px-4 py-2 rounded-lg bg-success text-light">Submit</button>
                              <button v-else-if="activeTab < 3" type="button" id="btn-next" :class="{'cursor-not-allowed': checked == false}" class="flex items-center font-myFont px-4 py-2 rounded-lg bg-biru bg-opacity-100 text-white" :disabled="activeTab === 3 || !checked" @click="activeTab++">Selanjutnya <PhCaretRight weight="bold"/></button>
                          </div>
                      </div>
                  </div>
                </div>
    
                <div v-else-if="userData.is_detected == 'Sudah Disubmit' || userData.is_detected == 'Dalam Review'" class="lg:w-full">
                    <div class="bg-white rounded-lg shadow-lg p-4">
                        <div class="flex flex-col lg:flex-row items-center">
                            <div class="lg:w-1/2">
                                <div class="flex flex-col justify-center">
                                    <img src="../../../assets/img/search.png" class="w-1/2 self-center mb-2 animate-[wiggle_4s_ease-in-out_infinite]" alt="Dalam Proses Image">
                                </div>
                            </div>
                            <div class="lg:w-1/2">
                                <div class="flex flex-col">
                                    <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Tunggu ya...</h1>
                                    <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Test kamu sedang dalam proses!</h1>
                                    <p class="font-myFont text-start text-dark text-sm mb-4">Test kamu saat ini sedang di-proses oleh Konsultan, kami akan hubungi ketika selesai.</p>
                                    <button @click="refreshData(userData.id)" class="lg:mb-4 my-4 px-2 py-2 w-1/2 lg:w-1/2 self-start text-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                                        Refresh
                                    </button>
                                    <!-- <RouterLink :to="{name: 'views.dashboard'}" class="lg:mb-4 my-4 px-2 py-2 w-1/2 lg:w-1/2 self-start text-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                                        Refresh
                                    </RouterLink> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div v-else-if="userData.is_detected == 'Selesai Terdeteksi'" class="lg:w-full">
                    <div class="bg-white rounded-lg shadow-lg p-4">
                        <div class="flex flex-col lg:flex-row items-center">
                            <div class="lg:w-1/2">
                                <div class="flex flex-col justify-center">
                                    <img src="../../../assets/img/hasil-deteksi.png" class="w-full lg:w-1/2 self-center" alt="No Data Found">
                                </div>
                            </div>
                            <div class="lg:w-1/2">
                                <div class="flex flex-col">
                                    <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Test GIM kamu sudah selesai!</h1>
                                    <p class="font-myFont text-start text-gray-500 text-sm mb-4">Ayo lihat hasil test GIM kamu sekarang</p>
                                    <RouterLink :to="{name: 'user.views.hasil_deteksi'}" class="lg:mb-4 my-4 px-2 py-2 w-1/2 lg:w-1/4 self-start text-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                                        Lihat Hasil
                                    </RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
            </div>
        </section>
    </div>
</template>

<script>
import Instruksi from '../../../components/Deteksi_GIM/Instruksi.vue';
import FormUpload from '../../../components/Deteksi_GIM/FormUpload.vue';
import Review from '../../../components/Deteksi_GIM/Review.vue';
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import initAPI from '../../../api/api';
import { PhPrinter, PhTarget, PhVideo, PhFileArrowUp, PhCheckFat, PhCaretLeft, PhCaretRight } from "@phosphor-icons/vue";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { onBeforeRouteUpdate } from 'vue-router';

export default {
  name: 'deteksi',
  components: {Instruksi, FormUpload, Review, PhVideo, PhFileArrowUp, PhCheckFat, PhCaretLeft, PhCaretRight},
  setup(){
    const loading = ref(false);
    const store = useStore()
    const userData = computed(() => store.getters.getUserData)
    const activeTab = ref(1)
    const checked = ref(false)
    const reviewImage = computed(() => store.getters.getReviewImage)

    const submitForm = async () => {
      const formData = new FormData();
      formData.append('detection_image', reviewImage.value[0]);
      console.log(`form yeuh`, formData)

      const customerId = userData.value.id
      const token = JSON.parse(localStorage.getItem('token'))

      try {
        if(reviewImage.value !== null){
          const response = await initAPI(
            'post','customers/gim-result/upload-test/'+customerId, formData, token
          );
          if(response.status == 200){
            Swal.fire({
              icon: 'success',
              title: 'File di Upload',
              text: 'Deteksi GIM akan segera di proses',
              showConfirmButton: false,
              timer: 2000
            });
          }
          const updatedCustomer = await initAPI('get', 'customers?id='+customerId, null, token)
          store.commit('user', updatedCustomer.data.data[0])
          localStorage.setItem('userData', JSON.stringify(updatedCustomer.data.data[0]))
          console.log('update', updatedCustomer.data.data[0])
          console.log('Response from API:', response.data);
        } else {
          Swal.fire({
              icon: 'error',
              title: 'Upload Gagal',
              text: 'Upload file terlebih dahulu',
              showConfirmButton: false,
              timer: 2000
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    const refreshData = async(userId) => {
        const token = JSON.parse(localStorage.getItem('token'))
        console.log(`id refresh`, userId)
        loading.value = !loading.value
        const refreshedCustomer = await initAPI('get', 'customers?id='+userId, null, token)
        console.log(refreshedCustomer.data.data[0])
        store.commit('user', refreshedCustomer.data.data[0])
        localStorage.setItem('userData', JSON.stringify(refreshedCustomer.data.data[0]))
        
        const userResult = await initAPI('get', 'customers/gim-result/'+userId, null, token)
        localStorage.setItem('userResult', JSON.stringify(userResult.data))
        loading.value = !loading.value
    }

    return{
        loading,
        userData,
        activeTab,
        checked,
        submitForm,
        refreshData
    }
  }
}
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
</style>