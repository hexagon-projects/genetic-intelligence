<template>
    <!-- <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div> -->

    
    <transition name="fade" mode="out-in">
        <div v-if="isKebijakanPrivasi" class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
        >
            <KebijakanPrivasi @toggleKebijakanPrivasi="toggleKebijakanPrivasi"/>
        </div>
    </transition>

    <!-- <div v-if="dataProfileInclomplete">
        <modalCekProfile/>
    </div> -->

    <Layout>
        <div class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex">
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Beranda</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Lakukan Tes</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Test RMIB</div>
        </div>

        <!-- <SelesaiTest v-if="isTested" routeUrl="user.views.hasil_iq" message="Test IQ Selesai!"
        :subMessage="subMessage"/> -->

        <section v-if="!isTested" class="pb-[34px] w-full bg-white">
            <transition name="fade" mode="out-in">
                <div v-if="isKebijakanPrivasi" class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
                >
                    <KebijakanPrivasi @toggleKebijakanPrivasi="toggleKebijakanPrivasi"/>
                </div>
            </transition>
            
            <div class="flex justify-center items-center">
                <Instruksi v-if="isInstruksi"/>
            </div>

            <div v-if="!isInstruksi" class="mb-[48px] w-full flex justify-center items-center">
                <SoalTest/>
            </div>
        </section>
    </Layout>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import Layout from '@/Layout/Customer/Layout.vue';
import Instruksi from './intruksi.vue';
import SelesaiTest from '@/components/REMAKE/HasilTest/SelesaiTest/SelesaiTest.vue';
import SoalTest from '@/components/REMAKE/Test/IQ/SoalTest/SoalTest.vue';
import { useStore } from 'vuex';
import initAPI from '@/api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Cookies from 'js-cookie'
import KebijakanPrivasi from '@/components/REMAKE/Modal/KebijakanPrivasi/KebijakanPrivasi.vue';
// import cekDataProfile from '@/cekProfile'
// import cekDataProfile from '@/components/cekProfile';
import modalCekProfile from '@/components/modalCekProfile/modalCekProfile.vue';
// import modalCekProfile from '../../modalCekProfile/modalCekProfile.vue';

const isKebijakanPrivasi = ref(true)
// const dataProfileInclomplete = cekDataProfile()

// const subMessage = `Kerja yang bagus! Kamu telah menyelesaikan Tes <span class="font-bold">Intelligent Quotient (IQ)</span>. Mari lihat hasilnya dan temukan lebih banyak tentang potensi diri Kamu!`

const store = useStore()

// const loading = ref(true)

const isTested = ref(false)
const isInstruksi = computed(() => store.getters.getStatusIsInstruksi)
// const customerId = ref(null)

const getUserData = async() => {
    try {
        const token = Cookies.get('token')
        const userData = await initAPI('get', 'rmib/questions?gender=1', null, token)

        console.log(userData.data)
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi kesalahan saat mengambil data user',
            showConfirmButton: false,
            timer: 2000
        });
    } finally {
        // loading.value = false
    }
}

onMounted(()=>{
    getUserData()
})

const toggleKebijakanPrivasi = () => {
    isKebijakanPrivasi.value = !isKebijakanPrivasi.value
}

// onMounted(async() => {
//    await getUserData()
// })

onBeforeMount(() => {
    const doneInstruksi = localStorage.getItem('isInstruksi')
    if(doneInstruksi && doneInstruksi == 'done'){
        store.commit('setIsInstruksi', false)
    }

    if(localStorage.getItem('isKebijakanPrivasi') == 'Ya'){
        isKebijakanPrivasi.value = false
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>