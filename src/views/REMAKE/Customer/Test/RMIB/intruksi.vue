<template>
    <div class="mx-[30px] md:mx-[60px] max-w-[700px] flex flex-col items-center justify-center shadow rounded-tl-3xl rounded-tr-3xl rounded-b-3xl bg-white">
        <div class="self-stretch min-h-[100px] py-4 bg-[#3030f8] rounded-tl-3xl rounded-tr-3xl flex-col justify-start items-start gap-2 flex">
            <div class="self-stretch text-center text-white text-lg md:text-xl lg:text-3xl font-semibold font-['Sora'] leading-9">Intruksi Pengerjaan Tes Bakat</div>
            <div class="mx-4 self-stretch text-center text-white text-sm md:text-sm lg:text-base font-normal font-['Roboto'] leading-normal">
                Halo {{ namaUser.first_name }}! Sebelum melakukan test perhatikan petunjuk dibawah ini.
            </div>
        </div>
        <div class="py-[36px] w-full flex justify-center items-center">
            <div class="w-full mx-[16px] flex justify-between items-center gap-[24px]">
                <button @click="btnAction('back')" 
                :class="{'bg-opacity-50': currentIndex == 1, 'bg-opacity-100': currentIndex > 1}"
                class="hover:-translate-x-1 transition-all h-11 p-2.5 bg-[#3030f8] rounded-[33px] justify-center items-center gap-2.5 inline-flex">
                    <div class="w-6 h-6 relative">
                        <img src="@/assets/icons/test_iq/chevron_left_white.svg" alt="icon">
                    </div>
                </button>

                <transition name="fade" mode="out-in">
                    <div>
                        <Step1 v-if="currentIndex == 1" />
                        <Step2 v-if="currentIndex == 2" />
                        <Step3 v-if="currentIndex == 3" />
                    </div>
                </transition>

                <button @click="btnAction('next')" 
                :class="{'bg-opacity-50': currentIndex == 3, 'bg-opacity-100': currentIndex < 3}"
                class="hover:translate-x-1 transition-all h-11 p-2.5 bg-[#3030f8] rounded-[33px] justify-center items-center gap-2.5 inline-flex">
                    <div class="w-6 h-6 relative">
                        <img src="@/assets/icons/test_gim/chevron_right.svg" alt="icon">
                    </div>
                </button>
            </div>
        </div>
        <div class="my-[36px] h-2.5 justify-start items-center gap-2 inline-flex">
            <div :class="{'bg-[#667084]': currentIndex == 1, 'bg-[#d9d9d9]': currentIndex !== 1}" class="w-2.5 h-2.5 rounded-full transition-all"></div>
            <div :class="{'bg-[#667084]': currentIndex == 2, 'bg-[#d9d9d9]': currentIndex !== 2}" class="w-2.5 h-2.5 rounded-full transition-all"></div>
            <div :class="{'bg-[#667084]': currentIndex == 3, 'bg-[#d9d9d9]': currentIndex !== 3}" class="w-2.5 h-2.5 rounded-full transition-all"></div>
        </div>
    </div>
</template>

<script setup>
import Step1 from './StepInstruksi/Step1.vue';
import Step2 from './StepInstruksi/Step2.vue';
import Step3 from './StepInstruksi/Step3.vue';
import { ref } from 'vue';

const namaUser = ref(JSON.parse(localStorage.getItem('userData')))

const currentIndex = ref(1)

const btnAction = (param) => {
    switch (param) {
        case 'next':
            if(currentIndex.value < 3) currentIndex.value++
            break;

        case 'back':
        if(currentIndex.value > 1) currentIndex.value--
            break;
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