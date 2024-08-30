<template>
    <div class="h-[90vh] lg:mt-12 flex items-center justify-center">
        <div class="absolute top-[68px] lg:top-0 lg:bottom-0 lg:my-auto">
            <img src="@/assets/img/cpm/gradient.png" alt="gradient">
        </div>
        <div class="my-2 w-[430px] h-[537.72px] mx-auto px-9 flex-col justify-center items-center gap-14 inline-flex">
            <img class="w-1/2 md:w-full drop-shadow-xl" 
            src="@/assets/img/cpm/selesai-cpm.svg">
            
            <div class="h-[246px] flex-col justify-center items-center gap-6 inline-flex">
                <div class="self-stretch h-40 flex-col justify-center items-center gap-4 flex">
                    <div class="self-stretch text-center text-[#0b0b79] text-2xl font-semibold font-sora leading-9">
                        Tes CPM Selesai!
                    </div>
                    <div class="self-stretch text-center text-[#667084] text-sm font-normal font-['Roboto'] leading-normal">
                        Kerja yang bagus! Kamu telah menyelesaikan Tes Coloured Progressive Matrices. Mari lihat hasilnya dan temukan lebih banyak tentang potensi diri Kamu!
                    </div>
                </div>

                <button @click="lihatHasil" class="mb-4 hover:-translate-y-2 transition-all cursor-pointer self-stretch min-h-[42px] max-h-[62px] px-[60px] py-[18px] md:px-[90px] md:py-[18px] bg-[#3030f8] rounded-2xl border-l border-r border-t border-b border-black justify-center items-center gap-2.5 inline-flex">
                    <div class="text-white text-base font-medium font-roboto leading-normal">
                        Lihat Hasil
                    </div>
                    <div class="w-4 h-4 relative">
                        <img src="@/assets/img/cpm/icon-row-up.svg">
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const lihatHasil = () => {
    router.push({name: 'user.views.hasil_cpm'})
}
</script>