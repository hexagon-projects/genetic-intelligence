<template>
    <section v-if="userData" class="bg-gray-100 pb-16">
        <div class="flex flex-col lg:flex-row justify-center mx-4 py-8 gap-4">
            <div v-if="userData.is_detected == 'Belum'" class="bg-white w-full lg:w-3/4 rounded-lg shadow-lg p-4">
                <div class="flex flex-col justify-center">
                    <div class="mb-8">
                        <h2 class="font-myFont text-center text-black font-semibold">Lakukan Deteksi Genetic Intelligence Mapping Sekarang</h2>
                        <p class="font-myFont text-center text-gray-500 text-sm">Perhatikan instruksi dari konsultan dibawah ini</p>
                    </div>

                    <Instruksi/>
                    <FormUpload/>
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
import Instruksi from '../../components/Deteksi_GIM/Instruksi.vue';
import FormUpload from '../../components/Deteksi_GIM/FormUpload.vue';
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'DeteksiGim',
    components: {Instruksi, FormUpload},
    setup(){
        const store = useStore()
        const userData = computed(() => store.getters.getUserData)
        
        return{
            userData
        }
    }
}
</script>