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

    <SelesaiTest message="Test GIM Selesai!"
    :subMessage="subMessage"/>

    <section class="bg-white py-[46px]">
        <ReservasiFooter/>
    </section>
</template>

<script setup>
import ReservasiFooter from '@/components/REMAKE/ReservasiFooter/Reservasi.vue';
import SelesaiTest from '@/components/REMAKE/HasilTest/SelesaiTest/SelesaiTest.vue';
const subMessage = `Kerja yang bagus! Kamu telah menyelesaikan Tes <span class="font-bold">Genetic Intelligence Mapping</span>. Mari lihat hasilnya dan temukan lebih banyak tentang potensi diri Kamu!`
</script>