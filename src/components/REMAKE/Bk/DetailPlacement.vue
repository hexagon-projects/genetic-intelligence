<template>
  <div class="w-full mx-auto mt-10 bg-white rounded-2xl p-5">
    <!-- Tab Navigation -->
    <div class="flex flex-wrap gap-2 border-b border-gray-200">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        class="px-4 py-2 text-sm md:text-base font-semibold rounded-t-md transition-all duration-200"
        :class="{
          'text-biru border-b-2 border-biru': activeTab === index,
          'text-gray-600 hover:bg-gray-100': activeTab !== index,
        }"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="p-4">
      <div v-if="activeTab === 0">
        <BasicPlacment :placementId="placementId" />
      </div>
      <div v-else-if="activeTab === 1">
        <BasicReport :placementId="placementId" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import BasicPlacment from "./BasicPlacment.vue";
import BasicReport from "./BasicReport.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const tabs = [{ name: "Informasi Penempatan" }, { name: "Basic Laporan" }];

const activeTab = ref(0);
const placementId = ref(null);

const isValidStudentId = (id) => {
  return !isNaN(id) && Number.isInteger(+id) && +id > 0;
};

onBeforeMount(() => {
  const encodedId = route.query.placemnet_id;
  if (!encodedId) {
    router.push({ name: "bk.views.placement" });
    return;
  }

  try {
    const decodedId = atob(encodedId); // Menggunakan Base64 decode

    // Validasi: Pastikan ID adalah angka
    if (!isValidStudentId(decodedId)) {
      router.push({ name: "bk.views.placement" });
      return;
    }

    placementId.value = decodedId;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat decoded data siswa.",
      showConfirmButton: false,
      timer: 2000,
    });

    router.push({ name: "bk.views.placement" });
  }
});
</script>
