<template>
    <div class="h-[96vh] lg:my-12 flex items-center justify-center">
        <div class="absolute top-[68px] lg:top-0 lg:bottom-0 lg:my-auto">
            <img src="@/assets/img/cpm/gradient.png" alt="gradient">
        </div>
        <div class="my-2 w-[480px] h-[537.72px] mx-auto px-9 flex-col justify-center items-center gap-14 inline-flex">
            <img class="w-1/2 md:w-[70%] drop-shadow-xl" 
            src="@/assets/icons/page-belum-test.svg" alt="image">
            
            <div class="lg:w-[522px] h-[246px] flex-col justify-center items-center gap-6 inline-flex">
                <div class="self-stretch h-40 flex-col justify-center items-center gap-4 flex">
                    <div class="self-stretch text-center text-[#0b0b79] text-2xl font-semibold font-sora leading-9">
                        {{ props.message }}
                    </div>
                    <div class="self-stretch text-center text-[#667084] text-sm font-normal font-roboto leading-normal">
                        {{ props.subMessage }}
                    </div>
                </div>

                <div class="h-11 w-full justify-center items-start gap-3 inline-flex">
                    <div class="justify-start items-center gap-3 flex">
                        <button @click="goTo('views.dashboard')" class="z-20 group hover:-translate-x-1 hover:shadow-2xl transition-all pl-2 pr-6 py-[5px] border-[#3030f8] border bg-white rounded-full justify-center items-center gap-3 flex">
                            <div class="group-hover:cursor-pointer p-2.5 border border-[#3030f8] bg-white rounded-3xl justify-start items-center gap-2.5 flex">
                                <div class="w-3 h-3 relative">
                                    <img class="flip-kanan" src="@/assets/icons/arrow-go-biru.svg" alt="go">
                                </div>
                            </div>
                            <span class="group-hover:cursor-pointer text-[#3030f8] text-xs md:text-base font-normal font-['Roboto'] leading-normal">Kembali</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Reservasi -->
    <section class="bg-white py-16">
        <Reservasi/>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Reservasi from '@/components/REMAKE/ReservasiFooter/Reservasi.vue';

const props = defineProps({
    message: String,
    subMessage: String
})

const router = useRouter()

const goTo = (route) => {
    router.push({name: route})
}
</script>

<style scoped>
.flip-kanan {
    transform: scaleX(-1);
}
</style>