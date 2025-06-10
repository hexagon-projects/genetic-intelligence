<template>
    <div v-if="loading" class="preloader-overlay">
        <span
            class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>

    <div v-if="dataProfileInclomplete">
        <modalCekProfile />
    </div>

    <Layout v-if="!loading">
        <div class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex">
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Beranda</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Lakukan Tes</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Jatidiri</div>
        </div>

        <div class="flex flex-col items-center justify-center gap-3 w-full p-5 md:w-3/4 mx-auto">
            <h1 class="font-myFont font-semibold text-start text-clip text-lg lg:text-3xl">Tes Jatidiri</h1>
            <small class="text-center">Jatidiri (self-identity) tes untuk mengukur kepercayaan diri, mencakup keyakinan, nilai, tujuan, dan peran sosial. jatidiri terdiri dari tiga komponen utama: self-image (citra diri), ideal self (diri ideal), dan self-esteem (harga diri).</small>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 w-full p-5 md:w-3/4 mx-auto">
            <div class="relative py-[24px] px-[36px] bg-[#3030F8] rounded-3xl">
                <div class="flex flex-col items-start gap-[16px]">
                    <div class="flex items-center gap-[16px]">
                        <h1 class="text-white font-roboto text-base md:text-xl lg:text-2xl font-medium">JATIDIRI Q1</h1>
                    </div>
                    <h1 class="z-20 font-roboto font-normal text-white text-base">
                        Tes yang dirancang untuk mengukur kepercayaan diri sendiri yang mencakup keyakinan, nilai, dan konsep diri.
                    </h1>
                    <RouterLink :to="{name: 'user.views.hasil_jatidiri_q1'}" class="hover:translate-x-1 hover:drop-shadow-2xl transition-all h-11 pl-6 pr-2 py-1.5 bg-white rounded-full justify-center items-center gap-3 inline-flex" v-if="isTestedQ1">
                        <div class="text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">Lihat Hasil</div>
                        <div class="p-2.5 bg-[#3030f8] rounded-3xl justify-start items-center gap-2.5 flex">
                            <div class="w-3 h-3 relative">
                                <img src="@/assets/icons/arrow-go.svg" alt="go">
                            </div>
                        </div>
                    </RouterLink>
                    <RouterLink :to="{name: 'user.views.test_jatidiri_intruction_q1'}" class="hover:translate-x-1 hover:drop-shadow-2xl transition-all h-11 pl-6 pr-2 py-1.5 bg-white rounded-full justify-center items-center gap-3 inline-flex" v-if="!isTestedQ1">
                        <div class="text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">Tes Sekarang</div>
                        <div class="p-2.5 bg-[#3030f8] rounded-3xl justify-start items-center gap-2.5 flex">
                            <div class="w-3 h-3 relative">
                                <img src="@/assets/icons/arrow-go.svg" alt="go">
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
            <div class="relative py-[24px] px-[36px] bg-[#3030F8] rounded-3xl">
                <div class="flex flex-col items-start gap-[16px]">
                    <div class="flex items-center gap-[16px]">
                        <h1 class="text-white font-roboto text-base md:text-xl lg:text-2xl font-medium">JATIDIRI Q2</h1>
                    </div>
                    <h1 class="z-20 font-roboto font-normal text-white text-base">
                        Tes yang dirancang untuk mengukur kepercayaan diri yang meliputi keyakinan, nilai, tujuan, dan peran sosial.
                    </h1>
                    <RouterLink :to="{name: 'user.views.hasil_jatidiri_q2'}" class="hover:translate-x-1 hover:drop-shadow-2xl transition-all h-11 pl-6 pr-2 py-1.5 bg-white rounded-full justify-center items-center gap-3 inline-flex" v-if="isTestedQ2">
                        <div class="text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">Lihat Hasil</div>
                        <div class="p-2.5 bg-[#3030f8] rounded-3xl justify-start items-center gap-2.5 flex">
                            <div class="w-3 h-3 relative">
                                <img src="@/assets/icons/arrow-go.svg" alt="go">
                            </div>
                        </div>
                    </RouterLink>
                    <RouterLink :to="{name: 'user.views.test_jatidiri_intruction_q2'}" class="hover:translate-x-1 hover:drop-shadow-2xl transition-all h-11 pl-6 pr-2 py-1.5 bg-white rounded-full justify-center items-center gap-3 inline-flex" v-if="!isTestedQ2">
                        <div class="text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">Tes Sekarang</div>
                        <div class="p-2.5 bg-[#3030f8] rounded-3xl justify-start items-center gap-2.5 flex">
                            <div class="w-3 h-3 relative">
                                <img src="@/assets/icons/arrow-go.svg" alt="go">
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>

        <section class="bg-white py-[46px]">
            <ReservasiFooter />
        </section>
    </Layout>
</template>

<script setup>
import Layout from '@/Layout/Customer/Layout.vue';
import ReservasiFooter from '@/components/REMAKE/ReservasiFooter/Reservasi.vue';
import {  onBeforeUnmount, onMounted, ref} from 'vue';
import initAPI from '@/api/api';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';
import Cookies from 'js-cookie'
import SelesaiTest from '@/components/REMAKE/HasilTest/SelesaiTest/SelesaiTest.vue';
import KebijakanPrivasi from '@/components/REMAKE/Modal/KebijakanPrivasi/KebijakanPrivasi.vue';
import cekDataProfile from '@/components/cekProfile';
import modalCekProfile from '@/components/modalCekProfile/modalCekProfile.vue';
import { useRouter } from 'vue-router';

const subMessage = `Kerja yang bagus! Kamu telah menyelesaikan Tes <span class="font-bold">Index Kebahagiaan</span>. Mari lihat hasilnya dan temukan lebih banyak tentang potensi diri Kamu!`
const isTestedQ1 = ref(null)
const isTestedQ2 = ref(null)
const customerId = ref('')

const dataProfileInclomplete = cekDataProfile()

const isKebijakanPrivasi = ref(true)
const isChecked = ref(false)
const router = useRouter()


const loading = ref(true)

const getUserData = async() => {
    try {
        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('refresh_user', 'true')
        const userData = await initAPI('post', 'login', formData, token)

        customerId.value = userData.data.customer.id
        isTestedQ1.value = userData.data.customer.customers_q1 == null ? false : true
        isTestedQ2.value = userData.data.customer.customers_q2 == null ? false : true
        console.log(customerId.value)
        console.log(isTested.value)   
    } catch (error) {
        // console.log(`error`, error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'User',
            showConfirmButton: false,
            timer: 2000
        });
    } finally {
        loading.value = false
    }
}

const toggleKebijakanPrivasi = () => {
    isKebijakanPrivasi.value = !isKebijakanPrivasi.value
}

const handleNextQuestion = () => {
    if (isChecked.value) {
        router.push({ name: 'user.views.test_kebahagiaan_soal' })
    }
}

onMounted(async () => {

    await getUserData()
    const videoId = document.getElementById('example-video')
    if(videoId){
        const player = videojs(videoId);
        // player.play();
    
        onBeforeUnmount(() => {
            player.dispose()
        })
    }
    loading.value = false
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