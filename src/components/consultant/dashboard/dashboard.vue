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
                <!-- <div class="w-[321px] h-[145px] px-[15px] py-[14px] bg-white rounded-xl flex-col justify-start items-start gap-2.5 inline-flex">
                    <div class="self-stretch grow shrink basis-0 flex-col justify-between items-start flex">
                        <div class="self-stretch justify-start items-start gap-4 inline-flex">
                            <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div class="text-neutral-400 text-sm font-normal font-myFont">Total Submit Test</div>
                                <div class="justify-center items-center inline-flex">
                                    <div class="-mt-2 text-zinc-700 text-xl font-medium font-poppins">50 Data</div>
                                </div>
                            </div>
                            <a class="text-biru p-2 bg-indigo-500 bg-opacity-10 rounded-lg ">
                                <PhHardDrives :size="28"/>
                            </a>
                            <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div class="text-neutral-400 text-sm font-normal font-myFont">Volume</div>
                                <div class="justify-center items-center gap-[7px] inline-flex">
                                    <div class="text-zinc-700 text-xl font-medium font-['Poppins']">0</div>
                                    <div class="opacity-0 text-neutral-500 text-xs font-normal font-myFont">+0.00%</div>
                                </div>
                            </div>
                        </div>
                        <div class="self-stretch justify-start items-center inline-flex">
                            <div class="bg-white border-white rounded-xl font-myFont text-biru flex gap-1 items-center">
                                <a class="font-myFont hover:animate-pulse">
                                    Cek Detail
                                </a>
                                <PhArrowRight/>
                            </div>
                        </div>
                    </div>
                </div> -->

                <div class="w-[321px] h-[145px] px-[15px] py-[11px] bg-white rounded-xl flex-col justify-start items-start gap-2.5 inline-flex">
                    <div class="self-stretch grow shrink basis-0 flex-col justify-between items-start flex">
                        <div class="self-stretch justify-between items-center inline-flex">
                            <span class="text-biru p-2 bg-indigo-500 bg-opacity-10 rounded-lg ">
                                <PhHardDrives :size="28"/>
                            </span>
                            <RouterLink :to="{name: 'consultant.views.review'}" class="text-neutral-400 hover:text-biru text-sm font-normal font-myFont flex items-center gap-1">
                                Lihat Detail
                                <PhArrowRight/>
                            </RouterLink>
                        </div>
                        <div class="self-stretch justify-start items-start gap-8 inline-flex">
                            <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div class="text-neutral-400 text-sm font-normal font-myFont">Permintaan Reservasi</div>
                                <div class="justify-center items-center gap-[7px] inline-flex">
                                    <div class="text-biru text-xl font-medium font-poppins">50 Data</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-[321px] h-[145px] px-[15px] py-[11px] bg-white rounded-xl flex-col justify-start items-start gap-2.5 inline-flex">
                    <div class="self-stretch grow shrink basis-0 flex-col justify-between items-start flex">
                        <div class="self-stretch justify-between items-center inline-flex">
                            <span class="text-biru p-2 bg-indigo-500 bg-opacity-10 rounded-lg ">
                                <PhHardDrives :size="28"/>
                            </span>
                            <RouterLink :to="{name: 'consultant.views.review'}" class="text-neutral-400 hover:text-biru text-sm font-normal font-myFont flex items-center gap-1">
                                Lihat Detail
                                <PhArrowRight/>
                            </RouterLink>
                        </div>
                        <div class="self-stretch justify-start items-start gap-8 inline-flex">
                            <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div class="text-neutral-400 text-sm font-normal font-myFont">Permintaan Reservasi</div>
                                <div class="justify-center items-center gap-[7px] inline-flex">
                                    <div class="text-biru text-xl font-medium font-poppins">50 Data</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-[321px] h-[145px] px-[15px] py-[11px] bg-white rounded-xl flex-col justify-start items-start gap-2.5 inline-flex">
                    <div class="self-stretch grow shrink basis-0 flex-col justify-between items-start flex">
                        <div class="self-stretch justify-between items-center inline-flex">
                            <span class="text-biru p-2 bg-indigo-500 bg-opacity-10 rounded-lg ">
                                <PhHardDrives :size="28"/>
                            </span>
                            <RouterLink :to="{name: 'consultant.views.review'}" class="text-neutral-400 hover:text-biru text-sm font-normal font-myFont flex items-center gap-1">
                                Lihat Detail
                                <PhArrowRight/>
                            </RouterLink>
                        </div>
                        <div class="self-stretch justify-start items-start gap-8 inline-flex">
                            <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div class="text-neutral-400 text-sm font-normal font-myFont">Permintaan Reservasi</div>
                                <div class="justify-center items-center gap-[7px] inline-flex">
                                    <div class="text-biru text-xl font-medium font-poppins">50 Data</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-[321px] h-[145px] px-[15px] py-[11px] bg-white rounded-xl flex-col justify-start items-start gap-2.5 inline-flex">
                    <div class="self-stretch grow shrink basis-0 flex-col justify-between items-start flex">
                        <div class="self-stretch justify-between items-center inline-flex">
                            <span class="text-biru p-2 bg-indigo-500 bg-opacity-10 rounded-lg ">
                                <PhHardDrives :size="28"/>
                            </span>
                            <RouterLink :to="{name: 'consultant.views.review'}" class="text-neutral-400 hover:text-biru text-sm font-normal font-myFont flex items-center gap-1">
                                Lihat Detail
                                <PhArrowRight/>
                            </RouterLink>
                        </div>
                        <div class="self-stretch justify-start items-start gap-8 inline-flex">
                            <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                <div class="text-neutral-400 text-sm font-normal font-myFont">Permintaan Reservasi</div>
                                <div class="justify-center items-center gap-[7px] inline-flex">
                                    <div class="text-biru text-xl font-medium font-poppins">50 Data</div>
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
import { PhHardDrives, PhArrowRight } from '@phosphor-icons/vue';

export default {
    name: 'Dashboard',
    components: {PhHardDrives, PhArrowRight},
    setup(){
        onMounted(() => {
            // const player = videojs('example-video');
            // player.play();
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