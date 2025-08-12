<template>
  <div class="w-full mx-auto">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h1 class="text-2xl font-bold text-white">Anggota Majelis Guru Bimbingan Konseling Indonesia</h1>
        <p class="text-blue-100 mt-1">Kelola data guru BK dan verifikasi</p>
      </div>

      <!-- Tabs Navigation -->
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8 px-6" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="changeTab(tab.id)"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Search and Filter Section -->
      <div class="p-6 bg-gray-50 border-b border-gray-200">
        <div class="flex flex-col lg:flex-row gap-4">
          <!-- Search -->
          <div class="flex-1">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"/>
              </svg>
              <input
                v-model="searchTerm"
                @input="debounceSearch"
                type="text"
                placeholder="Cari berdasarkan nama depan, nama belakang, atau status..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Filters -->
          <div class="flex gap-2">
            <!-- Sort Filter -->
            <select
              v-model="sortOption"
              @change="fetchData(1)"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="terbaru">Terbaru</option>
              <option value="terlama">Terlama</option>
            </select>

            <!-- Reset Filter Button -->
            <button
              @click="resetFilters"
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
              title="Reset Filter"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 2v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m18 6 6 6m0-6-6 6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span class="ml-2 text-gray-600">Memuat data...</span>
      </div>

      <!-- Table Content -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Anggota
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STatus Keanggotaan
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nomor Anggota
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal Mulai
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal Berakhir
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Sekolah
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="item in data"
              :key="item.id"
              class="hover:bg-gray-50 transition-colors duration-150"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                      <span class="text-white font-medium text-sm">{{ getInitials(item.first_name, item.last_name) }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ item.first_name }} {{ item.last_name }}</div>
                    <div class="text-sm text-gray-500">ID: {{ item.user_id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusClass(item.status)
                  ]"
                >
                  {{ getStatusText(item.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-900">{{ item.unix_number }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-900">{{ formatDate(item.start_date) }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-900">{{ formatDate(item.end_date) }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    item.total_institut > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  ]"
                >
                  {{ item.total_institut }} Sekolah
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button 
                    @click="editItem(item.user_id)"
                    class="text-green-600 hover:text-green-900 transition-colors duration-150"
                    title="Edit"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="!isLoading && data.length === 0" class="text-center py-12">
        <svg class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m22 21v-2a4 4 0 0 0-3-3.87"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Tidak ada data</h3>
        <p class="text-gray-500">Tidak ada data yang sesuai dengan filter yang dipilih.</p>
      </div>

      <!-- Pagination -->
      <div v-if="!isLoading && data.length > 0" class="bg-white px-6 py-3 border-t border-gray-200">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <!-- Left side: Items per page and info -->
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <!-- Items per page selector -->
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600 whitespace-nowrap">Tampilkan:</label>
              <select
                v-model="perPage"
                @change="fetchData(1)"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option v-for="option in perPageOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <span class="text-sm text-gray-600 whitespace-nowrap">per halaman</span>
            </div>
            
            <!-- Data info -->
            <div class="text-sm text-gray-700">
              Menampilkan {{ pagination.from || 0 }} sampai {{ pagination.to || 0 }} dari {{ pagination.total || 0 }} data
            </div>
          </div>

          <!-- Right side: Pagination controls -->
          <div class="flex items-center space-x-2">
            <button
              @click="fetchData(pagination.current_page - 1)"
              :disabled="pagination.current_page <= 1"
              :class="[
                'px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200',
                pagination.current_page <= 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              ]"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            
            <span
              v-for="page in visiblePages"
              :key="page"
              @click="page !== '...' && fetchData(page)"
              :class="[
                'px-3 py-1 rounded-md text-sm font-medium cursor-pointer transition-colors duration-200',
                page === pagination.current_page
                  ? 'bg-blue-600 text-white'
                  : page === '...'
                  ? 'text-gray-500 cursor-default'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </span>
            
            <button
              @click="fetchData(pagination.current_page + 1)"
              :disabled="pagination.current_page >= pagination.last_page"
              :class="[
                'px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200',
                pagination.current_page >= pagination.last_page
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              ]"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Cookies from "js-cookie"
import Swal from "sweetalert2"
import initAPI from "@/api/api"
import { useRouter } from "vue-router";

const router = useRouter();
// Reactive data
const activeTab = ref('all')
const searchTerm = ref('')
const sortOption = ref('terbaru')
const perPage = ref(20)
const perPageOptions = ref([10, 20, 50, 100])
const isLoading = ref(false)
const data = ref([])
const pagination = ref({})
let searchTimeout = null

// Tabs configuration
const tabs = [
  { id: 'all', name: 'Semua Data' },
  { id: 'verified', name: 'Terverifikasi' },
  { id: 'not verified', name: 'Menunggu Verifikasi' }
]

// Computed properties
const visiblePages = computed(() => {
  const pages = []
  const total = pagination.value.last_page || 1
  const current = pagination.value.current_page || 1
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

// Methods
const fetchData = async (page = 1) => {
  isLoading.value = true
  const token = Cookies.get("token")
  
  // Build URL with status filter
  let url = `verification?search=${searchTerm.value}&sort=${sortOption.value}&per_page=${perPage.value}&page=${page}`
  
  // Add status filter based on active tab
  if (activeTab.value !== 'all') {
    url += `&status=${activeTab.value}`
  }
  
  try {
    const response = await initAPI("get", url, null, token)
    
    data.value = response.data.data.data
    pagination.value = response.data.data
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Tidak bisa mengambil data.",
    })
  } finally {
    isLoading.value = false
  }
}

const debounceSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchData(1)
  }, 500)
}

const changeTab = (tabId) => {
  activeTab.value = tabId
  fetchData(1)
}

const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
}

const getStatusClass = (status) => {
  switch (status) {
    case 'verified':
      return 'bg-green-100 text-green-800'
    case 'not verified':
      return 'bg-yellow-100 text-yellow-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'verified':
      return 'Terverifikasi'
    case 'not verified':
      return 'Menunggu Verifikasi'
    case 'rejected':
      return 'Ditolak'
    default:
      return status || '-'
  }
}

const formatDate = (dateString) => {
  if (!dateString || dateString === '-') return '-'
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

const resetFilters = () => {
  searchTerm.value = ''
  sortOption.value = 'terbaru'
  perPage.value = 20
  activeTab.value = 'all'
  fetchData(1)
}

const editItem = (id) => {
  try {
    const encodedId = btoa(id);

    router.push({
      name: "amdinbk.views.anggota.detail",
      query: { anggota: encodedId },
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat navigasi.",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

// Lifecycle
onMounted(() => {
  fetchData()
})
</script>