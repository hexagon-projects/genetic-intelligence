<template>
    <!-- Breadcrumb -->
    <div class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex">
        <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Beranda</div>
        <div class="w-4 h-4 relative opacity-75">
            <img src="@/assets/img/chevron_forward.svg">
        </div>
        <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Lakukan Tes</div>
        <div class="w-4 h-4 relative opacity-75">
            <img src="@/assets/img/chevron_forward.svg">
        </div>
        <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Test CPM</div>
    </div>

    <BelumTest v-if="!isTested" message="Kamu Belum Melakukan Test GIM" 
    subMessage="Wah, sayang sekali kamu belum coba Tes GIM! Yuk, kenali dulu potensi dirimu lewat Tes GIM biar hasil Assessment kamu lebih maksimal!"/>

    <!-- Card Catatan -->
    <section class="bg-[#f0f7fd] py-[52px]">
        <div class="mx-[30px] md:mx-[60px] flex flex-col gap-[32px]">
            <div class="flex flex-col md:flex-row justify-center gap-4 h-auto">
                <div class="w-full md:max-w-[356px] flex flex-col justify-between bg-gradient-to-br from-[#3030f8] to-[#43b0ff] p-[24px] rounded-3xl">
                    <div class="flex flex-col gap-[16px]">
                        <span class="text-[#FCFCFD] text-base md:text-lg font-normal font-roboto leading-7">
                            Selamat! kamu telah selesai melakukan test Genetic Intelligence Mapping. Hasil test kamu menunjukan bahwa kamu memiliki tipe kecerdasan:
                        </span>
        
                        <span class="text-white text-sm md:text-2xl font-normal font-roboto leading-normal">
                            Limbik Kiri
                        </span>
                    </div>
        
                    <div class="mt-[52px]">
                        <div class="h-11 pl-6 pr-2 py-1.5 bg-white rounded-full justify-center items-center gap-3 inline-flex">
                            <div class="text-[#3030f8] text-sm md:text-base font-normal font-roboto leading-normal">Unduh File</div>
                            <div class="p-2.5 bg-[#3030f8] rounded-3xl justify-start items-center gap-2.5 flex">
                                <div class="w-3 h-3 relative">
                                    <img src="@/assets/icons/arrow-go.svg" alt="go">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
                <div class="max-w-[846px] py-[26px] px-[21.5px] bg-white p-[24px] rounded-3xl">
                    <div class="flex flex-col lg:flex-row gap-[52px]">
                        <img class="w-1/2 md:w-3/4 mx-auto drop-shadow-md" src="@/assets/icons/icon-hasil-gim.svg" alt="icon">
        
                        <div class="flex flex-col gap-[32px]">
                            <div class="flex flex-col gap-[16px]">
                                <div class="self-start">
                                    <div class="h-8 px-4 py-1 bg-[#d6d6fe] rounded-[99px] justify-center items-center gap-2.5 inline-flex">
                                        <div class="text-[#3030f8] text-sm md:text-base font-medium font-roboto leading-normal">Catatan Hasil Tes</div>
                                    </div>
                                </div>
        
                                <h1 class="text-[#0b0b79] text-xl md:text-3xl font-semibold font-sora leading-9">
                                    Lihat ringkasan hasil tes grafologi kamu di sini!
                                </h1>
                            </div>
        
                            <div class="flex flex-col gap-[16px]">
                                <span class="text-[#667084] text-sm md:text-base font-normal font-roboto leading-normal">
                                    Berikut catatan yang harus kamu perhatikan :
                                </span>
        
                                <div class="h-20 p-4 bg-[#f0f7fd] border-l-2 border-[#3030f8] justify-between items-center inline-flex">
                                    <div class="grow shrink basis-0 text-black text-sm md:text-base font-normal font-roboto leading-normal">"kamu ganteng sekali cocok jadi model tapi sayang karena kepribadian kamu yang konyol kamu lebih pantas jadi pelawak"</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Video Hasil -->
    <!-- <section class="bg-white py-[24px]">
        <div class="mx-[30px] md:mx-[60px] flex flex-col items-center gap-[24px]">
            <div class="text-center text-black text-lg md:text-xl lg:text-3xl font-semibold font-sora leading-9">
                Video Penjelasan Hasil Test Kamu
            </div>

            <div class="w-full md:w-3/4 block">
                <div class="flex flex-row gap-1 items-center align-middle mb-1">
                    <PhWarningCircle :size="18" color="#e81111"/><small class="text-xs md:text-sm text-danger font-semibold">Video ini eksklusif dan tidak dapat disebarluaskan.</small>
                </div>
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
    </section> -->

    <!-- Card siapa dirimu -->
    <section class="bg-white py-[24px]">
        <div class="mx-[30px] md:mx-[60px] p-[24px]">
            <div class="w-full p-[24px] shadow-md rounded-3xl divide-y-2 md:divide-y-0 md:divide-x-2 grid grid-cols-1 md:grid-cols-3">
                <div class="max-w-[384px] flex flex-col lg:flex-row items-center p-[24px] gap-[24px]">
                    <img src="@/assets/icons/siapakah-dirimu.svg" alt="Icon">
    
                    <div class="flex flex-col">
                        <span class="text-base">Siapakah Dirimu?</span>
                        <span class="font-normal text-sm text-[#667085]">Sang pelaksana (Cermat)</span>
                      </div>
                </div>
                <div class="max-w-[384px] flex flex-col lg:flex-row items-center p-[24px] gap-[24px]">
                    <img src="@/assets/icons/sistem-kecerdasan.svg" alt="Icon">
    
                    <div class="flex flex-col">
                        <span class="text-base">Sistem Operasi Kecerdasan Dominan:</span>
                        <span class="font-normal text-sm text-[#667085]">Sang pelaksana (Cermat)</span>
                      </div>
                </div>
                <div class="max-w-[384px] flex flex-col lg:flex-row items-center p-[24px] gap-[24px]">
                    <img src="@/assets/icons/kata-kunci.svg" alt="Icon">
    
                    <div class="flex flex-col">
                        <span class="text-base">Siapakah Dirimu?</span>
                        <span class="font-normal text-sm text-[#667085]">Mengikuti sistem dan aturan, Servis, Merasa terbatas, Memanage, Pekerja keras, Praktis, Bersahaja.</span>
                      </div>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-white py-[46px]">
        <div class="mx-[30px] md:mx-[60px] bg-white flex flex-col lg:flex-row gap-[32px]">
            <div class="max-h-[340px] overflow-y-scroll lg:max-h-[796px] p-[24px] w-full lg:w-[30%] flex flex-col bg-white shadow-md rounded-3xl">
                <div class="flex flex-col gap-[24px]">
                    <h1 class="text-black text-lg font-roboto font-medium leading-7">
                        Cari tahu tentang dirimu
                    </h1>

                    <div class="flex flex-col gap-2">
                        <div v-for="(section, index) in sections" :key="index" class="h-14 pl-6 pr-3 py-3 bg-[#f0f7fd] rounded-[56px] justify-between items-center inline-flex">
                            <div class="grow shrink basis-0 text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">
                                {{ section.name }}
                            </div>
                            <div class="p-2.5 bg-[#3030f8] rounded-3xl justify-start items-center gap-2.5 flex">
                                <div class="w-3 h-3 relative">
                                    <img src="@/assets/icons/arrow-go.svg" alt="go">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full lg:w-[70%] bg-white flex flex-col">
                <div class="mb-[24px] h-[52px] py-2.5 border-b border-[#667084] justify-start items-center gap-2.5 inline-flex">
                    <h1 class="text-black text-lg lg:text-2xl font-medium font-roboto leading-loose">Video Penjelasan Hasil Test Kamu</h1>
                </div>

                <!-- Video -->
                <div class="w-full block mb-[32px]">
                    <div class="flex flex-row gap-1 items-center align-middle mb-1">
                        <PhWarningCircle :size="18" color="#e81111"/><small class="text-xs md:text-sm text-danger font-semibold">Video ini eksklusif dan tidak dapat disebarluaskan.</small>
                    </div>
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

                <div class="mb-[32px] h-[52px] py-2.5 border-b border-[#667084] justify-start items-center gap-2.5 inline-flex">
                    <h1 class="text-black text-lg lg:text-2xl font-medium font-roboto leading-loose">Rangkuman Tipe Kecerdasan</h1>
                </div>

                <div class="flex flex-col gap-[24px]">
                    <div class="h-20 p-4 bg-[#f0f7fd] border-l-2 border-[#3030f8] justify-center items-center gap-2.5 inline-flex">
                        <div class="w-[763px] text-black text-base font-normal font-['Roboto'] leading-normal">Tipe kecerdasan Limbik Kiri yang berarti melihat kepada panca indera anda, yang membuat anda konkrit dan praktis.</div>
                    </div>

                    <h1 class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">
                        Tipe kecerdasan tersebut dikendalikan dari luar diri anda menuju kedalam diri anda. Tajam dalam mengamati detail, cermat, menyukai keteraturan, menyukai sistematika, metode dan ketepatan. Membawa energi yang bisa diandalkan, tepat dan mandiri. pola dasar ini cenderung mengatakan yang dilakukan dan melakukan yang dikatakan, jujur, bisa dipercaya dan apa adanya. Pola dasar ini menjadi sebuah fondasi dan pijakan (grounded), sehingga anda mudah kecipratan banyak peluang baru.
                    </h1>
                </div>
            </div>
        </div>
    </section>

    <!-- Reservasi -->
    <section class="bg-white py-[46px]">
        <Reservasi/>
    </section>
</template>

<script setup>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';
import Reservasi from '@/components/REMAKE/ReservasiFooter/Reservasi.vue';
import BelumTest from '@/components/REMAKE/HasilTest/BelumTest/BelumTest.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { PhWarningCircle } from '@phosphor-icons/vue';

const isTested = ref(true)

const sections = ref([
    {name: 'Rangkuman'},
    {name: 'Pengembangan Diri'},
    {name: 'Antisipasi'},
    {name: 'Pendidikan Ideal'},
    {name: 'Pekerjaan yang Tepat'},
    {name: 'Metode Belajar'},
    {name: 'Langkah Menuju Sukses'},
    {name: 'Tipe Bisnis'},
    {name: 'Peran dalam Bisnis'},
    {name: 'Motivasi'},
    {name: 'Catatan Lainya'},
])

onMounted(() => {
    const player = videojs('example-video');
    player.play();

})

onBeforeUnmount(() => {
    player.dispose()
})
</script>