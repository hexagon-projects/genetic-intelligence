<template>
    <div class="hidden lg:flex lg:flex-col justify-center items-center">
        <transition name="fade" mode="out-in">
            <ModalConsent v-if="visited" @isSetuju="setuju"/>
        </transition>
        
        <div class="lg:w-3/4">
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
    </div>

    <div class="lg:hidden flex flex-col justify-center items-center">
        <transition name="fade" mode="out-in">
            <ModalConsent v-if="visited" @isSetuju="setuju"/>
        </transition>

        <div class="w-full md:w-1/2">
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
    </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ModalConsent from '../informedConsent/modal.vue'

export default {
    name: 'InstruksiDeteksi',
    components: {ModalConsent},
    setup(){
        
        const visited = ref(false)

        const setuju = () => {
            visited.value = false
        }

        onMounted(() => {
            visited.value = true

            const player = videojs('example-video');
            player.play();

            onBeforeUnmount(() => {
                player.dispose()
            })
        })

        return {
            visited,
            setuju
        }
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>