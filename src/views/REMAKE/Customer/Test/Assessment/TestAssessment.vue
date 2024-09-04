<template>
    <SelesaiTest message="Test Assessment Selesai!"
    :subMessage="subMessage"/>

    <section class="bg-white py-[46px]">
        <ReservasiFooter/>
    </section>
</template>

<script setup>
import ReservasiFooter from '@/components/REMAKE/ReservasiFooter/Reservasi.vue';
import SelesaiTest from '@/components/REMAKE/HasilTest/SelesaiTest/SelesaiTest.vue';
const subMessage = `Kerja yang bagus! Kamu telah menyelesaikan Tes <span class="font-bold">Assesment</span>. Mari lihat hasilnya dan temukan lebih banyak tentang potensi diri Kamu!`
</script>