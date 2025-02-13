<template>
    <div v-if="isOpenModal" class="fixed z-[998] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal">
        <div class="relative w-full lg:w-[63%] top-5 mx-auto shadow-xl rounded-3xl bg-white p-[36px]">
            <div class="flex flex-col gap-[24px]">

                <div class="flex items-center justify-center">
                    <h1 class="text-black text-2xl font-sora font-bold">Tes Pendeteksi Kecanduan Gadget</h1>
                </div>
                
                <div class="flex flex-col items-start gap-[12px]">
                    <video id="example-video" ref="videoPlayer" class="video-js vjs-big-play-centered vjs-theme-sea"
                                controls
                                preload="auto"
                                fluid="true"
                                data-setup='{}'
                                >
                                <source
                                    src="https://api.jatidiri.app/api/vidio/iaa/INTRUKSI/index.m3u8"
                                    type="application/x-mpegURL">
                    </video>
                </div>
    
                <div class="flex items-center gap-1">
                    <input type="checkbox" id="setuju" v-model="isChecked">
                    <label for="setuju" class="text-black text-base font-normal font-['Roboto'] leading-normal">
                        Saya telah memahami intruksi dari vidio diatas sampai selesai
                    </label>
                </div>
    
                <div class="flex justify-between items-center">
                    <RouterLink :to="{name: 'views.dashboard'}" class="hover:shadow-2xl hover:-translate-x-1 transition-all h-11 pl-4 pr-6 py-1.5 rounded-full border border-[#3030f8] justify-center items-center gap-3 inline-flex">
                        <div class="w-6 h-6 relative">
                            <img src="@/assets/icons/test_gim/chevron_left.svg" alt="icon">
                        </div>
                        <div class="text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">Kembali</div>
                    </RouterLink>
                    <button @click="closeModal" 
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
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { RouterLink } from 'vue-router';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';

const isChecked = ref(false)
const isOpenModal = ref(true)

// const emit = defineEmits(['toggleWelcomeVidio'])

const closeModal = () => {
    if (isChecked.value) {
        isOpenModal.value = false;
        // emit('toggleWelcomeVidio')
    }
}

onMounted(async() => {
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