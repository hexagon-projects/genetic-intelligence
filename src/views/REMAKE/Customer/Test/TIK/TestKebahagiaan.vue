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
            <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Jatidiri Bahagia</div>
        </div>

        <SelesaiTest v-if="isTested" routeUrl="user.views.hasil_bahagia" message="Test Index Kebahagiaan Selesai!"
        :subMessage="subMessage"/>

        <section class="bg-white pb-[34px]" v-if="!isTested">
            <transition name="fade" mode="out-in">
                <div v-if="isKebijakanPrivasi"
                    class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal">
                    <KebijakanPrivasi @toggleKebijakanPrivasi="toggleKebijakanPrivasi" />
                </div>
            </transition>

            <div class="flex flex-col justify-center items-center gap-[24px]">
                <div
                    class="text-center text-black text-lg md:text-xl lg:text-3xl font-semibold font-['Sora'] leading-9">
                    Tes Index Kebahagiaan
                </div>

                <div class="p-9 bg-white rounded-3xl shadow flex-col justify-center items-center gap-6 flex">
                    <!-- video intrukdi -->
                    <div class="w-[70vw] lg:w-full flex-col justify-start items-start gap-2 flex">
                        <div class="w-full lg:w-[800px] lg:h-[450px] relative">
                            <video id="example-video" ref="videoPlayer"
                                class="video-js vjs-big-play-centered vjs-theme-sea w-full h-full" controls preload="auto"
                                fluid="true" data-setup='{}'>
                                <source src="https://api.jatidiri.app/api/vidio/chunks/INTRUKSI/index.m3u8"
                                    type="application/x-mpegURL">
                            </video>
                        </div>
                        <!-- cek input -->
                        <div class="flex items-center pt-3 pb-7 gap-1">
                            <input type="checkbox" id="setuju" v-model="isChecked">
                            <label for="setuju" class="text-black text-base font-normal font-['Roboto'] leading-normal">
                                Saya telah memahami intruksi dari vidio diatas sampai selesai.
                            </label>
                        </div>

                        <!-- action -->
                        <div class="w-full flex justify-between items-center">
                            <RouterLink :to="{name: 'views.dashboard'}" class="hover:shadow-2xl hover:-translate-x-1 transition-all h-11 pl-4 pr-6 py-1.5 rounded-full border border-[#3030f8] justify-center items-center gap-3 inline-flex">
                                <div class="w-6 h-6 relative">
                                    <img src="@/assets/icons/test_gim/chevron_left.svg" alt="icon">
                                </div>
                                <div class="text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">Kembali</div>
                            </RouterLink>

                            <button @click="handleNextQuestion"
                                :class="{'bg-opacity-50 cursor-not-allowed': !isChecked, 'hover:translate-x-1 hover:shadow-2xl bg-opacity-100': isChecked}"
                                class="transition-all h-11 pl-6 pr-4 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
                                <div class="text-white text-base font-normal font-['Roboto'] leading-normal">
                                    Selanjutnya
                                </div>
                                <div class="w-6 h-6 relative">
                                    <img src="@/assets/icons/test_gim/chevron_right.svg" alt="icon">
                                </div>
                            </button>
                        </div>
                        
                    </div>

                </div>
            </div>
        </section>

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
const isTested = ref(null)
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
        isTested.value = userData.data.customer.customers_tik == null ? false : true
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