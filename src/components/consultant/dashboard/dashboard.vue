<template>
    <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>

    <div v-else>
        <section class="bg-gray-100 pb-16">
            <div class="mx-4 pt-4">
                <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
                    <li class="before:px-1.5">
                        <a class="text-dark text-base cursor-default">
                            Beranda
                        </a>
                    </li>
                </ol>
            </div>
            <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 gap-4">
                <video id="example-video" ref="videoPlayer" class="video-js vjs-big-play-centered vjs-theme-sea"
                controls
                preload="auto"
                fluid="true"
                data-setup='{}'
                >
                <source
                    src="../../../video/wakwaw.m3u8"
                    type="application/x-mpegURL">
                </video>
                <!-- <video id="example-video" ref="videoPlayer" class="video-js vjs-big-play-centered vjs-theme-sea"
                controls
                preload="auto"
                fluid="true"
                data-setup='{}'
                >
                <source
                    src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
                    type="application/x-mpegURL">
                </video> -->
                <!-- <iframe sandbox="allow-same-origin allow-scripts" src="https://drive.google.com/file/d/1Z1iQySVZe-YxN_S9c00wP-mjXTeODDfQ/preview" controls="none" frameborder="0" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" width="640" height="320"></iframe> -->
            </div>
        </section>
    </div>
</template>

<script>
import { ref } from 'vue'
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';
import Hls from 'hls.js'
import { onMounted } from 'vue'

export default {
    name: 'Dashboard',
    setup(){
        onMounted(() => {
            var player = videojs('example-video');
            player.play();
            // // Inisialisasi Video.js
            // const player = videojs(videoPlayer.value);

            // // Registrasi modul HLS.js
            // if (Hls.isSupported()) {
            //     const hls = new Hls();
            //     player.src({ src: '../../../video/output.m3u8', type: 'application/x-mpegURL' });
            //     player.ready(() => {
            //     player.play();
            //     });
            //     player.hls = hls;
            // } else if (player.canPlayType('application/vnd.apple.mpegurl')) {
            //     // Fallback untuk browser yang mendukung HLS tanpa HLS.js
            //     player.src({ src: '../../../video/output.m3u8', type: 'application/x-mpegURL' });
            //     player.ready(() => {
            //     player.play();
            //     });
            // }
        });

        const loading = ref(false)
        // const videoPlayer = ref(null);

//         function preventPopout() {
//         var overlay = document.querySelector("iframe");
//         console.log(overlay)

//         overlay.addEventListener("click", function(event) {
//             event.preventDefault();
//         });
//         }

// window.addEventListener("load", preventPopout);
        return {
            loading,
            // videoPlayer
        }
    }
}
</script>

<style scoped>
iframe .GDriveVideoShareOverlay {
  display: none;
}
</style>