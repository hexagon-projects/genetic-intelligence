<template>
    <section class="bg-white pb-20">
        <div class="flex flex-col items-center">
            <div class="mb-[24px] h-[194.54px] flex-col justify-start items-center gap-2 inline-flex">
                <img class="w-[200px] h-[158.54px]" src="@/assets/img/logo-jatidiri-hasi-cpm.png" alt="logo" />
                <div class="self-stretch text-center text-[#0b0b79] text-lg font-semibold font-sora leading-7">Hasil Pemeriksaan Tes Kecerdasan</div>
            </div>

            <div class="flex flex-col lg:flex-row gap-6 pb-[36px]">
                <div class="h-52 flex-col justify-start items-start inline-flex">
                    <div class="px-9 py-4 bg-gradient-to-b from-[#aa67ff] to-[#5959f9] rounded-tl-3xl rounded-tr-3xl border border-black flex-col justify-start items-center gap-3 flex">
                        <div class="w-[302px] text-white text-xl font-medium font-roboto leading-7">Identitas</div>
                    </div>
                    <div class="px-9 py-6 rounded-bl-3xl rounded-br-3xl border-l border-r border-b-4 border-black flex-col justify-start items-center gap-3 flex">
                        <div class="w-[302px] text-[#667084] text-sm font-normal font-roboto leading-tight">Nama		:
                    John Doe<br/>Gender : Laki - laki<br/>Tanggal lahir 	: 04-04-2016<br/>Tanggal tes	: 27-08-2024<br/>Usia 		: 8 Tahun 4 bulan 22 hari</div>
                    </div>
                </div>

                <div class="h-[404px] px-9 py-6 bg-white rounded-3xl border-l border-r border-t border-b-4 border-[#667084] flex-col justify-start items-center gap-3 inline-flex">
                    <div class="self-stretch justify-center items-center gap-4 inline-flex">
                        <div class="grow shrink basis-0 text-[#031b4e] text-xl font-medium font-roboto leading-7">Data tes intelegensi CPM</div>
                    </div>
                    <div class="w-[302px] justify-center items-start gap-3 inline-flex">
                        <div class="w-6 h-6 relative">
                            <img src="@/assets/img/cpm/Check.svg" alt="check">
                        </div>
                        <div class="grow shrink basis-0"><span style="text-[#667084] text-sm font-normal font-roboto leading-tight">Pada Sub tes SET-A, sebanyak </span><span style="text-[#3030f8] text-sm font-medium font-roboto leading-tight">10</span><span style="text-[#667084] text-sm font-normal font-roboto leading-tight"> soal mampu dijawab dengan benar dari 12 soal yang tersedia.
                    </span></div>
                    </div>
                    <div class="w-[302px] justify-center items-start gap-3 inline-flex">
                        <div class="w-6 h-6 relative">
                            <img src="@/assets/img/cpm/Check.svg" alt="check">
                        </div>
                        <div class="grow shrink basis-0"><span style="text-[#667084] text-sm font-normal font-roboto leading-tight">Pada Sub tes SET-AB, sebanyak </span><span style="text-[#3030f8] text-sm font-medium font-roboto leading-tight">10</span><span style="text-[#667084] text-sm font-normal font-roboto leading-tight"> soal mampu dijawab dengan benar dari 12 soal yang tersedia.
                    </span></div>
                    </div>
                    <div class="w-[302px] justify-center items-start gap-3 inline-flex">
                        <div class="w-6 h-6 relative">
                            <img src="@/assets/img/cpm/Check.svg" alt="check">
                        </div>
                        <div class="grow shrink basis-0"><span style="text-[#667084] text-sm font-normal font-roboto leading-tight">Pada Sub tes SET-B, sebanyak </span><span style="text-[#3030f8] text-sm font-medium font-roboto leading-tight">10</span><span style="text-[#667084] text-sm font-normal font-roboto leading-tight"> soal mampu dijawab dengan benar dari 12 soal yang tersedia.
                    </span></div>
                    </div>
                    <div class="w-[302px]"><span style="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Dengan demikian klarifikasi IQ Ananda  berada pada </span><span style="text-[#3030f8] text-sm font-medium font-roboto leading-tight">Grade III</span><span style="text-[#3030f8] text-sm font-normal font-roboto leading-tight"> dengan arti </span><span style="text-[#3030f8] text-sm font-medium font-roboto leading-tight">Average
                </span></div>
                </div>
            </div>

            <div class="h-[906px] px-9 py-14 bg-[#f0f7fd] flex-col justify-center items-center gap-6 inline-flex">
                <div class="self-stretch h-[708px] flex-col justify-start items-start gap-9 flex">
                    <div class="self-stretch h-[124px] flex-col justify-start items-center gap-4 flex">
                        <div class="px-4 py-1 bg-[#d6d6fe] rounded-[99px] justify-center items-center gap-2.5 inline-flex">
                            <div class="text-[#3030f8] text-base font-medium font-roboto leading-normal">Hasil Tes</div>
                        </div>
                        <div class="self-stretch text-center text-[#3030f8] text-3xl font-semibold font-sora leading-9">Grade III: Average</div>
                        <div class="justify-center items-center gap-4 inline-flex">
                            <div class="text-center text-[#0b0b79] text-sm font-normal font-roboto leading-tight">Verified by</div>
                            <img class="w-[50px] h-6" src="@/assets/img/cpm/jatidiri-verified.png" />
                        </div>
                    </div>
                    <div class="self-stretch h-[548px] flex-col justify-start items-start gap-6 flex">
                        <div class="transition-all self-stretch h-auto px-9 py-6 bg-white rounded-3xl border-l border-r border-t border-b-4 border-[#667084] flex-col justify-start items-start gap-2.5 flex">
                            <div @click="showGambaranUmum = !showGambaranUmum"  class="cursor-pointer self-stretch justify-between items-center inline-flex">
                                <div class="flex-col justify-start items-start gap-4 inline-flex">
                                    <div class="self-stretch text-[#031b4e] text-xl font-medium font-roboto leading-7">Gambaran Umum</div>
                                </div>
                                <div class="p-2.5 bg-[#f0f7fd] rounded-3xl justify-start items-center gap-2.5 flex">
                                    <div class="w-8 h-8 relative rounded-3xl">
                                        <img :class="{'rotate-180': showGambaranUmum}" class="transition-all" src="@/assets/img/cpm/panah-bawah.svg">
                                    </div>
                                </div>
                            </div>

                            <p v-if="showGambaranUmum">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt maxime provident voluptatem et officiis tempore!
                            </p>
                        </div>
                        <div class="transition-all self-stretch h-auto px-9 py-6 bg-white rounded-3xl border-l border-r border-t border-b-4 border-[#667084] flex-col justify-start items-start gap-2.5 flex">
                            <div @click="showSaran = !showSaran" class="cursor-pointer self-stretch justify-between items-center inline-flex">
                                <div class="flex-col justify-start items-start gap-4 inline-flex">
                                    <div class="self-stretch text-[#031b4e] text-xl font-medium font-roboto leading-7">Saran</div>
                                </div>
                                <div class="p-2.5 bg-[#f0f7fd] rounded-3xl justify-start items-center gap-2.5 flex">
                                    <div class="w-8 h-8 relative rounded-3xl">
                                        <img :class="{'rotate-180': showSaran}" class="transition-all" src="@/assets/img/cpm/panah-bawah.svg">
                                    </div>
                                </div>
                            </div>
                            <p v-if="showSaran">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt maxime provident voluptatem et officiis tempore!
                            </p>
                        </div>
                        <div class="self-stretch h-[300px] px-9 py-6 bg-white rounded-3xl border-l border-r border-t border-b-4 border-[#f04437] flex-col justify-start items-start gap-2.5 flex">
                            <div class="w-[303px] grow shrink basis-0 flex-col justify-start items-start gap-3.5 flex">
                                <div class="self-stretch justify-center items-center gap-4 inline-flex">
                                    <div class="grow shrink basis-0 text-[#031b4e] text-xl font-medium font-roboto leading-7">⚠︎ Pentingnya Pemahaman dan Empati:
                        </div>
                                </div>
                                <div class="self-stretch text-[#667084] text-sm font-normal font-roboto leading-tight">Kecerdasan bukan satu-satunya faktor penentu kesuksesan atau kebahagiaan. Setiap orang memiliki kekuatan dan kelemahan masing-masing. Oleh karena itu, baik bagi diri kita maupun orang lain, penting untuk menghargai setiap individu apa adanya, memberikan dukungan, dan menekankan pada pengembangan pribadi di segala aspek kehidupan, bukan hanya intelektual.
                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="self-stretch h-[62px] px-[90px] py-[18px] bg-[#3030f8] rounded-2xl border-l border-r border-t border-b-4 border-black justify-center items-center gap-2.5 inline-flex">
                    <div class="text-white text-base font-medium font-roboto leading-normal">Unduh Hasil Tes</div>
                    <div class="w-4 h-4 relative">
                        <img src="@/assets/img/cpm/download.svg" alt="download">
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const showSaran = ref(false)
const showGambaranUmum = ref(false)
</script>