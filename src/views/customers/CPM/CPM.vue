<template>
    <div class="mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex">
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

    <div v-if="!isTestedCPM">
        <SebelumTest v-if="!isSoalReady"/>

        <section v-if="isSoalReady" class="bg-white pb-20">
            <Soal/>
        </section>
    </div>

    <div v-if="isTestedCPM">
        <SelesaiTest/>
    </div>
</template>

<script setup>
import { ref } from "vue"
import SebelumTest from "@/components/customer/CPM/SebelumTest/SebelumTest.vue"
import SelesaiTest from "@/components/customer/CPM/SelesaiTest/SelesaiTest.vue"
import Soal from "@/components/customer/CPM/Soal/Soal.vue"

const isTestedCPM = ref(false)
const isSoalReady = ref(false)
</script>