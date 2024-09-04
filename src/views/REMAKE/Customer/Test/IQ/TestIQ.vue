<template>
    <SelesaiTest message="Test IQ Selesai!"
    :subMessage="subMessage"/>
</template>

<script setup>
import SelesaiTest from '@/components/REMAKE/HasilTest/SelesaiTest/SelesaiTest.vue';
const subMessage = `Kerja yang bagus! Kamu telah menyelesaikan Tes <span class="font-bold">Intelligent Quotient (IQ)</span>. Mari lihat hasilnya dan temukan lebih banyak tentang potensi diri Kamu!`
</script>