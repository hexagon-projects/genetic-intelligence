<template>
    <div class="bg-white rounded-lg shadow-sm p-4 h-full overflow-hidden">
        <div class="flex flex-col justify-center align-middle">
            <h2 class="font-myFont font-semibold text-dark text-base lg:text-lg">Video Penjelasan Hasil Test Kamu</h2>
            <hr class="my-5">
            <!-- <p class="font-myFont text-center text-gray-500 text-sm mb-6">Fahami diri kamu lewat hasil deteki GIM ini</p> -->
            <div class="flex flex-col items-center gap-2">
                <div class="w-full mx-auto items-center">
                    <div class="hidden lg:flex lg:flex-row gap-1 items-center align-middle mb-1">
                        <PhWarningCircle :size="18" color="#e81111"/><small class="text-danger font-semibold">Video ini eksklusif dan tidak dapat disebarluaskan.</small>
                    </div>
                    <div class="lg:hidden flex flex-row align-middle mb-1">
                        <PhWarningCircle :size="18" color="#e81111"/><small class="text-danger font-semibold">Video ini eksklusif dan tidak dapat disebarluaskan.</small>
                    </div>
                    <video id="example-video" ref="videoPlayer" class="video-js vjs-big-play-centered vjs-theme-sea"
                        controls
                        preload="auto"
                        fluid="true"
                        data-setup='{}'
                        >
                        <source
                            :src="userResultDetect.gim.url"
                            type="application/x-mpegURL">
                    </video>
                    <!-- <iframe class="w-full hidden lg:block" height="415" :src="userResultDetect.gim.url" sandbox="allow-same-origin allow-scripts" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                    </iframe>
                    <iframe class="w-full lg:hidden" :src="userResultDetect.gim.url" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                    </iframe> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';
import { PhWarningCircle } from '@phosphor-icons/vue'
import { onMounted, onBeforeUnmount } from 'vue'

export default {
    name: 'VideoHasil',
    components: {PhWarningCircle},
    props: ['userResultDetect'],
    setup(){
        onMounted(() => {
            const player = videojs('example-video');
            player.play();

            onBeforeUnmount(() => {
                player.dispose()
            })
        })
    }
}
</script>