<template>
    <div class="mb-[36px] self-stretch h-[124px] flex-col justify-start items-center gap-4 flex">
        <div class="px-4 py-1 bg-[#d6d6fe] rounded-[99px] justify-center items-center gap-2.5 inline-flex">
            <div class="text-[#3030f8] text-base font-medium font-roboto leading-normal">Hasil Tes</div>
        </div>
        <div class="self-stretch text-center text-[#3030f8] text-3xl font-semibold font-sora leading-9">Grade III: Average</div>
        <div class="justify-center items-center gap-4 inline-flex">
            <div class="text-center text-[#0b0b79] text-sm font-normal font-roboto leading-tight">Verified by</div>
            <img class="w-[50px] h-6" src="@/assets/img/cpm/jatidiri-verified.png" />
        </div>
    </div>

    <!-- accordion -->
    <div class="mb-6 w-full flex flex-col gap-6">
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

            <p v-if="showGambaranUmum" class="text-[#667085] font-roboto leading-relaxed">
                Ananda <span class="font-bold">
                    Aditya Wisnu
                </span> memiliki IQ dengan kategori superior, ia memiliki kemampuan berpikir yang luar biasa dan di atas rata-rata dari anak seusianya. Ananda <span class="font-bold">
                    Aditya Wisnu
                </span> akan sangat cepat memahami konsep-konsep yang rumit, dapat menyelesaikan masalah kompleks dengan lebih mudah, dan memiliki kemampuan analitis serta logika yang tajam. Ananda <span class="font-bold">
                    Aditya Wisnu
                </span> biasanya akan dapat menunjukkan bakat dalam bidang akademik, sains, atau seni.
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
            <p v-if="showSaran" class="text-[#667085] font-roboto leading-relaxed">
                Meskipun Ananda <span class="font-bold">
                    Aditya Wisnu
                </span> memiliki potensi luar biasa, penting untuk tetap mengasah kemampuan sosial dan emosionalnya. Keberhasilan tidak hanya bergantung pada kecerdasan, tetapi juga pada kerja sama tim, komunikasi, dan empati.
            </p>
        </div>

        <div class="self-stretch h-auto px-9 py-6 bg-white rounded-3xl border-l border-r border-t border-b-4 border-[#f04437] flex-col justify-start items-start gap-2.5 flex">
            <div class="w-full grow shrink basis-0 flex-col justify-start items-start gap-3.5 flex">
                <div class="self-stretch justify-center items-center gap-4 inline-flex">
                    <div class="grow shrink basis-0 text-[#031b4e] text-xl font-medium font-roboto leading-7">
                        Pentingnya Pemahaman dan Empati:
                    </div>
                </div>
                <div class="self-stretch text-[#667084] text-base font-normal font-roboto leading-relaxed tracking-wide">
                    Kecerdasan bukan satu-satunya faktor penentu kesuksesan atau kebahagiaan. Setiap orang memiliki kekuatan dan kelemahan masing-masing. Oleh karena itu, baik bagi diri kita maupun orang lain, penting untuk menghargai setiap individu apa adanya, memberikan dukungan, dan menekankan pada pengembangan pribadi di segala aspek kehidupan, bukan hanya intelektual.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const showSaran = ref(false)
const showGambaranUmum = ref(false)
</script>