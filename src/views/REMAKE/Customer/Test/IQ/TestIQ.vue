<template>
    <Layout>
        <div class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex">
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Beranda</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Lakukan Tes</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Test IQ</div>
        </div>

        <SelesaiTest v-if="isTested" message="Test IQ Selesai!"
        :subMessage="subMessage"/>

        <section v-if="!isTested" class="pb-[34px] w-full bg-white">
            <Instruksi v-if="isInstruksi"/>
            <div v-if="!isInstruksi">
                Soal
            </div>
        </section>
    </Layout>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import Layout from '@/Layout/Customer/Layout.vue';
import Instruksi from '@/components/REMAKE/Test/IQ/Instruksi.vue';
import SelesaiTest from '@/components/REMAKE/HasilTest/SelesaiTest/SelesaiTest.vue';
const subMessage = `Kerja yang bagus! Kamu telah menyelesaikan Tes <span class="font-bold">Intelligent Quotient (IQ)</span>. Mari lihat hasilnya dan temukan lebih banyak tentang potensi diri Kamu!`

const isTested = ref(false)
</script>