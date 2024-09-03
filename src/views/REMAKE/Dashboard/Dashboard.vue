<template>
  <!-- Identitas -->
  <section class="py-[57px] bg-white">
    <Identitas/>
  </section>

  <!-- Progres Tes -->
  <section class="bg-[#F0F7FD] py-[67px]">
    <ProgressTest/>
  </section>

  <!-- Resume GIM -->
  <section class="bg-white py-[60px] mb-[180px] md:mb-0">
    <ResumeGim/>
  </section>

  <!-- Resume assesmen & IQ -->
  <section class="bg-white py-[50px]">
    <ResumeIQAssessment/>
  </section>

  <!-- Reservasi -->
  <section class="bg-white py-[46px]">
    <Reservasi/>
  </section>
</template>

<script setup>
import Identitas from '@/components/REMAKE/Dashboard/Section/Identitas.vue';
import ProgressTest from '@/components/REMAKE/Dashboard/Section/Progress.vue';
import ResumeGim from '@/components/REMAKE/Dashboard/Section/ResumeGim.vue';
import ResumeIQAssessment from '@/components/REMAKE/Dashboard/Section/ResumeIQAssessment.vue';
import Reservasi from '../../../components/REMAKE/ReservasiFooter/Reservasi.vue';
</script>