<template>
  <div v-if="loading" class="preloader-overlay">
    <span
      class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"
    ></span>
  </div>

  <Layout>
    <div class="bg-gray-100 p-5">
      <div class="w-full md:w-4/5 mx-auto min-h-screen">
        <BasicInformation :userId="conselingId" />
      </div>  
    </div>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/AdminBk/Layout.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed, onBeforeMount } from "vue";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import initAPI from "@/api/api";
import { useStore } from "vuex";
import Cookies from "js-cookie";

import BasicInformation from "../../../../components/REMAKE/AdminBk/BasicInformation.vue";


const userDatas = ref(null);
const route = useRoute();
const router = useRouter();
const conselingId = ref(null);

const isValidStudentId = (id) => {
  return !isNaN(id) && Number.isInteger(+id) && +id > 0;
};

onBeforeMount(() => {
  const encodedAnggotaId = route.query.anggota;
  if (!encodedAnggotaId) {
    router.push({ name: "amdinbk.views.anggota" });
    return;
  }

  try {
    const decodedId = atob(encodedAnggotaId); // Menggunakan Base64 decode

    // Validasi: Pastikan ID adalah angka
    if (!isValidStudentId(decodedId)) {
      router.push({ name: "amdinbk.views.anggota" });
      return;
    }

    conselingId.value = decodedId;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat decoded data.",
      showConfirmButton: false,
      timer: 2000,
    });

    router.push({ name: "amdinbk.views.anggota" });
  }
});
</script>
