<template>
    <div class="flex flex-col items-center gap-[168px] pt-20">
        <span class="text-center text-[#667084] text-base font-normal font-['Roboto'] leading-normal">
           Bekerjalah secepatnya, dan tuliskan nomor-nomor sesuai dengan kesan dan keinginan Kamu yang pertama muncul.
        </span>

        <button @click="showSoal" class="hover:-translate-y-1 transition-all h-11 px-6 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap- inline-flex">
            <div class="text-white text-sm md:text-base font-normal font-['Roboto'] leading-normal">Mulai Tes</div>
        </button>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore()

const showSoal = () => {
    store.commit('setContohSoalIQ', true)
}
</script>