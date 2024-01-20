<template>
    <div class="hidden lg:flex lg:flex-col justify-center items-center">
        <div class="lg:w-3/4">
            <video id="example-video" ref="videoPlayer" class="video-js vjs-big-play-centered vjs-theme-sea"
                controls
                preload="auto"
                fluid="true"
                data-setup='{}'
                >
                <source
                    src="http://localhost/chunk/index.m3u8"
                    type="application/x-mpegURL">
            </video>
        </div>
        <!-- <iframe
            class="w-11/12 md:w-1/2 lg:w-3/4 mb-2 rounded-md border-4"
            width="560"
            height="315"
            :src="'https://drive.google.com/file/d/1lwTFBaXmEkgyOi4nT-DO2xfrvmfDv8jo/preview'"
            frameborder="0"
            allowfullscreen
        ></iframe> -->
    </div>
    <div class="lg:hidden flex flex-col justify-center items-center">
        <!-- <iframe
            class="w-full md:w-1/2 lg:w-3/4 mb-2 rounded-md border-4"
            :src="'https://drive.google.com/file/d/1lwTFBaXmEkgyOi4nT-DO2xfrvmfDv8jo/preview'"
            frameborder="0"
            allowfullscreen
        ></iframe> -->
        <div class="w-full md:w-1/2">
            <video id="example-video" ref="videoPlayer" class="video-js vjs-big-play-centered vjs-theme-sea"
                controls
                preload="auto"
                fluid="true"
                data-setup='{}'
                >
                <source
                    src="http://localhost/chunk/index.m3u8"
                    type="application/x-mpegURL">
            </video>
        </div>
    </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';
import { onMounted } from 'vue'

export default {
    name: 'InstruksiDeteksi',
    setup(){

        onMounted(() => {
            const player = videojs('example-video');
            player.play();
        })
    }
}
</script>