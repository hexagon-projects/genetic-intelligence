<template>
    <div v-if="userResultDetect" class="lg:w-2/3 w-full">
        <div class="flex flex-col gap-4 lg:gap-4">
            <div class="bg-white rounded-lg shadow-xl p-4 h-full overflow-hidden">
                <div class="flex flex-col justify-center align-middle">
                    <h2 class="font-myFont text-start text-dark font-semibold">Hasil Test Genetic Intelligence Mapping</h2>
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
            <div class="bg-white rounded-lg shadow-xl lg:p-4 w-full h-full overflow-hidden">
                <div class="flex flex-col lg:flex-row items-center lg:gap-4 lg:mx-auto lg:w-3/4">
                    <div class="lg:block lg:w-1/3 -mb-3 pt-3 lg:-mb-0 lg:pt-0">
                        <img src="../../../assets/img/note.png" alt="icon" class="mx-auto w-36">
                    </div>
                    <div class="lg:w-2/3 lg:p-0 px-4">
                        <div class="flex flex-col align-middle items-center my-7">
                            <h1 class="font-myFont text-dark text-xl lg:mb-2 mb-3">Ingin konsultasi lebih lanjut? Klik tombol dibawah untuk atur jadwalmu...</h1>
                            <RouterLink :to="{name: 'user.views.reservasi'}" class="px-2 py-2 w-1/2 text-center self-start rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                                Konsultasi
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import { PhWarningCircle } from "@phosphor-icons/vue";
import initApi from '../../../api/api'
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';

export default {
    name: 'VideoHasilDeteksi',
    components: {PhWarningCircle},
    setup(){
        const userResultDetect = JSON.parse(localStorage.getItem('userResult'))
        onMounted(() => {
            const player = videojs('example-video');
            player.play();
        })
        // const store = useStore()
        // const userResultDetect = computed(() => store.getters.getUserResultDetect);
        // console.log(`detect video`,userResultDetect.value)
        // const a = async() => {
        //   if(userResultDetect.value == null) {
        //     let localStorageData = localStorage.getItem('userData');
        //     let userDataObject = JSON.parse(localStorageData);
        //     let userId = userDataObject.id;
        //     console.log(`kosong ajig ie video`, userId)
        //     const accessToken = JSON.parse(localStorage.getItem('token'))
            // const userId = userData.value.id

            // const response = await initApi('get', 'customers/gim-result/'+userId, null, accessToken)
            // console.log(`di video hasil`, response.data)
            // if(response.data.is_detected == true){
            //     store.commit('userResultDetect', response.data)
            // } else {
            //     store.commit('userResultDetect', false)
            // }
        //   }
          // console.log(userResultDetect.value)
    //   }
    //   a()
        // document.addEventListener('contextmenu', event=> event.preventDefault()); 
        //     document.onkeydown = function(e) { 
        //     if(event.keyCode == 123) { 
        //     return false; 
        //     } 
        //     if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){ 
        //     return false; 
        //     } 
        //     if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){ 
        //     return false; 
        //     } 
        //     if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){ 
        //     return false; 
        //     } 
        // } 

        return {
            userResultDetect,
        }
    }
}
</script>