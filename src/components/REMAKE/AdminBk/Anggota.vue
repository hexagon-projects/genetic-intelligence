<template>
  <div class="p-6 bg-white rounded-2xl text-sm font-sora text-gray-800">
    <!-- Search & Filter -->
    <div class="flex justify-between items-center mb-4">
      <div class="relative w-1/3">
        <input
          type="text"
          v-model="searchTerm"
          @input="fetchData"
          placeholder="Search by name..."
          class="w-full pl-10 pr-4 py-2 rounded-full border border-biru focus:outline-none"
        />
        <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <select v-model="sortOption" @change="fetchData" class="border px-3 py-2 rounded-full bg-white text-sm">
        <option value="terbaru">Terbaru</option>
        <option value="terlama">Terlama</option>
      </select>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded-2xl">
      <table class="min-w-full text-left">
        <thead class="bg-[#5B6EFF] text-white">
          <tr>
            <th class="px-4 py-3">#</th>
            <th class="px-4 py-3">Full Name</th>
            <th class="px-4 py-3">Number</th>
            <th class="px-4 py-3">Start Date</th>
            <th class="px-4 py-3">Home Base</th>
            <th class="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody v-if="!isLoading">
          <tr v-for="(item, index) in data" :key="item.id" class="border-b hover:bg-gray-50">
            <td class="px-4 py-3">{{ index + 1 + (pagination.current_page - 1) * pagination.per_page }}</td>
            <td class="px-4 py-3">{{ item.first_name }} {{ item.last_name }}</td>
            <td class="px-4 py-3">{{ item.unix_number }}</td>
            <td class="px-4 py-3">{{ item.start_date }}</td>
            <td class="px-4 py-3">{{ item.total_institut }}</td>
            <td class="px-4 py-3">
              <button class="bg-[#5B6EFF] text-white text-xs px-3 py-1 rounded-full" @click="openModal(item.user_id)">Details</button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="i in 5" :key="i" class="animate-pulse">
            <td colspan="6" class="h-6 bg-gray-50 rounded w-full"></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-end gap-2 mt-4">
      <button :disabled="pagination.current_page === 1" @click="goToPage(pagination.current_page - 1)" class="px-3 py-1 bg-gray-200 rounded">Prev</button>
      <button :disabled="pagination.current_page === pagination.last_page" @click="goToPage(pagination.current_page + 1)" class="px-3 py-1 bg-gray-200 rounded">Next</button>
    </div>

    <!-- Modal -->
    <ModalVerification v-if="showModal" :id="selectedId" @close="showModal = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import initAPI from "@/api/api";
import ModalVerification from './ModalVerification.vue';

const data = ref([]);
const pagination = ref({});
const searchTerm = ref('');
const sortOption = ref('terbaru');
const perPage = 5;

const showModal = ref(false);
const selectedId = ref(null);

const openModal = (id) => {
  selectedId.value = id;
  showModal.value = true;
};

const isLoading = ref(false);

const fetchData = async (page = 1) => {
  isLoading.value = true;
  const token = Cookies.get("token");
  try {
    const response = await initAPI("get", `verification?search=${searchTerm.value}&sort=${sortOption.value}&per_page=${perPage}&page=${page}`, null, token);
    data.value = response.data.data.data;
    pagination.value = response.data.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Tidak bisa mengambil data.",
    });
  } finally {
    isLoading.value = false;
  }
};

const goToPage = (page) => {
  fetchData(page);
};

onMounted(() => {
  fetchData();
});
</script>