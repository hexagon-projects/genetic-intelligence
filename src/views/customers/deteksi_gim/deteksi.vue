<template>
    <section v-if="userData" class="bg-gray-100 pb-16">
        <div class="flex flex-col lg:flex-row justify-center mx-7 py-8 gap-4">
            <div v-if="userData.is_detected == 'Belum'" class="bg-white w-full lg:w-full rounded-lg shadow-lg p-7">
              <div class="mb-5 flex items-center">
                <h5 class="text-lg font-semibold dark:text-white-light">Tes Pendeteksian Genetic Intelligence Mapping</h5>
              </div>
                <div class="mb-5" x-data="{ activeTab: 1}">
                  <div class="inline-block w-full">
                      <div class="relative z-[1]">
                          <div class="bg-primary w-[15%] h-1 absolute ltr:left-0 rtl:right-0 top-[30px] m-auto -z-[1] transition-[width]" :class="{'w-[15%]' : activeTab === 1, 'w-[48%]' : activeTab === 2, 'w-[81%]' : activeTab === 3}"></div>
                          <ul class="mb-5 grid grid-cols-3">
                              <li class="mx-auto">
                                  <a href="javascript:;" class="border-[3px] border-[#f3f2ee] bg-white flex justify-center items-center w-16 h-16 rounded-full" :class="{'!border-primary !bg-primary text-white': activeTab === 1}" @click="activeTab = 1">
                                      <svg> ... </svg>
                                  </a>
                                  <span class="text-center block mt-2" :class="{'text-primary' : activeTab === 1}">Instruksi</span>
                              </li>
                              <li class="mx-auto">
                                  <a href="javascript:;" class="border-[3px] border-[#f3f2ee] bg-white flex justify-center items-center w-16 h-16 rounded-full" :class="{'!border-primary !bg-primary text-white': activeTab === 2}" @click="activeTab = 2">
                                      <svg> ... </svg>
                                  </a>
                                  <span class="text-center block mt-2" :class="{'text-primary' : activeTab === 2}">Upload</span>
                              </li>
                              <li class="mx-auto">
                                  <a href="javascript:;" class="border-[3px] border-[#f3f2ee] bg-white flex justify-center items-center w-16 h-16 rounded-full" :class="{'!border-primary !bg-primary text-white': activeTab === 3}" @click="activeTab = 3">
                                      <svg> ... </svg>
                                  </a>
                                  <span class="text-center block mt-2" :class="{'text-primary' : activeTab === 3}">Submit</span>
                              </li>
                          </ul>
                      </div>
                      <div>
                          <template x-if="activeTab === 1">
                              <p class="mb-5">Try the keyboard navigation by clicking arrow left or right!</p>
                          </template>
                          <template x-if="activeTab === 2">
                              <p class="mb-5">The next and previous buttons help you to navigate through your content.</p>
                          </template>
                          <template x-if="activeTab === 3">
                              <p class="mb-5">Wonderful transition effects.</p>
                          </template>
                      </div>
                      <div class="flex justify-between">
                          <button type="button" :class="{'opacity-75': activeTab === 1}" class="font-myFont px-4 py-2 rounded-lg bg-primary text-light" :disabled="activeTab === 1" @click="activeTab--">Back</button>
                          <button type="button" class="font-myFont px-4 py-2 rounded-lg bg-primary text-light" :disabled="activeTab === 3" @click="activeTab++">Next</button>
                      </div>
                  </div>
              </div>
            </div>

            <div v-else-if="userData.is_detected == 'Sudah Disubmit' || userData.is_detected == 'Dalam Review'" class="lg:w-2/3">
                <div class="bg-white rounded-lg shadow-lg p-4">
                    <div class="flex flex-col justify-center">
                        <h2 class="font-myFont text-center text-black font-semibold">Deteksi GIM Dalam Proses</h2>
                        <p class="font-myFont text-center text-gray-500 text-sm mb-4">Tunggu ya.. Deteksi GIM kamu sedang di proses</p>
                        <RouterLink :to="{name: 'views.dashboard'}" class="px-2 py-2 w-1/2 lg:w-1/4 self-center text-center rounded-lg bg-secondary font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                            Kembali ke Beranda
                        </RouterLink>
                        <img src="../../assets/img/wait-deteksi-crop.png" class="w-96 self-center" alt="No Data Found">
                    </div>
                </div>
            </div>
            
            <div v-else-if="userData.is_detected == 'Selesai Terdeteksi'" class="lg:w-2/3">
                <div class="bg-white rounded-lg shadow-lg p-4">
                    <div class="flex flex-col justify-center">
                        <h2 class="font-myFont text-center text-black font-semibold">Deteksi GIM kamu sudah selesai!</h2>
                        <p class="font-myFont text-center text-gray-500 text-sm mb-4">Untuk lihat hasil deteksi GIM kamu klik tombol dibawah</p>
                        <RouterLink :to="{name: 'user.views.hasil_deteksi'}" class="mb-4 px-2 py-2 w-1/2 lg:w-1/4 self-center text-center rounded-lg bg-secondary font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                            Lihat Hasil
                        </RouterLink>
                        <img src="../../assets/img/complete-deteksi-crop.png" class="w-96 self-center" alt="No Data Found">
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
import Instruksi from '../../../components/Deteksi_GIM/Instruksi.vue';
import FormUpload from '../../../components/Deteksi_GIM/FormUpload.vue';
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'deteksi',
   setup(){
    const store = useStore()
    const userData = computed(() => store.getters.getUserData)
    const activeTab = ref(1)
    
    return{
        userData,
        activeTab
    }
  }
}
</script>