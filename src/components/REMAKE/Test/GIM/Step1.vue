<template>
    <div class="w-[70vw] lg:w-full flex-col justify-start items-start gap-2 flex">
        <div class="w-full lg:w-[800px] lg:h-[450px] relative">
            <video id="example-video" ref="videoPlayer" class="video-js vjs-big-play-centered vjs-theme-sea"
                controls
                preload="auto"
                fluid="true"
                data-setup='{}'
                >
                <source
                    src="https://api.jatidiri.app/additional_assets/chunks/instruksi/instruksi.m3u8"
                    type="application/x-mpegURL">
            </video>
        </div>
        <div class="pl-1 pr-4 py-3 rounded justify-start items-center gap-2 inline-flex">
            <input type="checkbox" id="setuju" name="setuju" v-model="validasi.checkbox" @change="emitValidasiUpdate('checkbox', validasi.checkbox)">
            <label for="setuju" class="text-[#373c3d] text-xs md:text-base font-normal font-['Roboto'] leading-normal">Saya telah mengikuti intruksi dari video diatas sampai selesai</label>
        </div>
    </div>
</template>

<script setup>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';
import { onBeforeUnmount, onMounted } from 'vue';

const props = defineProps({
  validasi: Object,
});

const emit = defineEmits(['update-validasi']);

// Emit event when checkbox is changed
const emitValidasiUpdate = (key, value) => {
  emit('update-validasi', key, value);
};

onMounted(() => {
    const videoId = document.getElementById('example-video')
    if(videoId){
        const player = videojs('example-video');
        player.play();
    
        onBeforeUnmount(() => {
            player.dispose()
        })
    }
})
</script>