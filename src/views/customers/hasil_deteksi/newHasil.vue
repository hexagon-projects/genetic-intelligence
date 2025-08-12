<template>
    <section v-if="userData" class="bg-gray-100 pb-8">
        <div v-if="loadingFetch" class="preloader-overlay">
            <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
        </div>

        <div v-else>
            <div class="mx-4 pt-4 mb-4">
                <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                    <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 hover:text-dark text-base">
                        Beranda
                    </RouterLink>
                    <span class="mx-2 text-gray-400 text-base">/</span>
                    <a class="text-gray-400 text-base">
                        Hasil Test
                    </a>
                    <span class="mx-2 text-base">/</span>
                    <RouterLink :to="{name: 'user.views.hasil_deteksi'}" class="text-base text-dark hover:text-dark/70">
                        Hasil GIM
                    </RouterLink>
                </ol>
            </div>
    
            <div class="flex flex-col justify-center mx-7 gap-4">
                <div v-if="userData.is_detected == 'Belum'" class="mt-4 lg:w-full">
                    <BelumDeteksi />
                </div>
    
                <NoteHasilDeteksi v-if="userData.is_detected == 'Selesai Terdeteksi'"/>
                <div class="flex flex-col lg:flex-row justify-center gap-4 lg:my-0">
                    <FileDanKonsultasi v-if="userData.is_detected == 'Selesai Terdeteksi'" :userResultDetect="userResultDetect"/>
                </div>
    
                <div class="order-6 flex flex-col gap-4">
                    <cardPendidikanSampaiKekurangan v-if="userData.is_detected == 'Selesai Terdeteksi'"/>
                </div>
    
                <div class="order-4">
                    <VideoHasil v-if="userData.is_detected == 'Selesai Terdeteksi'" :userResultDetect="userResultDetect"/>
                </div>
    
                <div v-if="userData.is_detected == 'Selesai Terdeteksi'" class="order-5 flex flex-col lg:flex-row justify-center gap-4 lg:my-0">
                    <siapakahDirimu v-if="gimDatas" :gimDatas="gimDatas"/>
                </div>
    
                <div v-if="userData.is_detected == 'Selesai Terdeteksi'" class="order-5">
                    <rangkumanKecerdasan v-if="gimDatas" :gimDatas="gimDatas"/>
                </div>
    
                <div v-if="userData.is_detected == 'Selesai Terdeteksi'" class="order-7 flex flex-col lg:flex-row justify-center gap-4 lg:my-0">
                    <belajarDanSukses v-if="gimDatas" :gimDatas="gimDatas"/>
                </div>
    
                <div v-if="userData.is_detected == 'Selesai Terdeteksi'" class="order-7 flex flex-col lg:flex-row justify-center gap-4 lg:my-0">
                    <tipsBisnisDanPeranVue v-if="gimDatas" :gimDatas="gimDatas"/>
                </div>
    
                <div v-if="userData.is_detected == 'Selesai Terdeteksi'" class="order-7 flex flex-col lg:flex-row justify-center gap-4 lg:my-0">
                    <amalanCerdasDanRohani v-if="gimDatas" :gimDatas="gimDatas"/>
                </div>
    
                <div v-if="userData.is_detected == 'Sudah Disubmit' || userData.is_detected == 'Dalam Review'" class="lg:w-full">
                    <DalamProses/>
                </div>
            </div>
        </div>
  </section>

  <section v-else-if="!userResultDetect" class="bg-gray-100 pb-16">
      <div class="flex flex-col lg:flex-row justify-center mx-4 py-4 gap-4">
          <div class="lg:w-2/3">
              <div class="bg-white rounded-lg shadow-lg p-4">
                  <div class="flex flex-col justify-center">
                      <h2 class="font-myFont text-center text-black font-semibold">Hasil deteksi tidak ditemukan</h2>
                      <p class="font-myFont text-center text-gray-500 text-sm mb-4">Hmmm kamu nampaknya belum melakukan Deteksi GIM...</p>
                      <RouterLink :to="{name: 'user.views.deteksi'}" class="px-2 py-2 w-1/2 lg:w-1/4 self-center text-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                          Deteksi Sekarang
                      </RouterLink>
                      <img src="../../../assets/img/no-data-found.png" class="w-96 self-center" alt="No Data Found">
                  </div>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { useStore } from 'vuex'
import initApi from '../../../api/api'
import BelumDeteksi from '../../../components/Deteksi_GIM/BelumDeteksi/belum.vue'
import FileDanKonsultasi from '../../../components/Deteksi_GIM/newComps/fileHasil.vue'
import VideoHasil from '../../../components/Deteksi_GIM/newComps/videoHasil.vue'
import NoteHasilDeteksi from '../../../components/Deteksi_GIM/SudahDeteksi/NoteHasilDeteksi.vue'
import DalamProses from '../../../components/Deteksi_GIM/DalamProses/DalamProses.vue';
import siapakahDirimu from './siapakahDirimu.vue';
import rangkumanKecerdasan from './rangkumanKecerdasan.vue';
import cardPendidikanSampaiKekurangan from './PendidikanPekerjaanPersonal.vue';
import belajarDanSukses from './belajarDanSukses.vue';
import tipsBisnisDanPeranVue from './tipsBisnisDanPeran.vue';
import amalanCerdasDanRohani from './amalanCerdasDanRohani.vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
  name: 'HasilDeteksi',
  components: {
    siapakahDirimu, rangkumanKecerdasan, cardPendidikanSampaiKekurangan, belajarDanSukses, 
    tipsBisnisDanPeranVue, amalanCerdasDanRohani, BelumDeteksi, 
    FileDanKonsultasi, VideoHasil, NoteHasilDeteksi, DalamProses
},
  setup(){
    const router = useRouter()
    const loadingFetch = ref(false)
    const sudahTest = ref(true)
    const showModal = ref(false);

    const listPendidikan = ref([])
    const listPekerjaan = ref([])

    const store = useStore()

    // const userData = computed(() => store.getters.getUserData);
    const userData = JSON.parse(localStorage.getItem('userData'))
    const userRole = computed(() => store.getters.getUserRole);
    const userResultDetect = JSON.parse(localStorage.getItem('userResult'))
    console.log(userResultDetect)

    const gimDatas = ref(null)

    onMounted(async() => {
        loadingFetch.value = !loadingFetch.value
        const token = Cookies.get('token')
        if(token){
            const userId = JSON.parse(localStorage.getItem('userData')).id
            try {
                const response = await initApi('get', 'customers/gim-result/'+userId, null, token)
                if(response.data.gim){
                    console.log(response.data.gim.gim_datas)
                    gimDatas.value = response.data.gim.gim_datas
                }
            } catch (error) {
                console.log(error)
                Swal.fire({
                        icon: 'error',
                        title: 'Terjadi kesalahan saat mengambil data',
                        text: 'Error terjadi.',
                        showConfirmButton: false,
                        timer: 2000
                    });
            }
        } else {
            router.push('/login')
            localStorage.clear()
        }
        loadingFetch.value = !loadingFetch.value
    })

    return {
        loadingFetch,
        sudahTest,
        userData,
        userRole,
        userResultDetect,
        gimDatas
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
.preloader-overlay.hidden {
    opacity: 0;
    height: 0;
    overflow: hidden;
}
</style>