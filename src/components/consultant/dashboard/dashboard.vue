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
                <div class="rounded-xl w-1/3 h-48 border opacity-85 bg-gradient-primary p-6 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)]">
                    <div class="mb-2 text-primary">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-white h-12 w-12">
                            <path d="M15.5777 3.38197L17.5777 4.43152C19.7294 5.56066 20.8052 6.12523 21.4026 7.13974C22 8.15425 22 9.41667 22 11.9415V12.0585C22 14.5833 22 15.8458 21.4026 16.8603C20.8052 17.8748 19.7294 18.4393 17.5777 19.5685L15.5777 20.618C13.8221 21.5393 12.9443 22 12 22C11.0557 22 10.1779 21.5393 8.42229 20.618L6.42229 19.5685C4.27063 18.4393 3.19479 17.8748 2.5974 16.8603C2 15.8458 2 14.5833 2 12.0585V11.9415C2 9.41667 2 8.15425 2.5974 7.13974C3.19479 6.12523 4.27063 5.56066 6.42229 4.43152L8.42229 3.38197C10.1779 2.46066 11.0557 2 12 2C12.9443 2 13.8221 2.46066 15.5777 3.38197Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                            <path opacity="0.5" d="M21 7.5L12 12M12 12L3 7.5M12 12V21.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                        </svg>
                    </div>
                    <h5 class="mb-2 text-lg text-white font-myFont font-semibold">Total Submit Test</h5>
                    <p class="mb-2 text-[15px] font-myFont text-white">50 Test</p>
                    <a href="javascript:;" class="font-myFont font-semibold text-white hover:underline">Detail

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="relative inline-block h-4 w-4 transition-all duration-300 group-hover:translate-x-2 ltr:ml-1 rtl:mr-1 rtl:rotate-180 rtl:group-hover:-translate-x-2">
                            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </a>
                </div>
                <div class="rounded-xl w-1/3 h-48 border opacity-85 bg-gradient-primary p-6 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)]">
                    <div class="mb-2 text-primary">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-white h-12 w-12">
                            <path d="M15.5777 3.38197L17.5777 4.43152C19.7294 5.56066 20.8052 6.12523 21.4026 7.13974C22 8.15425 22 9.41667 22 11.9415V12.0585C22 14.5833 22 15.8458 21.4026 16.8603C20.8052 17.8748 19.7294 18.4393 17.5777 19.5685L15.5777 20.618C13.8221 21.5393 12.9443 22 12 22C11.0557 22 10.1779 21.5393 8.42229 20.618L6.42229 19.5685C4.27063 18.4393 3.19479 17.8748 2.5974 16.8603C2 15.8458 2 14.5833 2 12.0585V11.9415C2 9.41667 2 8.15425 2.5974 7.13974C3.19479 6.12523 4.27063 5.56066 6.42229 4.43152L8.42229 3.38197C10.1779 2.46066 11.0557 2 12 2C12.9443 2 13.8221 2.46066 15.5777 3.38197Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                            <path opacity="0.5" d="M21 7.5L12 12M12 12L3 7.5M12 12V21.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                        </svg>
                    </div>
                    <h5 class="mb-2 text-sm text-white font-myFont font-medium">Total Submit Test</h5>
                    <p class="mb-2 font-myFont font-semibold text-2xl text-white">50 Test</p>
                    <a href="javascript:;" class="font-myFont font-medium text-white hover:underline">Detail

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="relative inline-block h-4 w-4 transition-all duration-300 group-hover:translate-x-2 ltr:ml-1 rtl:mr-1 rtl:rotate-180 rtl:group-hover:-translate-x-2">
                            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </a>
                </div>
                <div class="w-[321px] h-[145px] px-[15px] py-[11px] bg-white rounded-xl flex-col justify-start items-start gap-2.5 inline-flex">
    <div class="self-stretch grow shrink basis-0 flex-col justify-between items-start flex">
        <div class="self-stretch justify-between items-center inline-flex">
            <div class="w-9 h-9 p-2 bg-indigo-500 bg-opacity-10 rounded-lg justify-center items-center flex">
                <div class="grow shrink basis-0 self-stretch px-[1.92px] pt-[1.75px] pb-[1.71px] justify-center items-center inline-flex">
                    <div class="w-[16.16px] h-[16.54px] relative">
                    </div>
                </div>
            </div>
            <div class="justify-start items-center gap-[7px] flex">
                <div class="text-neutral-300 text-xs font-normal font-myFont">This Week</div>
                <div class="w-4 h-4 relative"></div>
            </div>
        </div>
        <div class="self-stretch justify-start items-start gap-8 inline-flex">
            <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div class="text-neutral-400 text-sm font-normal font-myFont">Sales</div>
                <div class="justify-center items-center gap-[7px] inline-flex">
                    <div class="text-zinc-700 text-xl font-medium font-['Poppins']">₦0.00</div>
                    <div class="text-neutral-500 text-xs font-normal font-myFont">+0.00%</div>
                </div>
            </div>
            <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div class="text-neutral-400 text-sm font-normal font-myFont">Volume</div>
                <div class="justify-center items-center gap-[7px] inline-flex">
                    <div class="text-zinc-700 text-xl font-medium font-['Poppins']">0</div>
                    <div class="opacity-0 text-neutral-500 text-xs font-normal font-myFont">+0.00%</div>
                </div>
            </div>
        </div>
    </div>
</div>
                <!-- <video id="example-video" ref="videoPlayer" class="video-js vjs-big-play-centered vjs-theme-sea"
                controls
                preload="auto"
                fluid="true"
                data-setup='{}'
                >
                <source
                    src="../../../video/wakwaw.m3u8"
                    type="application/x-mpegURL">
                </video> -->
                <!-- <video id="example-video" ref="videoPlayer" class="video-js vjs-big-play-centered vjs-theme-sea"
                controls
                preload="auto"
                fluid="true"
                data-setup='{}'
                >
                <source
                    src="http://localhost/chunk/index.m3u8"
                    type="application/x-mpegURL"> -->
                <!-- <source
                    src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
                    type="application/x-mpegURL"> -->
                <!-- </video> -->
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
            const player = videojs('example-video');
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