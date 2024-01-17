<template>
    <!-- <navbar/> -->
    <section v-if="userData" class="bg-gray-100 pb-16">
        <div class="flex flex-col lg:flex-row justify-center mx-4 py-8 gap-4">
            <div v-if="userData.is_detected == 'Belum'" class="lg:w-2/3">
                <BelumDeteksi />
            </div>

            <FileHasilDeteksi v-if="userData.is_detected == 'Selesai Terdeteksi'" />

            <VideoHasilDeteksi v-if="userData.is_detected == 'Selesai Terdeteksi'" />
            <!-- <div class="lg:w-2/3">
                <div class="flex flex-col gap-4">
                    <div class="bg-white rounded-lg shadow-xl p-4 h-full overflow-hidden">
                        <div class="flex flex-col justify-center">
                            <h2 class="font-myFont text-center text-black font-semibold">Halo! Berikut adalah hasil deteksi GIM kamu</h2>
                            <p class="font-myFont text-center text-gray-500 text-sm mb-6">Fahami diri kamu lewat hasil deteki GIM ini</p>

                            <div class="flex flex-col md:flex-row lg:flex-row justify-center items-center gap-2">
                                <iframe class="w-11/12 lg:w-3/4 mb-6" width="560" height="315" :src="userResultDetect.gim.url" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
            
            <div v-if="userData.is_detected == 'Sudah Disubmit' || userData.is_detected == 'Dalam Review'" class="lg:w-2/3">
                <DalamProses/>
            </div>
        </div>

        <NoteHasilDeteksi v-if="userData.is_detected == 'Selesai Terdeteksi'"/>

        <!-- <div v-if="userData.is_detected == 'Sudah Disubmit' || userData.is_detected == 'Dalam Review'" class="lg:2/3">
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
        </div> -->
    </section>

    <section v-else-if="!userResultDetect" class="bg-gray-100 pb-16">
        <div class="flex flex-col lg:flex-row justify-center mx-4 py-4 gap-4">
            <div class="lg:w-2/3">
                <div class="bg-white rounded-lg shadow-lg p-4">
                    <div class="flex flex-col justify-center">
                        <h2 class="font-myFont text-center text-black font-semibold">Hasil deteksi tidak ditemukan</h2>
                        <p class="font-myFont text-center text-gray-500 text-sm mb-4">Hmmm kamu nampaknya belum melakukan Deteksi GIM...</p>
                        <RouterLink :to="{name: 'user.views.deteksi'}" class="px-2 py-2 w-1/2 lg:w-1/4 self-center text-center rounded-lg bg-secondary font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
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
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import initApi from '../../api/api'
import BelumDeteksi from '../../components/Deteksi_GIM/BelumDeteksi/belum.vue'
import FileHasilDeteksi from '../../components/Deteksi_GIM/SudahDeteksi/FileHasilDeteksi.vue'
import VideoHasilDeteksi from '../../components/Deteksi_GIM/SudahDeteksi/VideoHasilDeteksi.vue'
import NoteHasilDeteksi from '../../components/Deteksi_GIM/SudahDeteksi/NoteHasilDeteksi.vue'
import DalamProses from '../../components/Deteksi_GIM/DalamProses/DalamProses.vue';

export default {
    name: 'HasilDeteksi',
    components: {BelumDeteksi, FileHasilDeteksi, VideoHasilDeteksi, NoteHasilDeteksi, DalamProses},
    setup(){
        const sudahTest = ref(true)
        const showModal = ref(false);

        const store = useStore()

        const userData = computed(() => store.getters.getUserData);
		const userRole = computed(() => store.getters.getUserRole);
		const userResultDetect = computed(() => store.getters.getUserResultDetect);

        console.log(userResultDetect.value)

        // if (!userData.value && !userRole.value) {
        //     const localStorageUserData = localStorage.getItem('userData');
        //     const localStorageUserRole = localStorage.getItem('userRole');
        //     if (localStorageUserData && localStorageUserRole) {
        //         const parsedUserData = JSON.parse(localStorageUserData);
        //         const parsedUserRole = JSON.parse(localStorageUserRole);
        //         store.commit('user', parsedUserData);
        //         store.commit('userRole', parsedUserRole);
        //     } else { 
        //         console.log('localstorage kosong')
        //     }
        // }

        onMounted(async() => {
            if(userResultDetect.value == null) {
                const accessToken = JSON.parse(localStorage.getItem('token'))
                const userId = userData.value.id
    
                const response = await initApi('get', 'customers/gim-result/'+userId, null, accessToken)
                if(response.data.is_detected == true){
                    // console.log('aya ajig')
                    store.commit('userResultDetect', response.data)
                } else {
                    store.commit('userResultDetect', false)
                }
            }
            // console.log(userResultDetect.value)
        })


        return {
            sudahTest,
            userData,
            userRole,
            userResultDetect,
        }
    }
}
</script>