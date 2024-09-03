<template>
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

    <BelumTest message="Kamu Belum Melakukan Test IQ" 
    subMessage="Wah, sayang sekali kamu belum coba Tes IQ! Yuk, kenali dulu score IQ mu lewat Test IQ!"/>

    <section class="bg-white py-[46px]">
        <Reservasi/>
    </section>
</template>

<script setup>
import Reservasi from '@/components/REMAKE/ReservasiFooter/Reservasi.vue';
import BelumTest from '@/components/REMAKE/HasilTest/BelumTest/BelumTest.vue';
</script>