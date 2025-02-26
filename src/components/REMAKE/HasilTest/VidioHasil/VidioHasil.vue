<template>
    <section class="bg-blue-100 py-[46px]">
          <div class="flex items-center justify-center">
            <div class="mx-5 lg:mx-[60px] grid grid-cols-1 gap-1 w-full md:w-3/4">
              <div class="w-full">
                <h1 class="text-3xl font-sora font-bold">Berikut Vidio Penjelasan Mengenai Hasil Test Kamu</h1>
              </div>
              <div class=" pt-7 pb-3 w-full">
                <p class="text-red-700 flex flex-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                  </svg>
                  <span class="ml-3 font-roboto">Vidio ini eksklusif dan tidak dapat disebarluaskan.</span>
                </p>
              </div>
              <div class="w-full flex items-center justify-center">
                <video id="example-video" ref="videoPlayer" class="video-js vjs-big-play-centered vjs-theme-sea"
                                controls
                                preload="auto"
                                fluid="true"
                                data-setup='{}'
                                >
                                <source
                                    :src="videoUrl"
                                    type="application/x-mpegURL">
                  </video>
              </div>
            </div>
          </div>
        </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';

defineProps({
  videoUrl: String
});

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