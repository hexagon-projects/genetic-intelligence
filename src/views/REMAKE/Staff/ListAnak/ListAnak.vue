<script setup>
import { computed, ref, onMounted } from 'vue';
import Layout from '../../../../Layout/Kepsek/Layout.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex/dist/vuex.cjs.js';
import initAPI from '../../../../api/api';
import Cookies from 'js-cookie';

const router = useRouter()
const token = Cookies.get('token');
const store = useStore()

// Ambil data user dari store
const userData = computed(() => store.getters.getUserData);

// Data dari API
const users = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const totalItems = ref(0);
const perPage = ref(10);
const loading = ref(true);

// Fungsi untuk mengambil data dari API
const fetchData = async (page = 1) => {
  try {
    loading.value = true;
    const response = await initAPI("get", `customers?institution_id=215385&page=${page}`, null, token);
    
    if (response.data && response.data.data) {
      users.value = response.data.data;
      currentPage.value = response.data.current_page;
      lastPage.value = response.data.last_page;
      totalItems.value = response.data.total;
      perPage.value = response.data.per_page;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
};

// Fungsi untuk navigasi halaman
const goToPage = (page) => {
  if (page >= 1 && page <= lastPage.value) {
    fetchData(page);
  }
};

// Fungsi untuk export CSV
const exportCSV = () => {
  const headers = ['Nama', 'Email', 'No. Telepon', 'Tempat Lahir', 'Tanggal Lahir', 'Jenis Kelamin', 'Kelas', 'Status Deteksi'];
  const csvData = users.value.map(user => [
    user.name,
    user.user.email,
    user.number,
    user.birth_place,
    user.birth_date,
    user.gender,
    user.grade,
    user.is_detected
  ]);

  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.map(field => `"${field}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', 'data_anak.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Fungsi untuk navigasi ke detail
const navigateToDetail = (id) => {
  router.push({ path: '/staff/detail-anak', query: { id } });
};

// Format tanggal
const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Inisialisasi data
onMounted(() => {
  fetchData();
});
</script>

<template>
    <Layout>
        <div class="p-4 space-y-4 md:space-y-6">
            <!-- Header Section -->
            <div class="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div class="flex gap-3 items-center">
                    <div class="w-2 h-8 rounded-sm bg-primary"></div>
                    <h1 class="text-xl font-semibold text-gray-900">Data Pengguna</h1>
                </div>

                <div
                    class="py-3 px-6 rounded-3xl bg-primary cursor-pointer flex items-center gap-3 hover:bg-primary/90 transition-colors"
                    @click="exportCSV">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_3571_1286)">
                            <mask id="mask0_3571_1286" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0"
                                y="0" width="24" height="24">
                                <path d="M24 0H0V24H24V0Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0_3571_1286)">
                                <path opacity="0.4"
                                    d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z"
                                    fill="white" />
                                <path
                                    d="M15.8002 2.21048C15.3902 1.80048 14.6802 2.08048 14.6802 2.65048V6.14048C14.6802 7.60048 15.9202 8.81048 17.4302 8.81048C18.3802 8.82048 19.7002 8.82048 20.8302 8.82048C21.4002 8.82048 21.7002 8.15048 21.3002 7.75048C19.8602 6.30048 17.2802 3.69048 15.8002 2.21048Z"
                                    fill="white" />
                                <path
                                    d="M12.2799 14.72C11.9899 14.43 11.5099 14.43 11.2199 14.72L10.4999 15.44V11.25C10.4999 10.84 10.1599 10.5 9.74994 10.5C9.33994 10.5 8.99994 10.84 8.99994 11.25V15.44L8.27994 14.72C7.98994 14.43 7.50994 14.43 7.21994 14.72C6.92994 15.01 6.92994 15.49 7.21994 15.78L9.21994 17.78C9.22994 17.79 9.23994 17.79 9.23994 17.8C9.29994 17.86 9.37994 17.91 9.45994 17.95C9.55994 17.98 9.64994 18 9.74994 18C9.84994 18 9.93994 17.98 10.0299 17.94C10.1199 17.9 10.1999 17.85 10.2799 17.78L12.2799 15.78C12.5699 15.49 12.5699 15.01 12.2799 14.72Z"
                                    fill="white" />
                            </g>
                        </g>
                        <defs>
                            <clipPath id="clip0_3571_1286">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <p class="text-sm font-medium text-white">Export CSV</p>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                <p class="text-gray-600">Memuat data...</p>
            </div>

            <!-- Table Section -->
            <section v-else class="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <!-- Mobile responsive wrapper -->
                <div class="overflow-x-auto">
                    <table class="w-full min-w-[800px]">
                        <!-- Table Header -->
                        <thead class="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th class="text-left px-6 py-4 text-sm font-medium text-gray-600 w-12">
                                    <!-- Checkbox column -->
                                </th>
                                <th class="text-left px-6 py-4 text-sm font-medium text-gray-600">
                                    Nama
                                    <svg class="inline-block ml-2 w-4 h-4 text-gray-400" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                                    </svg>
                                </th>
                                <th class="text-left px-6 py-4 text-sm font-medium text-gray-600">Email</th>
                                <th class="text-left px-6 py-4 text-sm font-medium text-gray-600">No. Telepon</th>
                                <th class="text-left px-6 py-4 text-sm font-medium text-gray-600">Kelas</th>
                                <th class="text-left px-6 py-4 text-sm font-medium text-gray-600">
                                    Status Deteksi
                                    <svg class="inline-block ml-2 w-4 h-4 text-gray-400" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                                    </svg>
                                </th>
                                <th class="text-center px-6 py-4 text-sm font-medium text-gray-600">Aksi</th>
                            </tr>
                        </thead>

                        <!-- Table Body -->
                        <tbody class="bg-white divide-y divide-gray-100">
                            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50/30 transition-colors">
                                <!-- Checkbox -->
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <input type="checkbox"
                                            class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2">
                                    </div>
                                </td>

                                <!-- Name with Avatar -->
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span class="text-sm font-semibold text-blue-600">{{ 
                                                user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) 
                                            }}</span>
                                        </div>
                                        <span class="text-sm font-medium text-gray-900">{{ user.name }}</span>
                                    </div>
                                </td>

                                <!-- Email -->
                                <td class="px-6 py-4">
                                    <span class="text-sm text-gray-700">{{ user.user.email }}</span>
                                </td>

                                <!-- Phone -->
                                <td class="px-6 py-4">
                                    <span class="text-sm text-gray-700">{{ user.number || '-' }}</span>
                                </td>

                                <!-- Grade -->
                                <td class="px-6 py-4">
                                    <span class="text-sm text-gray-700">{{ user.grade || '-' }}</span>
                                </td>

                                <!-- Detection Status -->
                                <td class="px-6 py-4">
                                    <span class="text-sm text-gray-700">{{ user.is_detected || '-' }}</span>
                                </td>

                                <!-- Action -->
                                <td class="px-6 py-4 text-center">
                                    <button @click="navigateToDetail(user.id)"
                                        class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                                        Details
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="px-6 py-4 bg-gray-50/30 border-t border-gray-100">
                    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div class="text-sm text-gray-700">
                            Menampilkan {{ (currentPage - 1) * perPage + 1 }} sampai {{ Math.min(currentPage * perPage, totalItems) }} dari {{ totalItems }} hasil
                        </div>
                        
                        <div class="flex items-center gap-2">
                            <button 
                                @click="goToPage(1)"
                                :disabled="currentPage === 1"
                                class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                                :class="{ 'cursor-not-allowed': currentPage === 1 }">
                                «
                            </button>
                            <button 
                                @click="goToPage(currentPage - 1)"
                                :disabled="currentPage === 1"
                                class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                                :class="{ 'cursor-not-allowed': currentPage === 1 }">
                                ‹
                            </button>
                            
                            <button 
                                v-for="page in Math.min(5, lastPage)" 
                                :key="page"
                                @click="goToPage(page)"
                                :class="[
                                    'px-3 py-2 text-sm rounded-md font-medium transition-colors',
                                    currentPage === page 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                ]">
                                {{ page }}
                            </button>
                            
                            <span v-if="lastPage > 5" class="px-2 text-sm text-gray-500">...</span>
                            
                            <button 
                                @click="goToPage(currentPage + 1)"
                                :disabled="currentPage === lastPage"
                                class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                                :class="{ 'cursor-not-allowed': currentPage === lastPage }">
                                ›
                            </button>
                            <button 
                                @click="goToPage(lastPage)"
                                :disabled="currentPage === lastPage"
                                class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                                :class="{ 'cursor-not-allowed': currentPage === lastPage }">
                                »
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </Layout>
</template>

<style scoped>
input[type="checkbox"]:checked {
    background-color: #10b981;
    border-color: #10b981;
}

.transition-colors {
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
}
</style>