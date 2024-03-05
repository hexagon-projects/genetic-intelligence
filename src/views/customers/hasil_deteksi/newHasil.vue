<template>
    <section v-if="userData" class="bg-gray-100 pb-8">
        <div class="mx-4 pt-4 mb-2">
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

        <div class="flex flex-col justify-center mx-7 py-4 gap-4">
            <div v-if="userData.is_detected == 'Belum'" class="mt-4 lg:w-full">
                <BelumDeteksi />
            </div>

            <NoteHasilDeteksi v-if="userData.is_detected == 'Selesai Terdeteksi'"/>
            <div class="flex flex-col lg:flex-row justify-center gap-4 lg:my-0">
                <FileDanKonsultasi v-if="userData.is_detected == 'Selesai Terdeteksi'" :userResultDetect="userResultDetect"/>
            </div>

            <VideoHasil v-if="userData.is_detected == 'Selesai Terdeteksi'" :userResultDetect="userResultDetect"/>
          
            <div v-if="userData.is_detected == 'Sudah Disubmit' || userData.is_detected == 'Dalam Review'" class="lg:w-full">
                <DalamProses/>
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

export default {
  name: 'HasilDeteksi',
  components: {BelumDeteksi, FileDanKonsultasi, VideoHasil, NoteHasilDeteksi, DalamProses},
  setup(){
    const sudahTest = ref(true)
    const showModal = ref(false);

    const store = useStore()

    // const userData = computed(() => store.getters.getUserData);
    const userData = JSON.parse(localStorage.getItem('userData'))
    const userRole = computed(() => store.getters.getUserRole);
    const userResultDetect = JSON.parse(localStorage.getItem('userResult'))
    console.log(userResultDetect)

    return {
        sudahTest,
        userData,
        userRole,
        userResultDetect,
    }
  }
}
</script>