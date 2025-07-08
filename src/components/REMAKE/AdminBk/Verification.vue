<template>
  <div
    class="p-6 bg-[#F0F7FD] rounded-2xl text-sm font-sora text-gray-800"
  >
    <!-- Search & Filters -->
    <div class="flex justify-between items-center mb-4">
      <div class="relative w-1/3">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search by name..."
          class="w-full pl-10 pr-4 py-2 rounded-full border border-biru focus:outline-none"
        />
        <svg
          class="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded-2xl">
      <table class="min-w-full text-left">
        <thead>
          <tr class="bg-[#5B6EFF] text-white">
            <th class="px-4 py-3 rounded-tl-2xl rounded-bl-2xl">#</th>
            <th class="px-4 py-3">Full Name</th>
            <th class="px-4 py-3">Number of member</th>
            <th class="px-4 py-3">Date Of Verification Member</th>
            <th class="px-4 py-3">Home Based Number</th>
            <th class="px-4 py-3 rounded-tr-2xl rounded-br-2xl">Action</th>
          </tr>
        </thead>
        <tbody v-if="!isLoading" class="bg-transparent">
          <tr
            class="border-b hover:bg-gray-50"
            v-for="(item, index) in paginatedData"
            :key="item.id"
          >
            <td class="px-4 py-3">
              {{ index + 1 + (currentPage - 1) * perPage }}
            </td>
            <td class="px-4 py-3">
              {{ item.first_name }} {{ item.last_name }}
            </td>
            <td class="px-4 py-3">{{ item.unix_number ?? "-" }}</td>
            <td class="px-4 py-3">{{ item.start_date ?? "-" }}</td>
            <td class="px-4 py-3">{{ item.total_institut ?? 0 }}</td>
            <td class="px-4 py-3">
              <button
                class="bg-[#5B6EFF] text-white text-xs px-3 py-1 rounded-full"
                @click="openModal(item.user_id)"
              >
                Details
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="i in 5" :key="i" class="animate-pulse border-b">
            <td class="px-4 py-3">
              <div class="h-4 bg-gray-300 rounded w-4"></div>
            </td>
            <td class="px-4 py-3">
              <div class="h-4 bg-gray-300 rounded w-24"></div>
            </td>
            <td class="px-4 py-3">
              <div class="h-4 bg-gray-300 rounded w-16"></div>
            </td>
            <td class="px-4 py-3">
              <div class="h-4 bg-gray-300 rounded w-20"></div>
            </td>
            <td class="px-4 py-3">
              <div class="h-4 bg-gray-300 rounded w-12"></div>
            </td>
            <td class="px-4 py-3">
              <div class="h-6 bg-gray-300 rounded-full w-20"></div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div
        class="flex justify-end gap-2 mt-4"
        v-if="!isLoading && filteredData.length > perPage"
      >
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>

  <!-- Modal -->
    <ModalVerification v-if="showModal" :id="selectedId" @close="showModal = false" />
</template>

<script setup>
import ModalVerification from './ModalVerification.vue';
import { ref, onMounted, computed } from "vue";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import initAPI from "@/api/api";

const showModal = ref(false)
const selectedId = ref(null)

const openModal = (id) => {
  selectedId.value = id
  showModal.value = true
}

const isLoading = ref(true);
const datas = ref([]);
const searchTerm = ref("");
const currentPage = ref(1);
const perPage = 5;

const filteredData = computed(() => {
  if (!searchTerm.value) return datas.value;
  return datas.value.filter((item) => {
    const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
    return fullName.includes(searchTerm.value.toLowerCase());
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / perPage);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredData.value.slice(start, start + perPage);
});

const getVerification = async () => {
  const token = Cookies.get("token");
  try {
    isLoading.value = true;
    const response = await initAPI("get", "verification", null, token);
    datas.value = response.data.data;
  } catch (error) {
    Swal.fire({ icon: "error", title: "Gagal", text: "Gagal mengambil data." });
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getVerification();
});
</script>

<style scoped>
/* Optional styling */
</style>
