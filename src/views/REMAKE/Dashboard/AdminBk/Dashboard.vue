<template>
  <div v-if="loading" class="preloader-overlay">
    <span
      class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"
    ></span>
  </div>

  <Layout>
    <div class="bg-gray-100 p-5">
      <div class="w-full md:w-4/5 mx-auto">
        <Hero />
        <Statistik />
        <CaseSatistik />
        <Anggota />
      </div>  
    </div>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/AdminBk/Layout.vue";
import Hero from "@/components/REMAKE/AdminBk/Hero.vue";
import Statistik from "../../../../components/REMAKE/AdminBk/Statistik.vue";
import Anggota from "../../../../components/REMAKE/AdminBk/Anggota.vue";
import CaseSatistik from "../../../../components/REMAKE/AdminBk/CaseSatistik.vue";
</script>
